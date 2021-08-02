import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    userList: [],
  },
  getters: {},
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
