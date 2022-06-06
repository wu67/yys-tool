<template>
  <div class="page-equip-analysis">
    <div class="content-top">
      <div class="flex baseline">
        <h2>满速套装分析</h2>
        <div style="font-size: 12px; color: #999; margin: 0 10px">
          用于分析某一套装的速度短板，方便赌魂/爆肝
        </div>

        <div class="analysis-value neck">&gt;13.5</div>
        <div class="analysis-value full">&gt;15</div>
        <div class="analysis-value rare">&gt;16.5</div>
        <div class="analysis-value extreme">&gt;=17</div>
        <div class="analysis-value european">&gt;=17.5</div>

        <!-- style="margin-left: 10px" -->
        <el-tooltip
          content="所列速度均为副属性，二号位只显示双速，无速度不予显示，胚子只统计4腿的"
          placement="right"
        >
          <el-tag
            class="margin-of-speed-tag-tooltip"
            type="info"
          >
            ?
          </el-tag>
        </el-tooltip>
      </div>
      <el-tabs
        v-if="userList.length > 1"
        v-model="currentUser"
        type="card"
        @tab-click="changeUser"
      >
        <el-tab-pane
          v-for="(u, userIndex) in userList"
          :key="userIndex"
          :label="u.data.player.name"
        />
      </el-tabs>
      <div class="flex center extendCountArea">
        <div
          v-for="(suit, suitIndex) in scatteredSuit"
          :key="suitIndex"
        >
          <div>
            散件{{ transNumberToChinese(suitIndex + 1) }}速:
            {{ suit.toFixed(3) }}
          </div>
        </div>
        <div>满速17+: {{ fullCount17 }}个</div>
        <div>满速16+: {{ fullCount }}个</div>
        <div>满速15+: {{ fullCount15 }}个</div>
        <div>双速胚子：{{ doubleSpeedPrototypeCount }}个</div>
        <div>速度胚子：{{ speedPrototypeCount }}个</div>
      </div>
    </div>
    <div
      v-loading="loading"
      class="flex wrap"
    >
      <el-card
        v-for="(equip, equipIndex) in aData"
        :key="equipIndex"
        class="equip-item"
        :class="{ important: importantSuit.indexOf(equip.id) !== -1 }"
        shadow="hover"
      >
        <template #header>
          <div class="flex suit-name-wrap">
            <img
              v-if="equip.id > 0"
              :src="getImageURL(equip.id)"
              class="background"
            >
            <div>{{ equip.name }}</div>
          </div>
        </template>
        <div
          v-for="(p, pIndex) in equip.position"
          :key="pIndex"
          class="position"
        >
          <div class="flex analysis-item">
            <div>位置{{ transNumberToChinese(pIndex + 1) }}&nbsp;</div>
            <div
              v-if="p.length > 0"
              class="analysis-value"
              :class="{
                neck:
                  (pIndex !== 1 && p[0].value > 13.5) ||
                  (pIndex === 1 && p[0].value > 57 + 13.5),
                full:
                  (pIndex !== 1 && p[0].value > 15) ||
                  (pIndex === 1 && p[0].value > 57 + 15),
                rare:
                  (pIndex !== 1 && p[0].value > 16.5) ||
                  (pIndex === 1 && p[0].value > 57 + 16.5),
                extreme:
                  (pIndex !== 1 && p[0].value >= 17) ||
                  (pIndex === 1 && p[0].value >= 57 + 17),
                european:
                  (pIndex !== 1 && p[0].value >= 17.5) ||
                  (pIndex === 1 && p[0].value >= 57 + 17.5),
              }"
            >
              <!-- 二号位置仅显示双速的. 写到这里是因为不能把注视写到tooltip里面...不知道是ele的锅还是vite的锅 -->
              <el-tooltip
                effect="dark"
                placement="top"
                :content="'主 ' + allAttrMap[`${p[0].mainAttr.type}`]"
                :disabled="
                  !(
                    p.length > 0 &&
                    (pIndex === 3 || pIndex === 5) &&
                    p[0].value > 15
                  )
                "
              >
                <div>
                  <div v-if="pIndex === 1 && p[0].value > 59">
                    {{ (p[0].value - 57).toFixed(2) }}
                  </div>
                  <div v-else-if="pIndex !== 1 && p[0].value > 0">
                    {{ p[0].value.toFixed(2) }}
                  </div>
                </div>
              </el-tooltip>
            </div>

            <template
              v-if="
                p.length > 1 &&
                  ((pIndex !== 1 && p[1].value > 15) ||
                    (pIndex === 1 && p[1].value > 57 + 15))
              "
            >
              <el-tooltip
                effect="dark"
                placement="top"
                :content="
                  '2速 主' +
                    allAttrMap[`${p[1].mainAttr.type}`] +
                    ', ' +
                    (pIndex === 1
                      ? (p[1].value - 57).toFixed(2)
                      : p[1].value.toFixed(2)) +
                    '速'
                "
              >
                <div
                  class="analysis-value"
                  :class="{
                    neck:
                      (pIndex !== 1 && p[1].value > 13.5) ||
                      (pIndex === 1 && p[1].value > 57 + 13.5),
                    full:
                      (pIndex !== 1 && p[1].value > 15) ||
                      (pIndex === 1 && p[1].value > 57 + 15),
                    rare:
                      (pIndex !== 1 && p[1].value > 16.5) ||
                      (pIndex === 1 && p[1].value > 57 + 16.5),
                    extreme:
                      (pIndex !== 1 && p[1].value >= 17) ||
                      (pIndex === 1 && p[1].value >= 57 + 17),
                    european:
                      (pIndex !== 1 && p[1].value >= 17.5) ||
                      (pIndex === 1 && p[1].value >= 57 + 17.5),
                  }"
                >
                  &nbsp;&nbsp;
                </div>
              </el-tooltip>
            </template>

            <template
              v-if="
                p.length > 2 &&
                  ((pIndex !== 1 && p[2].value > 15) ||
                    (pIndex === 1 && p[2].value > 57 + 15))
              "
            >
              <el-tooltip
                effect="dark"
                placement="top"
                :content="
                  '3速 主' +
                    allAttrMap[`${p[2].mainAttr.type}`] +
                    ', ' +
                    (pIndex === 1
                      ? (p[2].value - 57).toFixed(2)
                      : p[2].value.toFixed(2)) +
                    '速'
                "
              >
                <template>
                  <div
                    class="analysis-value"
                    :class="{
                      neck:
                        (pIndex !== 1 && p[2].value > 13.5) ||
                        (pIndex === 1 && p[2].value > 57 + 13.5),
                      full:
                        (pIndex !== 1 && p[2].value > 15) ||
                        (pIndex === 1 && p[2].value > 57 + 15),
                      rare:
                        (pIndex !== 1 && p[2].value > 16.5) ||
                        (pIndex === 1 && p[2].value > 57 + 16.5),
                      extreme:
                        (pIndex !== 1 && p[2].value >= 17) ||
                        (pIndex === 1 && p[2].value >= 57 + 17),
                      european:
                        (pIndex !== 1 && p[2].value >= 17.5) ||
                        (pIndex === 1 && p[2].value >= 57 + 17.5),
                    }"
                  >
                    &nbsp;&nbsp;
                  </div>
                </template>
              </el-tooltip>
            </template>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'EquipAnalysis',
})
</script>

