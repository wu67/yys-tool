import { toRaw } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { IEquip, SubAttr, IEquipCustom } from '@/interface'
import util from '@/utils/index'
import { useIndexStore } from '@/stores/index'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    list: [],
  }),

  getters: {
    // 经过处理的用户数据列表
    computedList(state: any) {
      const rootState = useIndexStore()

      return state.list.map((user: any) => {
        let newUser = JSON.parse(JSON.stringify(toRaw(user)))

        newUser.data.hero_equips = user.data.hero_equips.map((item: IEquip) => {
          const result: IEquipCustom & SubAttr = {
            ...item,
            id: item.id,
            single_attrs: [],
            born: item.born,
            level: item.level,
            pos: item.pos,
            quality: item.quality,
            suit_id: item.suit_id,
            // 副属性条数，俗称 腿
            randomAttrsLength: item.random_attrs.length || 0,
            mainAttr: {
              type: item.base_attr.type,
              value: 0,
            },
            effectAttrCount: 0,
          }
          const temp = rootState.equipList.filter(
            (suit: any) => suit.id === item.suit_id,
          )
          const effectiveAttr =
            temp.length && temp[0].effectiveAttr ? temp[0].effectiveAttr : []
          // 处理副属性
          for (const rAttr of item.random_attrs) {
            if (rootState.notPercentAttr.indexOf(rAttr.type) === -1) {
              result[`${rAttr.type}`] = util.multiply(rAttr.value)
            } else {
              result[`${rAttr.type}`] = rAttr.value
            }
            // 计算副属性的有效属性评分. 强化到几次就是几分. 直接用中位数摆烂了.
            if (effectiveAttr.indexOf(rAttr.type) !== -1) {
              const attr = rootState.attrList.filter(
                (a: any) => a.key === rAttr.type,
              )[0]

              // 理论上就是avgStep, 有效属性必定义了平均值,
              // ‘或运算’ 只在代码层面理论上有可能走到第二步, 实际数据绝不会出现这个, 这个赋值或运算是为了解决ts报错.
              const avg = attr.avgStep || 1

              result.effectAttrCount =
                result.effectAttrCount +
                Math.round((result[`${rAttr.type}`] || 0) / avg)
            }
          }

          // 处理主属性
          if (rootState.notPercentAttr.indexOf(item.base_attr.type) === -1) {
            result.mainAttr.value = util.multiply(item.base_attr.value)
          } else {
            result.mainAttr.value = item.base_attr.value
          }

          // 处理首领魂的固定属性 全是加成百分比属性. 当前版本最多只会有1条固定属性
          if (item.single_attrs.length > 0) {
            result.single_attrs.push({
              type: item.single_attrs[0].type,
              value: util.multiply(item.single_attrs[0].value),
            })
            // 御魂评分. 固定属性如果是有效属性, 算3分
            if (effectiveAttr.indexOf(item.single_attrs[0].type) !== -1) {
              result.effectAttrCount = result.effectAttrCount + 3
            }
          }

          return result
        })

        return newUser
      })
    },
  },

  actions: {
    // payload { index: num, value }. index: -1新增， -2整组替换，>-1目标值替换
    updateUserDataByIndex(payload: any) {
      if (payload.index === -1) {
        this.list.push(payload.value)
      } else if (payload.index === -2) {
        this.list = payload.value
      } else {
        this.list[payload.index] = payload.value
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
}
