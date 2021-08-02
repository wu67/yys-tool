<template>
  <div class="page-equip-list">
    <el-tabs v-model="currentUser"
             type="card"
             @tab-click="changeUser">
<!--      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>-->
      <el-tab-pane :label="user.data.player.name"
                   v-for="(user, userIndex) in user.userList"
                   :key="userIndex"></el-tab-pane>
    </el-tabs>
    <div class="flex" style="margin-bottom: 10px;">
      <div class="flex">
        <div>主属性：</div>
        <el-checkbox label="all"
                     v-model="checkAllAttr"
                     @change="handleCheckAllAttrChange"
                     :indeterminate="isIndeterminateAllAttr">全部</el-checkbox>&nbsp;
        <el-checkbox-group @change="handleCheckedAttrChange" v-model="checkAttrList">
          <el-checkbox
            v-for="item in allAttrList"
            :label="item.key"
            :key="item.key">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <!--      v-if="list.length > 0"-->
    <div
      style="">
<!--        height="100%"-->
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
        :page-sizes="[5, 10, 15,  20]"
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
import mathjs from '@/utils/mathjs'
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
      checkAllAttr: true,
      isIndeterminateAllAttr: false,
      checkAttrList: [],
      list: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapState([
      'user',
      'equipList',
      'notPercentAttr'
    ]),
    ...mapGetters([
      'equipMap',
      'allAttrMap',
      'allAttrList',
      'effectiveAttrList'
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
    this.initData()
  },
  updated () {},
  beforeDestroy () {},
  methods: {
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
    initData () {
      const data = this.user.userList[parseInt(this.currentUser)].data

      this.list = data.hero_equips
        .map(item => {
          const result = {
            // ...item,
            // base_attr: item.base_attr,
            // random_attrs: item.random_attrs,
            id: item.id,
            single_attrs: [],
            born: item.born,
            level: item.level,
            pos: item.pos,
            quality: item.quality,
            suit_id: item.suit_id,
            mainAttr: {
              type: item.base_attr.type
            }
          }

          // 处理副属性
          for (const rAttr of item.random_attrs) {
            if (this.notPercentAttr.indexOf(rAttr.type) === -1) {
              result[`${rAttr.type}`] = this.multiply(rAttr.value)
            } else {
              result[`${rAttr.type}`] = rAttr.value
            }
          }

          // 处理主属性
          if (this.notPercentAttr.indexOf(item.base_attr.type) === -1) {
            result.mainAttr.value = this.multiply(item.base_attr.value)
          } else {
            result.mainAttr.value = item.base_attr.value
          }

          // 处理首领魂的固定属性 全是加成百分比属性. 当前版本最多只会有1条固定属性
          if (item.single_attrs.length > 0) {
            result.single_attrs.push({
              type: item.single_attrs[0].type,
              value: this.multiply(item.single_attrs[0].value)
            })
          }
          return result
        })
        .filter(item => (this.checkAttrList.indexOf(item.mainAttr.type) !== -1))
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
        sortMethod = (a, b) => this.getAttrSum(b, prop) - this.getAttrSum(a, prop)

      } else if (order === 'ascending') {
        // 从低到高
        sortMethod = (a, b) => this.getAttrSum(a, prop) - this.getAttrSum(b, prop)
      } else {
        // 此时order为null
      }
      this.list = this.list.sort(sortMethod).map(item => item)
    },
    // 计算单个御魂中某个属性的总值
    getAttrSum (equip, attrName) {
      let sum = 0
      sum += equip[`${attrName}`] || 0

      // 主属性
      if (equip.mainAttr.type === attrName) {
        sum = sum + equip.mainAttr.value
      }
      // （首领魂）固定属性
      if (equip.single_attrs.length > 0 && equip.single_attrs[0].type === attrName) {
        sum = sum + equip.single_attrs[0].value
      }
      return sum
    },
    transAttrToName (attr) {
      return this.allAttrMap[attr]
    },
    multiply (value, ratio = 100) {
      return parseFloat(mathjs.chain(value).multiply(ratio).done().toPrecision(12))
    }
  }
}
</script>

<style lang="scss"
       scoped>
@import "~@/assets/css/flex-custom.scss";

.page-equip-list {
  padding: 10px 40px 20px;
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
