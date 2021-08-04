import Vue from 'vue'
import util from '@/utils/index'

export default {
  namespaced: true,
  state: {
    userList: [],
  },
  getters: {
    // 经过处理的用户数据列表
    // eslint-disable-next-line
    userList (state, getters, rootState) {
      return state.userList.map(user => {
        let newUser = JSON.parse(JSON.stringify(user))
        newUser.data.hero_equips = user.data.hero_equips.map(item => {

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
            if (rootState.notPercentAttr.indexOf(rAttr.type) === -1) {
              result[`${rAttr.type}`] = util.multiply(rAttr.value)
            } else {
              result[`${rAttr.type}`] = rAttr.value
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
              value: util.multiply(item.single_attrs[0].value)
            })
          }

          return result
        })

        return newUser
      })
    }
  },
  actions: {},
  mutations: {
    // payload { index: num, value }. index: -1新增， -2整组替换，>-1目标值替换
    updateUserDataByIndex (state, payload) {
      if (payload.index === -1) {
        state.userList.push(payload.value)
      } else if (payload.index === -2) {
        Vue.set(state, 'userList', payload.value)
      } else {
        Vue.set(state.userList, payload.index, payload.value)
      }
    }
  }
}
