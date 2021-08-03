<template>
  <div class="page-shards-list">
    <dialogSetNotIncluded
      :show.sync="dialogSetNotIncludedVisible"
      v-if="dialogSetNotIncludedVisible"
      :notIncluded="notIncludedList[currentEditNotIncludedUserIndex]"
      :userName="userList[currentEditNotIncludedUserIndex].data.player.name"
      @change-not-included="changeNotIncluded"
    ></dialogSetNotIncluded>
    <div class="flex between" style="margin-bottom: 8px;">
      <div>
        <el-checkbox label="all"
                     v-model="checkAll"
                     @change="handleCheckAllChange"
                     :indeterminate="isIndeterminate">全部</el-checkbox>
        <el-checkbox-group @change="handleCheckedRarityChange" v-model="checkList">
        <el-checkbox
          v-for="item in rarityList"
          :label="item.value"
          :key="item.value">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <el-button size="mini" @click="checkList = []">清空稀有度</el-button>
        <el-button size="mini" @click="clearFilter">重置所有过滤项</el-button>
      </div>
    </div>

    <div v-if="shards.length > 0" style="height: calc(100vh - 172px)">
      <el-table
        :data="computedShardsList"
        highlight-current-row
        stripe
        border
        height="100%"
        ref="shardsTable"
        style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
        <!-- <el-table-column
        width="180"
          prop="bookMaxShards"
          label="契约召唤所需碎片数">
        </el-table-column> -->

      <el-table-column
        prop="name"
        label="名称"
        width="110">
      </el-table-column>

      <el-table-column
        label="稀有度"
        width="80">
        <template slot-scope="scope">
          <div
            class="rarity"
            :class="`${scope.row.rarity}`">{{ transformRarityName(scope.row.rarity) }}</div>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        v-for="(user, userIndex) in userList"
        :label="`${user.data.player.name}`"
        :key="`userColumn${userIndex}`">
        <template slot="header">
          <div class="flex center">
            <div>{{ user.data.player.name }}</div>&nbsp;
            <div class="btnSetNotIncluded" @click="setNotIncluded(userIndex)">设置未收录</div>
          </div>
        </template>
        <el-table-column
          :label="`持有碎片`"
          :key="`shard${userIndex}`">
          <template slot-scope="scope">
            <div>{{ scope.row.shards[userIndex] }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :filters="[{ text: '已收录', value: 1 }, { text: '未收录', value: 0 }]"
          :filter-method="(value, row) => filterIncluded(value, row, userIndex)"
          :label="`收录状态`"
          :key="`included${userIndex}`">
          <template slot-scope="scope">
            <div :class="{ 'not-included': scope.row.included[userIndex] === 0 }">
              {{ scope.row.included[userIndex] === 1 ? '' : '未收录' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :filters="[{ text: '仓库中有', value: 1 }, { text: '仓库中无', value: 0 }]"
          :filter-method="(value, row) => filterHave(value, row, userIndex)"
          :label="`仓检`"
          :key="`have${userIndex}`">
          <template slot-scope="scope">
            <div :class="{ 'have-not': scope.row.have[userIndex] === 0 }">
              {{ scope.row.have[userIndex] === 1 ? '' : '仓库中无' }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        width="110">
      </el-table-column>
      <el-table-column
        label="共有碎片"
        prop="holdings"
        width="80">
      </el-table-column>
      <el-table-column
        label="仍缺"
        prop="required"
        width="80">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import dialogSetNotIncluded from '@/components/dialogSetNotIncluded'
import baseMixin from '@/mixin'

import {
  mapGetters,
  mapState
} from 'vuex'

export default {
  name: "heroList",
  mixins: [
    baseMixin
  ],
  components: {
    dialogSetNotIncluded
  },
  filters: {},
  props: {},
  data () {
    return {
      tableHeight: 0,
      rarityList: [
        {
          name: 'SP',
          value: 'SP'
        },
        {
          name: 'SSR',
          value: 'SSR'
        },
        {
          name: 'SR',
          value: 'SR'
        },
        {
          name: 'R',
          value: 'R'
        },
        {
          name: 'N',
          value: 'N'
        },
        {
          name: '素材',
          value: 'MATERIAL'
        },
        {
          name: '联动',
          value: 'INTERACTIVE'
        }
      ],
      isIndeterminate: true,
      checkAll: false,
      checkList: [
        'SP',
        'SSR'
      ],
      shards: [],
      // 已收录的id
      heroIdList: [],
      currentEditNotIncludedUserIndex: -1,
      dialogSetNotIncludedVisible: false
    }
  },
  computed: {
    ...mapState([
      'allHeroList',
      'notIncludedList',
    ]),
    ...mapGetters('user', [
      'userList'
    ]),
    computedShardsList () {
      let result = []
      if (this.checkList.indexOf('INTERACTIVE') !== -1) {
        result = this.shards.filter(item => {
          return (this.checkList.indexOf(item.rarity) !== -1) || item.interactive
        })
      } else {
        result = this.shards.filter(item => {
          return (this.checkList.indexOf(item.rarity) !== -1) && !(typeof item.interactive !== 'undefined')
        })
      }
      return result
    }
  },
  watch: {},
  created () {
    this.getNotIncluded().then(() => {
      this.initData()
    })
  },
  mounted () {
  },
  updated () {},
  methods: {
    initData () {
      this.shards = this.allHeroList.sort((a, b) => b.id - a.id).map(item => {
        let obj = {
          name: item.name,
          rarity: item.rarity,
          id: item.id,
          shards: [],
          // 收录状态. 手动维护额外数据(未收录id), 导出器和痒痒熊导出的数据无法判断是否为已收录, 只能判断当前仓库中有没有该卡.
          included: [],
          // 当前 式神录/仓库 中是否存在该卡
          have: [],
          // 需求量。所有账号共计
          required: 0,
          // 持有量。所有账号共计
          holdings: 0
        }
        // 联动
        if (item.interactive === true) {
          obj.interactive = true
        }
        // obj.shards = []
        this.userList.forEach((user, index) => {
          // 处理持有的碎片和召唤所需碎片数
          user.data.hero_book_shards.forEach((hero) => {
            if (obj.id == hero.hero_id) {
              obj.bookMaxShards = hero.book_max_shards
              obj.shards[index] = hero.shards
              // obj.shards.push(hero.shards)
            }
          })

          this.heroIdList[index] = Array.from(new Set(user.data.heroes.map(item => item.hero_id)))

          obj.included[index] = this.notIncludedList[index].indexOf(parseInt(item.id)) !== -1 ? 0 : 1

          obj.have[index] = this.heroIdList[index].indexOf(parseInt(item.id)) !== -1 ? 1 : 0
        })

        obj.holdings = obj.shards.reduce((sum, current) => {
          sum += current;
          return sum
        }, 0)

        const notIncludedCount = obj.included.reduce((sum, current) => {
          // 检查收录状态，根据收录状态计算总需求量
          return current === 0 ? ++sum : sum
        }, 0)

        const temp = obj.bookMaxShards * notIncludedCount - obj.holdings
        obj.required = temp > 0 ? temp : '-'

        return obj
      })
    },
    transformRarityName (rarity) {
      let result = ''
      this.rarityList.forEach(item => {
        if (item.value == rarity) {
          result = item.name
        }
      })
      return result
    },
    handleCheckAllChange (val) {
      this.checkList = val ? this.rarityList.map(item => item.value) : []
      this.isIndeterminate = false
    },
    handleCheckedRarityChange (value) {
      this.checkAll = value.length === this.rarityList.length
      this.isIndeterminate = value.length > 0 && value.length < this.rarityList.length
    },
    clearFilter () {
      this.$refs.shardsTable.clearFilter()
    },
    filterIncluded (value, row, index) {
      return value === row.included[index]
    },
    filterHave (value, row, index) {
      return value === row.have[index]
    },
    setNotIncluded (userIndex) {
      this.currentEditNotIncludedUserIndex = userIndex
      this.dialogSetNotIncludedVisible = true
    },
    changeNotIncluded (array) {
      this.$store.commit('updateNotIncluded', {
        index: this.currentEditNotIncludedUserIndex,
        value: array
      })
      this.updateUserNotIncluded(this.currentEditNotIncludedUserIndex, {
        id: this.userList[this.currentEditNotIncludedUserIndex].data.player.id,
        value: array
      }).then(() => {
        this.$message.success(`设置未收录成功`)
        this.initData()
      })
    }
  },
}
</script>

<style lang="scss"
       scoped>
@import "~@/assets/css/flex-custom.scss";

.page-shards-list {
  padding: 0 40px 20px;
  height: 100%;
  //position: relative;
  width: 1200px;
  margin: 0 auto;
}

.rarity {
  font-weight: 800;

  &.SP {
    color: #EE2C2C;
  }

  &.SSR {
    color: #FFA500;
  }

  &.SR {
    color: #9400D3;
  }

  &.R {
    color: #1874CD;
  }

  &.N, &.MATERIAL {
    color: #9C9C9C;
  }
}

.included {
  color: #409EFF;
}

.not-included {
  color: #F56C6C;
}

.have-not {
  color: #E6A23C;
}

.btnSetNotIncluded {
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
}
</style>