<script lang="ts" setup>
import { defineComponent, ref, unref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import util from '@/utils/index'
import { ElCard, ElTabs, ElTabPane, ElTag, ElTooltip } from 'element-plus'
import { IEquipCustom, SubAttr, IEquipTypePrototype } from '@/interface'

const transNumberToChinese = function (value: number) {
  return util.transNumberToChinese(value)
}

let loading = ref(false)
const changeUser = function () {
  loading.value = true
  nextTick(() => {
    initData()
  })
}

const getImageURL = function (suitCode: number) {
  return new URL(`/src/assets/suit_icon/${suitCode}.png`, import.meta.url).href
}

const $store = useStore()
const equipList = computed(() => $store.state.equipList)
const allAttrMap = computed(() => $store.getters.allAttrMap)
const userList = computed(() => $store.getters['user/list'])
// 重点套装 版本之子
const importantSuit = ref([
  300002, 300010, 300012, 300019, 300021, 300023, 300034, 300079, 300080,
])
let currentUser = ref('0')

interface suitData {
  name: string
  id: number
  position: suitPositionData[][]
  // position: [
  //   suitPositionData[],
  //   suitPositionData[],
  //   suitPositionData[],
  //   suitPositionData[],
  //   suitPositionData[],
  //   suitPositionData[],
  // ]
}
interface suitPositionData {
  name?: string
  mainAttr: {
    type: string
    value: number
  }
  value: number
}
let aData = ref<suitData[]>([])
// 散件速度计算
let scatteredSuit = ref<number[]>([])
// 16满速个数统计
let fullCount = ref(0)
let fullCount15 = ref(0)
let fullCount17 = ref(0)
let doubleSpeedPrototypeCount = ref(0)
// 速度胚子个数
let speedPrototypeCount = ref(0)
const initData = function (attrName = 'Speed') {
  fullCount.value = 0
  fullCount17.value = 0
  fullCount15.value = 0
  speedPrototypeCount.value = 0
  doubleSpeedPrototypeCount.value = 0
  loading.value = true
  // 散件
  let scatteredSuitData: suitData = {
    name: '散件',
    id: -111,
    position: [[], [], [], [], [], []],
  }
  aData.value = equipList.value.map((equip: IEquipTypePrototype) => {
    const finalEquipData: suitData = {
      ...equip,
      // 6个位置，按属性排序
      position: [[], [], [], [], [], []],
    }

    userList.value[parseInt(currentUser.value)].data.hero_equips.forEach(
      (item: IEquipCustom & SubAttr) => {
        if (item.suit_id === equip.id) {
          let sum = util.getAttrSum(unref(item), attrName)

          if ((sum > 15 && item.pos !== 1) || (sum > 57 + 15 && item.pos === 1))
            fullCount15.value = fullCount15.value + 1
          if ((sum > 16 && item.pos !== 1) || (sum > 57 + 16 && item.pos === 1))
            fullCount.value = fullCount.value + 1
          if ((sum > 17 && item.pos !== 1) || (sum > 57 + 17 && item.pos === 1))
            fullCount17.value = fullCount17.value + 1

          if (
            item.level === 0 &&
            item['Speed'] &&
            item.randomAttrsLength === 4
          ) {
            if (item.pos !== 1) {
              speedPrototypeCount.value += 1
            }
            if (item.mainAttr.type === 'Speed') {
              doubleSpeedPrototypeCount.value += 1
            }
          }

          const tempMainAttr = JSON.parse(JSON.stringify(item.mainAttr))
          finalEquipData.position[item.pos].push({
            mainAttr: tempMainAttr,
            value: sum,
          })
          scatteredSuitData.position[item.pos].push({
            name: equip.name,
            mainAttr: tempMainAttr,
            value: sum,
          })
        }
      },
    )

    for (let item of finalEquipData.position) {
      item.sort((a, b) => b.value - a.value)
    }

    for (let item of scatteredSuitData.position) {
      item.sort((a, b) => b.value - a.value)
    }
    return finalEquipData
  })

  scatteredSuitData.position = scatteredSuitData.position.map((p) => {
    return p.length > 4 ? p.slice(0, 4) : p
  })
  aData.value.unshift(scatteredSuitData)
  // 散件总速度计算
  scatteredSuit.value = scatteredSuitData.position.reduce((total: number[], current) => {
    total[0] = (current[0].value || 0) + (total[0] || 0)
    total[1] = (current[1].value || 0) + (total[1] || 0)
    total[2] = (current[2].value || 0) + (total[2] || 0)

    return total
  }, [])
  setTimeout(function () {
    loading.value = false
  }, 500)
}

initData()
</script>

<style lang="scss">
.page-equip-analysis {
  .el-card__header {
    padding: 0;
  }

  .el-card__body {
    padding: 20px 0 10px 7px;
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/css/flex-custom.scss';
@import '@/assets/css/border-box.scss';
.page-equip-analysis {
  padding: 0 0 20px 16px;
  height: 100%;
  width: 1600px;
  margin: 0 auto;
}

.content-top {
  margin: 0 auto;
  width: 1600px;
}

.margin-of-speed-tag-tooltip {
  // element-plus 升级到 1.30 beta5后 el-tooltip组件内联样式及附加的class均失效, 布局样式调整写到其子元素上.
  margin-left: 10px;
}

.equip-item {
  width: 149px;
  min-height: 140px;
  margin-right: 9px;
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
  background-color: #e1ffff;
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
  background-color: #9400d3;
  color: #fff;
  font-weight: 500;
}

.important {
  border-color: #bbb;
  background-color: #f6f6f6;
}

.background {
  width: 30px;
  height: 30px;
  margin-right: 6px;
  border: 1px solid #eee;
  border-radius: 50%;
}

.suit-name-wrap {
  height: 38px;
  padding: 0 6px;
}

.extendCountArea {
  & > div {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 4px;
    margin-right: 8px;
    margin-bottom: 4px;
  }
}
</style>
