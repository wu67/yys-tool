<template>
  <div class="page-shards-list">
    <dialogSetNotIncluded
      v-if="dialogSetNotIncludedVisible"
      v-model="dialogSetNotIncludedVisible"
      :user-name="userList[currentEditNotIncludedUserIndex].data.player.name"
      :not-included="notIncludedList[currentEditNotIncludedUserIndex]"
      :all-hero-list="allHeroList"
      @change-not-included="changeNotIncluded"
    />
    <div
      class="flex justify-between"
      style="margin-bottom: 8px"
    >
      <div>
        <el-checkbox
          v-model="checkAll"
          label="all"
          value="all"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全部
        </el-checkbox>
        <el-checkbox-group
          v-model="checkList"
          @change="handleCheckedRarityChange"
        >
          <el-checkbox
            v-for="item in rarityList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <el-button @click="checkList = []">清空稀有度</el-button>
        <el-button @click="clearFilter">重置所有过滤项</el-button>
      </div>
    </div>

    <div style="height: calc(100vh - 172px)">
      <el-table
        ref="shardTableRef"
        :data="computedShardsList"
        highlight-current-row
        stripe
        border
        height="100%"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />

        <el-table-column
          prop="name"
          label="名称"
          width="110"
        />

        <el-table-column
          label="稀有度"
          width="80"
        >
          <template #default="scope">
            <div
              class="rarity"
              :class="`${scope.row.rarity}`"
            >
              {{ transformRarityName(scope.row.rarity) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-for="(user, userIndex) in userList"
          :key="`userColumn${userIndex}`"
          align="center"
          :label="`${user.data.player.name}`"
        >
          <template #header>
            <div class="flex justify-center">
              <div>{{ user.data.player.name }}</div>
              &nbsp;
              <div
                class="btnSetNotIncluded"
                @click="setNotIncluded(userIndex)"
              >
                设置未收录
              </div>
            </div>
          </template>
          <el-table-column
            :key="`shard${userIndex}`"
            :label="`持有碎片`"
          >
            <template #default="scope">
              <div>{{ scope.row.shards[userIndex] }}</div>
            </template>
          </el-table-column>
          <el-table-column
            :key="`included${userIndex}`"
            :filters="[
              { text: '已收录', value: '1' },
              { text: '未收录', value: '0' },
            ]"
            :filter-method="
              (value, row) => filterIncluded(value, row, userIndex)
            "
            :label="`收录状态`"
          >
            <template #default="scope">
              <div
                :class="{
                  'not-included': scope.row.included[userIndex] === '0',
                }"
              >
                {{ scope.row.included[userIndex] === '1' ? '' : '未收录' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :key="`have${userIndex}`"
            :filters="[
              { text: '仓库中有', value: '1' },
              { text: '仓库中无', value: '0' },
            ]"
            :filter-method="(value, row) => filterHave(value, row, userIndex)"
            :label="`仓检`"
          >
            <template #default="scope">
              <div :class="{ 'have-not': scope.row.have[userIndex] === '0' }">
                {{ scope.row.have[userIndex] === '1' ? '' : '仓库中无' }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          prop="name"
          label="名称"
          width="110"
        />
        <el-table-column
          label="共有碎片"
          prop="holdings"
          width="85"
        />
        <el-table-column
          label="仍缺"
          prop="required"
          width="80"
        />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'HeroList',
})
</script>
<script lang="ts" setup>
import { defineComponent, ref, unref, computed } from 'vue'
import { useIndexStore } from '@/stores'
import { useUserStore } from '@/stores/user'
import {
  ElButton,
  ElCheckboxGroup,
  ElCheckbox,
  ElMessage,
  ElTable,
  ElTableColumn,
} from 'element-plus'
import dialogSetNotIncluded from '@/components/dialogSetNotIncluded.vue'
import useCommon from '../useCommon'
import {
  IBaseHero,
  IHero,
  hero_book_shards,
  CheckboxValueType,
} from '@/interface'

const { updateUserNotIncluded, getNotIncluded } = useCommon()

const $userStore = useUserStore()
const $indexStore = useIndexStore()
const allHeroList = computed(() => $indexStore.allHeroList)
const notIncludedList = computed(() => $indexStore.notIncludedList)
const userList = computed(() => $userStore.list)

