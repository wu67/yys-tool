<template>
  <div class="page-userData">
    <div>
      <div style="margin-bottom: 10px;width: 80px;">
        <label for="userDataInput-1">
          <div class="el-button el-button--primary el-button--mini" style="color:#fff;cursor: pointer;">新增</div>
        </label>
      </div>
      <input type="file" style="display: none;" accept="application/json" @change="onUserDataInput($event, -1)" id="userDataInput-1" res="userDataInput-1" />
    </div>

    <div class="flex wrap">
      <el-card class="user-card" v-for="(userItem, index) in user.list" :key="index">
        <template #header>
          <div class="flex between">
            <span>lv.{{ userItem.data.player.level }}&nbsp;{{ userItem.data.player.name }}</span>
            <div class="flex">
              <label :for="`updateInput${index}`">
                <div style="color:#409EFF;cursor: pointer;">更新</div>
              </label>
              &nbsp;&nbsp;
              <div style="color: #ef4135;cursor: pointer;" @click="delUser(userItem.data.player)">删除</div>
            </div>
            <input type="file" style="display:none" accept="application/json" @change="onUserDataInput($event, index)" :id="`updateInput${index}`" :ref="`userDataInput${index}`" />
          </div>
        </template>

        <div class="resources">
          <div class="flex">
            <div class="resources-key">勾玉</div>
            <div class="resources-value">{{ userItem.data.currency.jade }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">蓝票</div>
            <div class="resources-value">{{ userItem.data.currency.mystery_amulet }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">紫票</div>
            <div class="resources-value">{{ userItem.data.currency.ar_amulet }}</div>
          </div>
          <div class="flex">
            <div class>
              预计有&nbsp;{{
                calcDrawCount(userItem.data.currency.jade, userItem.data.currency.mystery_amulet + userItem.data.currency.ar_amulet)
              }}&nbsp;抽
            </div>
          </div>
          <br />
          <div class="flex">
            <div class="resources-key">魂玉</div>
            <div class="resources-value">{{ userItem.data.currency.s_jade }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">金蛇皮</div>
            <div class="resources-value">{{ userItem.data.currency.reverse_scale }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">金币</div>
            <div class="resources-value">{{ userItem.data.currency.coin }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">体力</div>
            <div class="resources-value">{{ userItem.data.currency.action_point }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">樱饼</div>
            <div class="resources-value">{{ userItem.data.currency.auto_point }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">荣誉</div>
            <div class="resources-value">{{ userItem.data.currency.honor }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">皮肤券</div>
            <div class="resources-value">{{ userItem.data.currency.skin_token }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">SP皮肤券</div>
            <div class="resources-value">{{ userItem.data.currency.sp_skin_token }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">痴卷</div>
            <div class="resources-value">{{ userItem.data.currency.foolery_pass }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">御灵门票</div>
            <div class="resources-value">{{ userItem.data.currency.totem_pass }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">御札</div>
            <div class="resources-value">{{ userItem.data.currency.ofuda }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">金御札</div>
            <div class="resources-value">{{ userItem.data.currency.gold_ofuda }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">紫蛇皮</div>
            <div class="resources-value">{{ userItem.data.currency.scale }}</div>
          </div>

          <br />
          <div class="flex start">
            <div class="resources-key">导出时间</div>
            <div class="resources-value" style="font-size: 14px;">{{ formatTime(new Date(userItem.timestamp), 'YYYY-MM-DD HH:mm') }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">用户ID</div>
            <div class="resources-value">{{ userItem.data.player.id }}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  name: 'userData',
})
</script>

<script setup>
import {
  computed,
  defineComponent,
  unref,
} from 'vue'
import { useStore } from 'vuex'
import useCommon from '@/useCommon'
import { ElMessageBox, ElMessage } from 'element-plus'

const {
  commonNotIncluded,
  formatTime,
  updateUserData,
  getUserData,
  deleteUserData,
  updateUserNotIncluded,
} = useCommon()

const $store = useStore()
const user = computed(() => $store.state.user)

const onUserDataInput = (e, index) => {
  const files = e.target.files || e.dataTransfer.files
  const file = files[0]
  if (file.type !== 'application/json') {
    ElMessage.error('读取数据出错，请确认选择了游戏数据json文件')
    return
  }

  const fileReader = new FileReader()
  fileReader.onload = e => {
    const newUserData = JSON.parse(e.target.result)
    const newID = newUserData.data.player.id
    let newUserIndex = index

    user.value.list.forEach((userItem, currentIndex) => {
      if (userItem.data.player.id === newID) {
        // 说明该ID已经在数据库中了, 此时不是新增, 而应是更新
        newUserIndex = currentIndex
      }
    })

    // 写入vuex
    $store.commit('user/updateUserDataByIndex', {
      index: newUserIndex,
      value: newUserData
    })

    // 写入indexed DB
    updateUserData(index, newUserData)

    if (newUserIndex === -1) {
      // 不是新增用户数据的话，不必更新未收录数据
      $store.commit('updateNotIncluded', {
        index: index,
        value: commonNotIncluded
      })
      updateUserNotIncluded(index,
        {
          id: newUserData.data.player.id,
          value: unref(commonNotIncluded)
        })
    }
  }
  fileReader.readAsText(file)
}
const delUser = (player) => {
  ElMessageBox.confirm(`确定删除 ${player.name} 吗? 删除数据不可恢复。`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteUserData(player.id).then(() => {
      getUserData()
    })
  })
}
// 预计可抽卡次数
const calcDrawCount = (jade, amulet) => {
  const temp = Math.floor(jade / 1000) * 11 + amulet
  // 不足一千勾的零散勾玉
  let restJade = jade % 1000

  // 持有符咒和勾玉在商店按1000:11兑换的符咒之和
  let rest = Math.floor(temp)

  let sum = 0

  // 模拟抽卡
  do {
    // 抽数+1
    sum++
    // 余票-1
    rest--

    if (sum < 500 && sum % 50 === 0) {
      // 500 抽以内，每抽50抽会送5抽
      rest += 5

      if (sum === 300 || sum === 400) {
        // 第300抽、400抽会送1000勾即11票
        rest += 11
      }
    } else if (sum <= 1000 && sum % 100 === 0) {
      // 到达500抽后，每抽100抽会送10抽, 第500抽本身也是送10票的。
      rest += 10
      if (sum === 600 || sum === 800 || sum === 1000) {
        // 未算 600、800、1000抽各送500勾
        restJade += 500
        if (restJade >= 1000) {
          // 凑齐1000勾换算成11票
          restJade -= 1000
          sum += 11
        }
      }
    }
  } while (rest > 0)

  return sum
}
</script>

<style lang="scss"
       scoped>
@import "@/assets/css/flex-custom.scss";
@import "@/assets/css/border-box.scss";
.page-userData {
  padding: 10px 40px 20px;
  height: 100%;
  width: 1600px;
  margin: 0 auto;
}

.user-card {
  width: 256px;
  margin-right: 20px;
}

.resources {
  font-size: 14px;
  line-height: 24px;
}

.resources-key {
  width: 80px;
}

.resources-value {
  font-family: monospace;
  font-size: 18px;
}
</style>
