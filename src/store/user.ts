import util from '@/utils/index'
import { toRaw } from 'vue'

import { IEquip, SubAttr, IEquipCustom } from '@/interface'

export default {
  namespaced: true,
  state() {
    return {
      list: [],
    }
  },
  getters: {
    // 经过处理的用户数据列表
    // eslint-disable-next-line
    list(state: any, getters: any, rootState: any) {
      return state.list.map((user: any) => {
        let newUser = JSON.parse(JSON.stringify(toRaw(user)))

        newUser.data.hero_equips = user.data.hero_equips.map(
          (item: IEquip) => {
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
            const effectiveAttr = rootState.equipList.filter(
              (suit: any) => suit.id === item.suit_id,
            )[0].effectiveAttr
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

                result.effectAttrCount =
                  result.effectAttrCount +
                  Math.round((result[`${rAttr.type}`] || 0) / attr.avgStep)
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
          },
        )

        return newUser
      })
    },
  },
  actions: {},
  mutations: {
    // payload { index: num, value }. index: -1新增， -2整组替换，>-1目标值替换
    updateUserDataByIndex(state: any, payload: any) {
      if (payload.index === -1) {
        state.list.push(payload.value)
      } else if (payload.index === -2) {
        state.list = payload.value
      } else {
        state.list[payload.index] = payload.value
      }
    },
  },
}