const rarityList = ref([
  {
    name: 'SP',
    value: 'SP',
  },
  {
    name: 'SSR',
    value: 'SSR',
  },
  {
    name: 'SR',
    value: 'SR',
  },
  {
    name: 'R',
    value: 'R',
  },
  {
    name: 'N',
    value: 'N',
  },
  {
    name: '素材',
    value: 'MATERIAL',
  },
  {
    name: '联动',
    value: 'INTERACTIVE',
  },
])
let shards = ref([] as IHero[])
type HeroList = number[]
let heroIdList = ref<HeroList[]>([])
const getShards = function () {
  shards.value = allHeroList.value
    .sort((a: IBaseHero, b: IBaseHero) => b.id - a.id)
    .map((item: IBaseHero) => {
      let obj: IHero = {
        name: item.name,
        rarity: item.rarity,
        id: item.id,
        shards: [],
        included: [],
        have: [],
        required: 0,
        holdings: 0,
        bookMaxShards: 0,
      }
      // 联动
      if (item.interactive === true) {
        obj.interactive = true
      }

      userList.value.forEach((user: any, index: number) => {
        // 处理持有的碎片和召唤所需碎片数
        user.data.hero_book_shards.forEach((hero: hero_book_shards) => {
          if (obj.id === hero.hero_id) {
            obj.bookMaxShards = hero.book_max_shards
            obj.shards[index] = hero.shards
          }
        })

        heroIdList.value[index] = Array.from(
          new Set(user.data.heroes.map((item: any) => item.hero_id)),
        )

        obj.included[index] =
          unref(notIncludedList)[index].indexOf(item.id) !== -1 ? '0' : '1'
        obj.have[index] =
          heroIdList.value[index].indexOf(item.id) !== -1 ? '1' : '0'
      })

      obj.holdings = obj.shards.reduce((sum, current) => {
        sum += current
        return sum
      }, 0)

      const notIncludedCount = obj.included.reduce((sum, current) => {
        // 检查收录状态，根据收录状态计算总需求量
        return current === '0' ? ++sum : sum
      }, 0)

      const temp = obj.bookMaxShards * notIncludedCount - obj.holdings
      obj.required = temp > 0 ? temp : '-'
      return obj
    })
}
const transformRarityName = function (rarity: string) {
  let result = ''
  rarityList.value.forEach((item: { value: string; name: string }) => {
    if (item.value == rarity) {
      result = item.name
    }
  })
  return result
}

let checkList = ref(['SP', 'SSR'])
const computedShardsList = computed(() => {
  let result = []
  if (checkList.value.indexOf('INTERACTIVE') !== -1) {
    result = shards.value.filter((item: IHero) => {
      return checkList.value.indexOf(item.rarity) !== -1 || item.interactive
    })
  } else {
    result = shards.value.filter((item: IHero) => {
      return (
        checkList.value.indexOf(item.rarity) !== -1 &&
        !(typeof item.interactive !== 'undefined')
      )
    })
  }
  return result
})

let isIndeterminate = ref(true)
const handleCheckAllChange = function (val: CheckboxValueType) {
  checkList.value = val ? rarityList.value.map((item) => item.value) : []
  isIndeterminate.value = false
}
let checkAll = ref(false)
const handleCheckedRarityChange = function (value: CheckboxValueType[]) {
  checkAll.value = value.length === rarityList.value.length
  isIndeterminate.value =
    value.length > 0 && value.length < rarityList.value.length
}

let shardTableRef = ref()
const clearFilter = function () {
  shardTableRef.value.clearFilter()
}
const filterIncluded = function (value: any, row: any, index: number) {
  return value === row.included[index]
}
const filterHave = function (value: any, row: any, index: number) {
  return value === row.have[index]
}

let currentEditNotIncludedUserIndex = ref(-1)
let dialogSetNotIncludedVisible = ref(false)

const setNotIncluded = function (userIndex: number) {
  currentEditNotIncludedUserIndex.value = userIndex
  dialogSetNotIncludedVisible.value = true
}

const changeNotIncluded = function (newCheckedData: number[]) {
  $indexStore.updateNotIncluded({
    index: currentEditNotIncludedUserIndex.value,
    value: newCheckedData,
  })
  updateUserNotIncluded(currentEditNotIncludedUserIndex.value, {
    id: userList.value[currentEditNotIncludedUserIndex.value].data.player.id,
    value: unref(newCheckedData),
  })
    .then(() => {
      ElMessage.success(`设置未收录成功`)
      getShards()
    })
    .catch((e: Error) => {
      ElMessage.error(e.message || '设置未收录出错')
    })
}

getNotIncluded().then(() => {
  getShards()
})
</script>

<style lang="scss" scoped>
.page-shards-list {
  padding: 0 0 20px;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.rarity {
  font-weight: 800;

  &.SP {
    color: #ee2c2c;
  }

  &.SSR {
    color: #ffa500;
  }

  &.SR {
    color: #9400d3;
  }

  &.R {
    color: #1874cd;
  }

  &.N,
  &.MATERIAL {
    color: #9c9c9c;
  }
}

.included {
  color: #409eff;
}

.not-included {
  color: #f56c6c;
}

.have-not {
  color: #e6a23c;
}

.btnSetNotIncluded {
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
}
</style>
