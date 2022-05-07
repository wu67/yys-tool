<template>
  <div class="page-equip-list">
    <el-tabs
      v-model="currentUser"
      size="small"
      type="card"
      @tab-click="changeUser"
    >
      <el-tab-pane
        v-for="(user, userIndex) in userList"
        :key="`user-${userIndex}`"
        :label="user.data.player.name"
        :name="`${userIndex}`"
      />
    </el-tabs>
    <div
      class="flex between"
      style="margin-bottom: 8px"
    >
      <div class="flex">
        <div>主属性：</div>
        <el-checkbox
          v-model="checkAllAttr"
          label="all"
          :indeterminate="isIndeterminateAllAttr"
          @change="handleCheckAllAttrChange"
        >
          全部&nbsp;&nbsp;
        </el-checkbox>
        &nbsp;
        <el-checkbox-group
          v-model="checkAttrList"
          @change="handleCheckedAttrChange"
        >
          <el-checkbox
            v-for="item in allAttrList"
            :key="item.key"
            :label="item.key"
          >
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-tooltip
        :content="'本页面只显示6星御魂, 非6星不予考虑. 收益次数计算仅供参考, 根据自身练度可考虑弃置标红的御魂'"
        placement="left-start"
      >
        <el-tag
          size="small"
          type="info"
        >
          ?
        </el-tag>
      </el-tooltip>
    </div>
    <div
      class="flex"
      style="margin-bottom: 8px"
    >
      <div class="flex">
        <div>等级：</div>
        <el-checkbox
          v-model="checkAllLevel"
          label="all"
          :indeterminate="isIndeterminateAllLevel"
          @change="handleCheckAllLevelChange"
        >
          全部&nbsp;&nbsp;
        </el-checkbox>
        &nbsp;
        <el-checkbox-group
          v-model="checkLevelList"
          @change="handleCheckedLevelChange"
        >
          <el-checkbox
            v-for="item in 16"
            :key="item - 1"
            :label="item - 1"
          >
            {{ item - 1 }}级
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div
      class="flex"
      style="margin-bottom: 8px"
    >
      <div class="flex">
        <div>位置：</div>
        <el-checkbox
          v-model="checkAllPosition"
          label="all"
          :indeterminate="isIndeterminateAllPosition"
          @change="handleCheckAllPositionChange"
        >
          全部&nbsp;&nbsp;
        </el-checkbox>
        &nbsp;
        <el-checkbox-group
          v-model="checkPositionList"
          @change="handleCheckedPositionChange"
        >
          <el-checkbox
            v-for="item in 6"
            :key="item"
            :label="item - 1"
          >
            {{ transNumberToChinese(item) }}号位
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div
        class="flex"
        style="margin-left: 60px"
      >
        <div>种类：</div>
        <el-select
          v-if="equipList"
          v-model="checkEquipType"
          clearable
          placeholder="可选择过滤种类"
          no-data-text="全部"
          @change="initData"
        >
          <el-option
            v-for="item in equipList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div
        class="flex"
        style="margin-left: 40px"
      >
        <div>副属性：</div>
        <el-select
          v-model="randomAttrsLengthFilter"
          clearable
          placeholder="可选则副属性数量"
          no-data-text="全部"
          @change="initData"
        >
          <el-option
            v-for="item in randomAttrsSelectorList"
            :key="item.key"
            :label="item.name"
            :value="`${item.key}`"
          />
        </el-select>
      </div>
    </div>
    <div>
      <el-table
        :data="computedList"
        highlight-current-row
        stripe
        border
        style="width: 100%"
        @sort-change="onTableSortChange"
      >
        <el-table-column
          type="index"
          fixed="left"
          width="50"
        />
        <el-table-column
          prop="pos"
          label="位置"
          width="60"
          fixed="left"
        >
          <template #default="scope">
            {{ transNumberToChinese(scope.row.pos + 1) }}
          </template>
        </el-table-column>
        <el-table-column
          width="60"
          prop="level"
          label="等级"
          fixed="left"
        />

        <el-table-column
          label="御魂类型"
          width="90"
          fixed="left"
        >
          <template #default="scope">
            {{ equipMap[`${scope.row.suit_id}`] }}
          </template>
        </el-table-column>

        <el-table-column
          label="主属性"
          width="140"
          fixed="left"
        >
          <template #default="scope">
            <div class="flex attr-name">
              <div class="main">
                {{ transAttrToName(scope.row.mainAttr.type) }}
              </div>
              <div
                v-if="scope.row.single_attrs.length > 0"
                class="fixed-name"
              >
                &nbsp;|&nbsp;{{
                  transAttrToName(scope.row.single_attrs[0].type)
                }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-for="attr in effectiveAttrList"
          :key="attr.key"
          :label="attr.name"
          min-width="125"
          align="left"
          sortable="custom"
          :prop="attr.key"
        >
          <template #default="scope">
            <div class="flex relative">
              <div
                v-show="pageSize > 20"
                class="absolute attr-nick"
              >
                {{ attr.nick }}
              </div>
              <!-- 主属性 -->
              <div
                v-if="scope.row.mainAttr.type === attr.key"
                class="attr-value main"
              >
                {{ scope.row.mainAttr.value }}
              </div>
              <!-- 主属性 end -->
              <!-- 副属性 -->
              <div
                v-if="scope.row[`${attr.key}`]"
                class="attr-value random"
              >
                {{ scope.row.mainAttr.type === attr.key ? '&nbsp;+' : ''
                }}{{ scope.row[`${attr.key}`].toFixed(2) }}
              </div>
              <!-- 副属性 end-->
              <!-- 固定属性 -->
              <div
                v-if="
                  scope.row.single_attrs.length > 0 &&
                    scope.row.single_attrs[0].type === attr.key
                "
                class="attr-value fixed-value"
              >
                &nbsp;+{{ scope.row.single_attrs[0].value }}
              </div>
              <!-- 固定属性 end -->
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="收益"
          width="80"
          fixed="right"
          sortable="custom"
          prop="effectAttrCount"
        >
          <template #default="scope">
            <div
              class="ava"
              :class="{
                useless: ifEquipUseless(
                  scope.row.effectAttrCount,
                  scope.row.level,
                ),
              }"
            >
              {{ scope.row.effectAttrCount }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="腿"
          width="45"
          fixed="right"
          prop="randomAttrsLength"
        />

        <el-table-column
          label="获得时间"
          width="140"
          fixed="right"
        >
          <!-- 导出数据里这个时间是个中时区（+0000）的秒数时间 -->
          <template #default="scope">
            <div class="born-time">
              {{
                formatTime(
                  new Date(
                    (scope.row.born - new Date().getTimezoneOffset() * 60) *
                      1000,
                  ),
                  'YYYY-MM-DD HH:mm',
                )
              }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flex center pagination-wrap">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
        layout="prev, pager, next, jumper, sizes, total"
        :page-sizes="[5, 10, 15, 20, 40, 100]"
        :total="list.length"
      />
    </div>
  </div>
</template>

<script>
export default defineComponent({
  name: 'EquipList',
})
</script>

<script setup>
import { defineComponent, ref, nextTick, computed, watch } from 'vue'
import { useStore } from 'vuex'
import {
  ElCheckboxGroup,
  ElCheckbox,
  ElPagination,
  ElSelect,
  ElOption,
  ElTabs,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTooltip,
} from 'element-plus'
import util from '@/utils/index'
import useCommon from '../useCommon'

const { formatTime } = useCommon()
const $store = useStore()
const equipMap = computed(() => $store.getters.equipMap)
const effectiveAttrList = computed(() => $store.getters.effectiveAttrList)
const equipList = computed(() => $store.state.equipList)
const allAttrMap = computed(() => $store.getters.allAttrMap)

const transAttrToName = function (attr) {
  return allAttrMap.value[attr]
}

const transNumberToChinese = function (value) {
  return util.transNumberToChinese(value)
}

const randomAttrsSelectorList = ref([
  {
    key: '1',
    name: '4腿',
  },
  {
    key: '2',
    name: '瘸腿',
  },
])

const changeUser = function () {
  nextTick(() => {
    initData()
  })
}

const allAttrList = computed(() => $store.getters.allAttrList)
let checkAttrList = ref(allAttrList.value.map((item) => item.key))
let isIndeterminateAllAttr = ref(false)
const handleCheckAllAttrChange = function (bool) {
  checkAttrList.value = bool ? allAttrList.value.map((item) => item.key) : []
  isIndeterminateAllAttr.value = false
  currentPage.value = 1
  initData()
}

let checkAllAttr = ref(true)
const handleCheckedAttrChange = function (value) {
  checkAllAttr.value = allAttrList.value.length === value.length
  isIndeterminateAllAttr.value =
    value.length > 0 && value.length < allAttrList.value.length
  currentPage.value = 1
  initData()
}

let checkLevelList = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
let isIndeterminateAllLevel = ref(false)
const handleCheckAllLevelChange = function (bool) {
  checkLevelList.value = bool
    ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    : []
  isIndeterminateAllLevel.value = false
  currentPage.value = 1
  initData()
}
let checkAllLevel = ref(true)
const handleCheckedLevelChange = function (value) {
  checkAllLevel.value = 16 === value.length
  isIndeterminateAllLevel.value = value.length > 0 && value.length < 16
  currentPage.value = 1
  initData()
}

// 位置过滤相关
let checkAllPosition = ref(true)
let isIndeterminateAllPosition = ref(false)
const checkPositionList = ref([0, 1, 2, 3, 4, 5])

const handleCheckAllPositionChange = function (bool) {
  checkPositionList.value = bool ? [0, 1, 2, 3, 4, 5] : []
  isIndeterminateAllPosition.value = false
  currentPage.value = 1
  initData()
}
const handleCheckedPositionChange = function (value) {
  checkAllPosition.value = 6 === value.length
  isIndeterminateAllPosition.value = value.length > 0 && value.length < 6
  currentPage.value = 1
  initData()
}

const onTableSortChange = function ({ prop, order }) {
  // 默认按 获得时间 排序
  let sortMethod = (a, b) => b.born - a.born

  if (order === 'descending') {
    // 从高到低
    sortMethod = (a, b) => util.getAttrSum(b, prop) - util.getAttrSum(a, prop)
  } else if (order === 'ascending') {
    // 从低到高
    sortMethod = (a, b) => util.getAttrSum(a, prop) - util.getAttrSum(b, prop)
  } else {
    // 此时order为null
  }
  if (prop === 'effectAttrCount') {
    if (order === 'descending') {
      sortMethod = (a, b) => b.effectAttrCount - a.effectAttrCount
    } else if (order === 'ascending') {
      sortMethod = (a, b) => a.effectAttrCount - b.effectAttrCount
    }
  }
  list.value = list.value.sort(sortMethod).map((item) => item)
}

let currentPage = ref(1)
let pageSize = ref(10)
// 被过滤过的数据，未分页过的。
let list = ref([])
// 将数据分页。动辄上千行数据，全部渲染的话，会比较耗时
const computedList = computed(() => {
  return list.value.length < pageSize.value
    ? list.value
    : list.value.slice(
        (currentPage.value - 1) * pageSize.value,
        list.value.length > currentPage.value * pageSize.value
          ? currentPage.value * pageSize.value
          : list.value.length,
      )
})

const ifEquipUseless = function (count, level) {
  return (level === 0 && count <= 2) || (level === 15 && count <= 4)
}

const initPageSize = function () {
  const equipListPageSize = localStorage.getItem('equipListPageSize')
  if (equipListPageSize) {
    pageSize.value = parseInt(equipListPageSize)
  } else {
    localStorage.setItem('equipListPageSize', pageSize.value)
  }
}

watch(pageSize, () => {
  currentPage.value = 1
  localStorage.setItem('equipListPageSize', pageSize.value)
})

let currentUser = ref('0')
let equipTableRef = ref(null)
let randomAttrsLengthFilter = ref('')
let checkEquipType = ref('')
const userList = computed(() => $store.getters['user/list'])
const initData = function () {
  const data = userList.value[parseInt(currentUser.value)].data

  list.value = data.hero_equips
    .filter((item) => {
      return (
        checkAttrList.value.indexOf(item.mainAttr.type) !== -1 &&
        item.quality === 6 &&
        checkLevelList.value.indexOf(item.level) !== -1 &&
        checkPositionList.value.indexOf(item.pos) !== -1 &&
        (checkEquipType.value > 0
          ? checkEquipType.value === item.suit_id
          : true)
      )
    })
    .filter((item) => {
      if (randomAttrsLengthFilter.value === '1') {
        return item.randomAttrsLength === 4
      } else if (randomAttrsLengthFilter.value === '2') {
        return item.randomAttrsLength !== 4
      }
      return true
    })
    .sort((a, b) => b.born - a.born)

  if (
    equipTableRef.value &&
    typeof equipTableRef.value.clearSort === 'function'
  ) {
    equipTableRef.value.clearSort()
  }
}

initPageSize()
initData()
</script>

<style lang="scss" scoped>
@import '@/assets/css/flex-custom.scss';
@import '@/assets/css/border-box.scss';
.page-equip-list {
  padding: 0 0 20px;
  height: 100%;
  width: 1600px;
  margin: 0 auto;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}
.attr-nick {
  width: 30px;
  right: 0;
  bottom: -6px;
  font-size: 26px;
  line-height: 36px;
  opacity: 0.2;
}

$mainAttrColor: #f56c6c;
$fixedAttrColor: #e6a23c;

.attr-name {
  font-size: 12px;

  .main {
    color: $mainAttrColor;
    font-weight: 600;
  }

  .fixed-name {
    color: $fixedAttrColor;
  }
}

.attr-value {
  color: #222;

  &.main {
    color: $mainAttrColor;
    font-weight: 600;
  }

  &.random {
    color: #777;
  }

  &.fixed-value {
    color: $fixedAttrColor;
  }
}

.born-time {
  font-size: 12px;
  color: #777;
}

.pagination-wrap {
  padding: 10px 0;
}

.useless {
  color: OrangeRed;
}
</style>
