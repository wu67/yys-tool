<template>
  <div class="page-userData">
    <div style="">
      <div style="margin-bottom: 10px;width: 80px;"
      >
        <label for="userDataInput-1">
          <div
            class="el-button el-button--primary el-button--mini"
            style="color:#fff;cursor: pointer;"
          >新增</div>
        </label>
      </div>
      <input type="file"
             style="display: none;"
             accept="application/json"
             @change="onUserDataInput($event, -1)"
             id="userDataInput-1"
             res="userDataInput-1">
    </div>

    <div class="flex wrap">
      <el-card class="user-card"
               v-for="(userItem, index) in user.userList"
               :key="index">
        <div slot="header" class="flex between">
          <span>lv.{{ userItem.data.player.level }}&nbsp;{{ userItem.data.player.name }}</span>
          <div class="flex">

            <label :for="`updateInput${index}`">
              <div style="color:#409EFF;cursor: pointer;">更新</div>
            </label>
            &nbsp;&nbsp;
            <div style="color: #ef4135;cursor: pointer;"
                 @click="delUser(userItem.data.player)">删除</div>
          </div>
          <input type="file"
                 style="display:none"
                 accept="application/json"
                 @change="onUserDataInput($event, index)"
                 :id="`updateInput${index}`"
                 :ref="`userDataInput${index}`">
        </div>

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
            <div class="resources-key">御札</div>
            <div class="resources-value">{{ userItem.data.currency.ofuda }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">金御札</div>
            <div class="resources-value">{{ userItem.data.currency.gold_ofuda }}</div>
          </div>
          <div class="flex">
            <div class="resources-key">紫蛇皮(废)</div>
            <div class="resources-value">{{ userItem.data.currency.scale }}</div>
          </div>

          <br>
          <div class="flex start">
            <div class="resources-key">导出时间</div>
            <div
              class="resources-value"
              style="font-size: 14px;"
            >{{ new Date(userItem.timestamp) | formatTime('yyyy-MM-dd hh:mm') }}</div>
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
import { mapState } from 'vuex'
import baseMixin from '@/mixin'

export default {
  name: 'userData',
  mixins: [
    baseMixin
  ],
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'user',
    ])
  },
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  methods: {
    onUserDataInput (e, index) {
      const files = e.target.files || e.dataTransfer.files
      const file = files[0]
      if (file.type !== 'application/json') {
        this.$message.error('读取数据出错，请确认选择了游戏数据json文件')
        this.$refs[`userDataInput${index}`].value = ''
        return
      }

      const fileReader = new FileReader()
      fileReader.onload = e => {
        let newUserData = JSON.parse(e.target.result)
        // 写入vuex
        this.$store.commit('user/updateUserDataByIndex', {
          index: index,
          value: newUserData
        })

        this.$store.commit('updateNotIncluded', {
          index: index,
          value: this.commonNotIncluded
        })
        // 写入indexed DB
        this.updateUserData(index, newUserData)
        this.updateUserNotIncluded(index,
          {
            id: newUserData.data.player.id,
            value: this.commonNotIncluded
          })
      }
      fileReader.readAsText(file)

    },
    delUser (player) {
      this.$confirm(`确定删除 ${player.name} 吗? 删除数据不可恢复。`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUserData(player.id).then(() => {
          this.getUserData()
        })
      })
    }
  }
}
</script>

<style lang="scss"
       scoped>
@import "~@/assets/css/flex-custom.scss";

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
