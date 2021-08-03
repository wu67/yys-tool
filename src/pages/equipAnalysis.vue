<template>
  <div class="page-equip-analysis">
    <div class="herder">
      <h2>满速套装分析</h2>
      <h5>用于分析某一套装的速度短板，方便赌魂/爆肝</h5>
      <el-tabs v-model="currentUser"
               v-if="user.userList.length > 1"
               type="card"
               @tab-click="changeUser">
        <el-tab-pane :label="u.data.player.name"
                     v-for="(u, userIndex) in user.userList"
                     :key="userIndex"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="flex wrap" v-loading="loading">
      <el-card
        class="equip-item"
        :class="{ 'important': importantSuit.indexOf(equip.id) !== -1 }"
        shadow="hover"
        v-for="(equip, equipIndex) in aData"
        :key="equipIndex">
        <div slot="header">
          <div>{{ equip.name }}</div>
        </div>
        <div class="position" v-for="(p, pIndex) in equip.position" :key="pIndex">
          <div class="flex analysis-item">
<!--            <div v-for="(speed, speedIndex) in p" :key="speedIndex">{{ speed }}</div>-->
            <div>位置{{ transNumberToChinese(pIndex + 1) }}:&nbsp;</div>
            <div
              v-if="p.length > 0"
              class="analysis-value"
              :class="{
                'neck': (pIndex !==1 && p[0] > 13) || (pIndex === 1 && p[0] > (57 + 13)),
                'full': (pIndex !==1 && p[0] > 15) || (pIndex === 1 && p[0] > (57 + 15)),
                'rare': (pIndex !==1 && p[0] > 16.5) || (pIndex === 1 && p[0] > (57 + 16.5)),
                'extreme': (pIndex !==1 && p[0] > 17) || (pIndex === 1 && p[0] > (57 + 17)),
                'european': (pIndex !==1 && p[0] > 17.5) || (pIndex === 1 && p[0] > (57 + 17.5)),
              }"
            >
              <!-- 二号位置仅显示双速的 -->
              <div v-if="pIndex === 1 && p[0] > 59">{{ (p[0] - 57).toFixed(2) }}</div>
              <div v-else-if="pIndex !== 1">{{ p[0].toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import mathjs from '@/utils/mathjs'
import baseMixin from '@/mixin'

export default {
  name: 'equipAnalysis',
  mixins: [
    baseMixin
  ],
  components: {},
  filters: {},
  props: {},
  data () {
    return {
      // 重点套装 版本之子
      importantSuit: [
        300002,
        300010,
        300012,
        300013,
        300015,
        300019,
        300021,
        300023,
        300034,
        300035,
        300079
      ],
      currentUser: 0,
      aData: [],
      loading: false
    }
  },
  computed: {
    ...mapState([
      'user',
      'equipList',
      'notPercentAttr'
    ])
  },
  watch: {},
  created () {
    this.initData()
  },
  mounted () {},
  updated () {},
  beforeDestroy () {},
  methods: {
    initData (attrName = 'Speed') {
      this.loading = true
      this.aData = this.equipList.map(equip => {
        let finalEquipData = {
          ...equip,
          // 6个位置，按属性排序
          position: [
            [],
            [],
            [],
            [],
            [],
            [],
          ]
        }
        const userEquips = this.user.userList[parseInt(this.currentUser)].data.hero_equips
        let temp = userEquips.map(item => {
          const result = {
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
        temp.forEach(item => {
          if (item.suit_id === equip.id) {
            let speed = this.getAttrSum(item, attrName)
            finalEquipData.position[item.pos].push(speed)
          }
        })

        finalEquipData.position.forEach(item => {
          item.sort((a, b) => (b - a))
        })
        return finalEquipData
      })
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    changeUser () {
      this.$nextTick(() => {
        this.initData()
      })
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
    multiply (value, ratio = 100) {
      return parseFloat(mathjs.chain(value).multiply(ratio).done().toPrecision(12))
    }
  }
}
</script>
<style lang="scss">
.page-equip-analysis {
  .el-card__header {
    padding: 10px 20px 6px;
  }
}
</style>
<style lang="scss"
       scoped>
@import "~@/assets/css/flex-custom.scss";

.page-equip-analysis {
  padding: 0 16px 20px;
  height: 100%;
  width: 1600px;
  margin: 0 auto;
}

.herder {
  margin: 0 auto;
  width: 1600px;
}

.equip-item {
  width: 140px;
  min-height: 140px;
  margin-right: 8px;
  margin-bottom: 10px;

  & + .equip-item {
    //margin
  }
}

.analysis-item {
  margin-bottom: 4px;
}

.analysis-value {
  padding: 0 4px;
  border-radius: 4px;
}

.neck {
  background-color: #E1FFFF;
}

.full {
  background-color: Green;
  color: #fff;
  font-weight: 500;
}

.rare {
  background-color: DarkOrange;
  color: #fff;
  font-weight: 500;
}

.extreme {
  background-color: OrangeRed;
  color: #fff;
  font-weight: 500;
}

.european {
  background-color: #9400D3;
  color: #fff;
  font-weight: 500;
}

.important {
  border-color: #bbb;
  background-color: #f6f6f6;
}
</style>
