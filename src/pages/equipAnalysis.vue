<template>
  <div class="page-equip-analysis">
    <div class="herder">
      <div class="flex baseline">
        <h2>满速套装分析</h2>
        <div style="font-size: 12px;color: #999;margin: 0 10px;">所列速度均为副属性，二号位只显示双速，无速度不予显示</div>
        <div class="analysis-value neck">&gt;13.5</div>
        <div class="analysis-value full">&gt;15</div>
        <div class="analysis-value rare">&gt;16.5</div>
        <div class="analysis-value extreme">&gt;=17</div>
        <div class="analysis-value european">&gt;=17.5</div>
      </div>
      <h5>用于分析某一套装的速度短板，方便赌魂/爆肝</h5>
      <el-tabs v-model="currentUser"
               v-if="userList.length > 1"
               type="card"
               @tab-click="changeUser">
        <el-tab-pane :label="u.data.player.name"
                     v-for="(u, userIndex) in userList"
                     :key="userIndex"></el-tab-pane>
      </el-tabs>
      <div class="flex center">
        <div v-for="(suit, suitIndex) in scatteredSuit" :key="suitIndex">
          <div>散件{{ transNumberToChinese(suitIndex + 1) }}速: {{ suit.toFixed(3) }}; &nbsp;</div>
        </div>
        <div>&nbsp;满速17+: {{ fullCount17 }}个;</div>
        <div>&nbsp;满速16+: {{ fullCount }}个;</div>
        <div>&nbsp;满速15+: {{ fullCount15 }}个;</div>
      </div>
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
            <div>位置{{ transNumberToChinese(pIndex + 1) }}&nbsp;</div>
            <div
              v-if="p.length > 0"
              class="analysis-value"
              :class="{
                'neck'    : (pIndex !==1 && p[0].value > 13.5)  || (pIndex === 1 && p[0].value > (57 + 13.5)),
                'full'    : (pIndex !==1 && p[0].value > 15)    || (pIndex === 1 && p[0].value > (57 + 15)),
                'rare'    : (pIndex !==1 && p[0].value > 16.5)  || (pIndex === 1 && p[0].value > (57 + 16.5)),
                'extreme' : (pIndex !==1 && p[0].value >= 17)   || (pIndex === 1 && p[0].value >= (57 + 17)),
                'european': (pIndex !==1 && p[0].value >= 17.5) || (pIndex === 1 && p[0].value >= (57 + 17.5)),
              }"
            >
              <el-tooltip effect="dark"
                          placement="top"
                          :content="'主 ' + allAttrMap[`${p[0].mainAttr.type}`]"
                          :disabled="!(p.length > 0 && (pIndex === 3 || pIndex === 5) && p[0].value > 15)">
                <!-- 二号位置仅显示双速的 -->
                <div v-if="pIndex === 1 && p[0].value > 59">{{ (p[0].value - 57).toFixed(2) }}</div>
                <div v-else-if="pIndex !== 1 && p[0].value > 0">{{ p[0].value.toFixed(2) }}</div>
              </el-tooltip>
            </div>

            <template v-if="p.length > 1 && (pIndex !== 1 && p[1].value  > 15 || (pIndex === 1 && p[1].value > (57 + 15)))">
              <el-tooltip effect="dark"
                          placement="top"
                          :content="'2速 主' + allAttrMap[`${p[1].mainAttr.type}`] + ', ' + p[1].value.toFixed(2) + '速'">
                <div class="analysis-value"
                     :class="{
                       'neck'    : (pIndex !==1 && p[1].value > 13.5)  || (pIndex === 1 && p[1].value > (57 + 13.5)),
                       'full'    : (pIndex !==1 && p[1].value > 15)    || (pIndex === 1 && p[1].value > (57 + 15)),
                       'rare'    : (pIndex !==1 && p[1].value > 16.5)  || (pIndex === 1 && p[1].value > (57 + 16.5)),
                       'extreme' : (pIndex !==1 && p[1].value >= 17)   || (pIndex === 1 && p[1].value >= (57 + 17)),
                       'european': (pIndex !==1 && p[1].value >= 17.5) || (pIndex === 1 && p[1].value >= (57 + 17.5)),
                     }">&nbsp;&nbsp;
                </div>
              </el-tooltip>
            </template>

            <template v-if="p.length > 2 && (pIndex !== 1 && p[2].value  > 15 || (pIndex === 1 && p[2].value > (57 + 15)))">
              <el-tooltip effect="dark"
                          placement="top"
                          :content="'3速 主' + allAttrMap[`${p[2].mainAttr.type}`] + ', ' + p[2].value.toFixed(2) + '速'">
                <div class="analysis-value"
                     :class="{
                       'neck'    : (pIndex !==1 && p[2].value > 13.5)  || (pIndex === 1 && p[2].value > (57 + 13.5)),
                       'full'    : (pIndex !==1 && p[2].value > 15)    || (pIndex === 1 && p[2].value > (57 + 15)),
                       'rare'    : (pIndex !==1 && p[2].value > 16.5)  || (pIndex === 1 && p[2].value > (57 + 16.5)),
                       'extreme' : (pIndex !==1 && p[2].value >= 17)   || (pIndex === 1 && p[2].value >= (57 + 17)),
                       'european': (pIndex !==1 && p[2].value >= 17.5) || (pIndex === 1 && p[2].value >= (57 + 17.5)),
                     }">&nbsp;&nbsp;
                </div>
              </el-tooltip>
            </template>

          </div>
        </div>
      </el-card>
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
      // 散件速度计算
      scatteredSuit: [],
      loading: false,
      // 16满速个数统计
      fullCount: 0,
      fullCount15: 0,
      fullCount17: 0
    }
  },
  computed: {
    ...mapState([
      'equipList',
      'notPercentAttr'
    ]),
    ...mapGetters([
      'allAttrMap',
    ]),
    ...mapGetters('user', [
      'userList'
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
    transNumberToChinese (value) { return util.transNumberToChinese(value) },
    initData (attrName = 'Speed') {
      this.fullCount = 0
      this.fullCount17 = 0
      this.fullCount15 = 0
      this.loading = true
      // 散件
      let scatteredSuit = {
        name: '散件',
        id: '-111',
        position: [
          [],
          [],
          [],
          [],
          [],
          []
        ]
      }
      this.aData = this.equipList.map(equip => {
        const finalEquipData = {
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

        this.userList[parseInt(this.currentUser)].data.hero_equips.forEach(item => {
          if (item.suit_id === equip.id) {
            let sum = util.getAttrSum(item, attrName)

            if ((sum > 15 && item.pos !== 1) || (sum > 57+15 && item.pos === 1)) this.fullCount15 = this.fullCount15 + 1
            if ((sum > 16 && item.pos !== 1) || (sum > 57+16 && item.pos === 1)) this.fullCount = this.fullCount + 1
            if ((sum > 17 && item.pos !== 1) || (sum > 57+17 && item.pos === 1)) this.fullCount17 = this.fullCount17 + 1

            finalEquipData.position[item.pos].push({
              mainAttr: JSON.parse(JSON.stringify(item.mainAttr)),
              // value: util.getAttrSum(item, attrName)
              value: sum
            })
            scatteredSuit.position[item.pos].push({
              name: equip.name,
              mainAttr: JSON.parse(JSON.stringify(item.mainAttr)),
              // value: util.getAttrSum(item, attrName)
              value: sum
            })
          }
        })

        finalEquipData.position.forEach(item => {
          item.sort((a, b) => (b.value - a.value))
        })
        scatteredSuit.position.forEach(item => {
          item.sort((a, b) => (b.value - a.value))
        })
        return finalEquipData
      })

      scatteredSuit.position = scatteredSuit.position.map(p => {
        return p.length > 4 ? p.slice(0, 4) : p
      })
      this.aData.unshift(scatteredSuit)
      // 散件总速度计算
      this.scatteredSuit = scatteredSuit.position.reduce((total, current) => {
        total[0] = (current[0].value || 0) + (total[0] || 0)
        total[1] = (current[1].value || 0) + (total[1] || 0)
        total[2] = (current[2].value || 0) + (total[2] || 0)
        // total[3] = (current[3].value || 0) + (total[3] || 0)
        return total
      }, [])
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    changeUser () {
      this.$nextTick(() => {
        this.initData()
      })
    },
    multiply (value, ratio = 100) {
      return util.multiply(value, ratio)
    }
  }
}
</script>
<style lang="scss">
.page-equip-analysis {
  .el-card__header {
    padding: 10px 10px 6px;
  }

  .el-card__body {
    padding: 20px 0 10px 10px;
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
  width: 144px;
  //max-width: 150px;
  min-height: 140px;
  margin-right: 12px;
  margin-bottom: 10px;
}

.analysis-item {
  margin-bottom: 4px;
}

.analysis-value {
  padding: 0 4px;
  border-radius: 4px;
  cursor: default;

  & + .analysis-value {
    margin-left: 2px;
  }
}

.analysis-main-attr {
  margin-left: 4px;
  font-weight: 500;
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
