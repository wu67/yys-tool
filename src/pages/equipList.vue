<template>
  <div class="page-equip-list">
    <el-tabs v-model="currentUser"
             size="small"
             type="card"
             @tab-click="changeUser">
      <el-tab-pane :label="user.data.player.name"
                   v-for="(user, userIndex) in userList"
                   :key="userIndex"></el-tab-pane>
    </el-tabs>
    <div class="flex between" style="margin-bottom: 8px;">
      <div class="flex">
        <div>主属性：</div>
        <el-checkbox label="all"
                     v-model="checkAllAttr"
                     @change="handleCheckAllAttrChange"
                     :indeterminate="isIndeterminateAllAttr">全部&nbsp;&nbsp;</el-checkbox>&nbsp;
        <el-checkbox-group @change="handleCheckedAttrChange" v-model="checkAttrList">
          <el-checkbox
            v-for="item in allAttrList"
            :label="item.key"
            :key="item.key">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-tooltip
        content="本页面只显示6星御魂，非6星不予考虑"
        placement="left-start">
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>
    <div class="flex" style="margin-bottom: 8px;">
      <div class="flex">
        <div>等级：</div>
        <el-checkbox label="all"
                     v-model="checkAllLevel"
                     @change="handleCheckAllLevelChange"
                     :indeterminate="isIndeterminateAllLevel">全部&nbsp;&nbsp;</el-checkbox>&nbsp;
        <el-checkbox-group @change="handleCheckedLevelChange" v-model="checkLevelList">
          <el-checkbox
            v-for="item in 16"
            :label="item - 1"
            :key="item - 1">{{ item - 1 }}级</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="flex" style="margin-bottom: 8px;">
      <div class="flex">
        <div>位置：</div>
        <el-checkbox label="all"
                     v-model="checkAllPosition"
                     @change="handleCheckAllPositionChange"
                     :indeterminate="isIndeterminateAllPosition">全部&nbsp;&nbsp;</el-checkbox>&nbsp;
        <el-checkbox-group @change="handleCheckedPositionChange" v-model="checkPositionList">
          <el-checkbox
            v-for="item in 6"
            :label="item - 1"
            :key="item">{{ transNumberToChinese(item) }}号位</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="flex" style="margin-left: 60px;">
        <div>种类：</div>
         <el-select
           v-if="equipList.length > 1"
           v-model="checkEquipType"
           clearable
           size="mini"
           placeholder="可选择过滤种类"
           no-data-text="全部"
           @change="initData"
         >
          <el-option
            v-for="item in equipList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div
      style="">
      <el-table
        :data="computedList"
        @sort-change="onTableSortChange"
        highlight-current-row
        stripe
        border
        ref="equipTable"
        style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          width="50">
        </el-table-column>
        <el-table-column prop="pos" label="位置" width="50" fixed="left">
          <template slot-scope="scope">
            {{ transNumberToChinese(scope.row.pos + 1) }}
          </template>
        </el-table-column>
        <el-table-column width="50" prop="level" label="等级" fixed="left"></el-table-column>

        <el-table-column label="御魂类型" width="80" fixed="left">
          <template slot-scope="scope">
            {{ equipMap[`${scope.row.suit_id}`] }}
          </template>
        </el-table-column>

        <el-table-column label="主属性" width="130" fixed="left">
          <template slot-scope="scope">
            <div class="flex attr-name">
              <div class="main">{{ transAttrToName(scope.row.mainAttr.type) }}</div>
              <div v-if="scope.row.single_attrs.length > 0"
                   class="fixed-name">&nbsp;|&nbsp;{{ transAttrToName(scope.row.single_attrs[0].type) }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="attr.name"
                         min-width="125"
                         align="left"
                         sortable="custom"
                         v-for="attr in effectiveAttrList"
                         :prop="attr.key"
                         :key="attr.key">
          <template slot-scope="scope">
            <div class="flex">
              <!-- 主属性 -->
              <div
                class="attr-value main"
                v-if="scope.row.mainAttr.type === attr.key"
              >
                {{ scope.row.mainAttr.value }}
              </div>
              <!-- 主属性 end -->
              <!-- 副属性 -->
              <div
                class="attr-value random"
                v-if="scope.row[`${attr.key}`]"
              >
                {{ scope.row.mainAttr.type === attr.key ? '&nbsp;+' : '' }}{{ scope.row[`${attr.key}`].toFixed(2) }}
              </div>
              <!-- 副属性 end-->
              <!-- 固定属性 -->
              <div class="attr-value fixed-value"
                   v-if="scope.row.single_attrs.length > 0 && (scope.row.single_attrs[0].type === attr.key)">
                &nbsp;+{{ scope.row.single_attrs[0].value }}
              </div>
              <!-- 固定属性 end -->
            </div>
          </template>
        </el-table-column>

        <el-table-column label="腿" width="50" fixed="right" prop="randomAttrsLength"></el-table-column>

        <el-table-column label="获得时间" width="150" fixed="right">
          <template slot-scope="scope">
            <div class="born-time">{{ new Date(scope.row.born * 1000) | formatTime('yyyy-MM-dd hh:mm') }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flex center pagination-wrap">
      <el-pagination
        layout="prev, pager, next, jumper, sizes, total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :page-sizes="[5, 10, 15, 20, 40, 100]"
        :total="list.length">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import util from '@/utils/index'
import baseMixin from '@/mixin'

export default {
  name: 'equipList',
  mixins: [
    baseMixin
  ],
  components: {},
  props: {},
  data () {
    return {
      currentUser: 0,
      // 主属性过滤相关
      checkAllAttr: true,
      isIndeterminateAllAttr: false,
      checkAttrList: [],
      // 主属性过滤相关 end
      // 等级过滤相关
      checkAllLevel: true,
      isIndeterminateAllLevel: false,
      checkLevelList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      // 等级过滤相关 end
      // 位置过滤相关
      checkAllPosition: true,
      isIndeterminateAllPosition: false,
      checkPositionList: [0, 1, 2, 3, 4, 5],
      // 位置过滤相关 end
      checkEquipType: undefined,
      // 被过滤过的数据，未分页过的。
      list: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapState([
      'equipList',
      'notPercentAttr'
    ]),
    ...mapGetters([
      'equipMap',
      'allAttrMap',
      'allAttrList',
      'effectiveAttrList'
    ]),
    ...mapGetters('user', [
      'userList'
    ]),
    // 将数据分页。动辄上千行数据，全部渲染的话，会比较耗时
    computedList () {
      if (this.list.length < this.pageSize) {
        return this.list
      } else {
        return this.list
          .slice(
            (this.currentPage - 1) * this.pageSize,
            (this.list.length > this.currentPage * this.pageSize
              ? this.currentPage * this.pageSize
              : this.list.length)
          )
      }
    }
  },
  watch: {},
  created () {
    this.checkAttrList = this.allAttrList.map(item => item.key)
    // this.checkEquipType = this.equipList.map(item => item.id)
    this.initData()
  },
  updated () {},
  beforeDestroy () {},
  methods: {
    transNumberToChinese (value) { return util.transNumberToChinese(value) },
    changeUser () {
      this.$nextTick(() => {
        this.initData()
      })
    },
    handleCheckAllAttrChange (bool) {
      this.checkAttrList = bool ? this.allAttrList.map(item => item.key) : []
      this.isIndeterminateAllAttr = false
      this.currentPage = 1
      this.initData()
    },
    handleCheckedAttrChange (value) {
      this.checkAllAttr = this.allAttrList.length === value.length
      this.isIndeterminateAllAttr = value.length > 0 && value.length < this.allAttrList.length
      this.currentPage = 1
      this.initData()
    },
    handleCheckAllLevelChange (bool) {
      this.checkLevelList = bool ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] : []
      this.isIndeterminateAllLevel = false
      this.currentPage = 1
      this.initData()
    },
    handleCheckedLevelChange (value) {
      this.checkAllLevel = 16 === value.length
      this.isIndeterminateAllLevel = value.length > 0 && value.length < 16
      this.currentPage = 1
      this.initData()
    },
    handleCheckAllPositionChange (bool) {
      this.checkPositionList = bool ? [0, 1, 2, 3, 4, 5] : []
      this.isIndeterminateAllPosition = false
      this.currentPage = 1
      this.initData()
    },
    handleCheckedPositionChange (value) {
      this.checkAllPosition = 6 === value.length
      this.isIndeterminateAllPosition = value.length > 0 && value.length < 6
      this.currentPage = 1
      this.initData()
    },
    initData () {
      const data = this.userList[parseInt(this.currentUser)].data

      this.list = data.hero_equips
        .filter(item => {
          return (this.checkAttrList.indexOf(item.mainAttr.type) !== -1)
            && item.quality === 6
            && (this.checkLevelList.indexOf(item.level) !== -1)
            && (this.checkPositionList.indexOf(item.pos) !== -1)
            && ((this.checkEquipType && this.checkEquipType > 0) ? this.checkEquipType === item.suit_id : true)
        })
        .sort((a, b) => b.born - a.born)

      if (this.$refs.equipTable && typeof this.$refs.equipTable.clearSort === 'function') {
        this.$refs.equipTable.clearSort()
      }
    },
    onTableSortChange ({ prop, order }) {
      // 默认按 获得时间 排序
      let sortMethod = (a, b) => (b.born - a.born)

      if (order === 'descending') {
        // 从高到低
        sortMethod = (a, b) => util.getAttrSum(b, prop) - util.getAttrSum(a, prop)

      } else if (order === 'ascending') {
        // 从低到高
        sortMethod = (a, b) => util.getAttrSum(a, prop) - util.getAttrSum(b, prop)
      } else {
        // 此时order为null
      }
      this.list = this.list.sort(sortMethod).map(item => item)
    },
    transAttrToName (attr) {
      return this.allAttrMap[attr]
    },
    multiply (value, ratio = 100) {
      return util.multiply(value, ratio)
    }
  }
}
</script>

<style lang="scss"
       scoped>
@import "~@/assets/css/flex-custom.scss";

.page-equip-list {
  padding: 0 40px 20px;
  height: 100%;
  //position: relative;
  width: 1600px;
  margin: 0 auto;
}

$mainAttrColor: #F56C6C;
$fixedAttrColor: #E6A23C;

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
  //font-size: 11px;
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
</style>
