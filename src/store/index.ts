import { createStore } from 'vuex'
import user from './user'

import allHeroJSON from '@/assets/all_hero.json'
import damoJSON from '@/assets/damo.json'
import equipJSON from '@/assets/equip.json'
import {
  IBaseHero,
  IEquipTypePrototype,
  IEquipAttrPrototype,
} from '@/interface'

export default createStore({
  state() {
    return {
      equipList: [],
      allHeroList: [],
      attrList: [
        {
          key: 'Speed',
          name: '速度',
          nick: '速',
          minStep: 2.4,
          avgStep: 2.7,
          maxStep: 3,
        },
        {
          key: 'CritRate',
          name: '暴击',
          nick: '暴',
          minStep: 2.4,
          avgStep: 2.7,
          maxStep: 3,
        },
        {
          key: 'AttackRate',
          name: '攻击加成',
          nick: '攻',
          minStep: 2.4,
          avgStep: 2.7,
          maxStep: 3,
        },
        {
          key: 'CritPower',
          name: '暴击伤害',
          nick: '爆',
          minStep: 3.2,
          avgStep: 3.6,
          maxStep: 4,
        },
        {
          key: 'EffectHitRate',
          name: '效果命中',
          nick: '命',
          minStep: 3.2,
          avgStep: 3.6,
          maxStep: 4,
        },
        {
          key: 'EffectResistRate',
          name: '效果抵抗',
          nick: '抗',
          minStep: 3.2,
          avgStep: 3.6,
          maxStep: 4,
        },
        {
          key: 'HpRate',
          name: '生命加成',
          nick: '生',
          minStep: 2.4,
          avgStep: 2.7,
          maxStep: 3,
        },
        {
          key: 'DefenseRate',
          name: '防御加成',
          nick: '防',
          minStep: 2.4,
          avgStep: 2.7,
          maxStep: 3,
        },
        {
          key: 'Attack',
          name: '攻击',
          nick: '',
        },
        {
          key: 'Defense',
          name: '防御',
          nick: '',
        },
        {
          key: 'Hp',
          name: '生命',
          nick: '',
        },
      ],
      notPercentAttr: ['Speed', 'Attack', 'Defense', 'Hp'],
      notIncludedList: [],
    }
  },
  getters: {
    allAttrList(state) {
      return state.attrList
    },
    allAttrMap(state) {
      return state.attrList.reduce(
        (result: { [x: string]: string }, current: IEquipAttrPrototype) => {
          result[`${current.key}`] = current.name
          return result
        },
        {},
      )
    },
    allAttrNickMap(state) {
      return state.attrList.reduce(
        (result: { [x: string]: string }, current: IEquipAttrPrototype) => {
          result[`${current.key}`] = current.nick
          return result
        },
        {},
      )
    },
    effectiveAttrList(state) {
      return state.attrList.slice(0, 8)
    },
    equipMap(state) {
      let result: { [x: string]: string } = {}
      state.equipList.forEach((item: IEquipTypePrototype) => {
        result[`${item.id}`] = item.name
      })
      return result
    },
  },
  actions: {
    getAllHeroData({ commit }) {
      if (allHeroJSON) {
        const list = allHeroJSON.map((item) => {
          const result: IBaseHero = {
            name: item.name,
            rarity: item.level,
            id: item.id,
          }

          if (item.interactive) {
            result.interactive = true
          }
          return result
        })

        commit('updateAllHeroName', list.concat(damoJSON))
      }
    },
    getEquipData({ commit }) {
      let equipList: IEquipTypePrototype[] = []
      if (equipJSON) {
        equipList = equipJSON.map((item) => {
          return {
            id: item.id,
            // 个人理解的有效属性. 暂定为固定的几个属性.
            effectiveAttr: item.effectiveAttr,
            name: item.name,
          }
        })
      }
      commit('updateEquipData', equipList)
    },
  },
  mutations: {
    updateEquipData(state, data) {
      state.equipList = data
    },
    updateAllHeroName(state, data) {
      state.allHeroList = data
    },
    // payload { index: num, value }. index: -1新增， -2整组替换，>-1目标值替换
    updateNotIncluded(state, payload) {
      if (payload.index === -1) {
        state.notIncludedList.push(payload.value)
      } else if (payload.index === -2) {
        state.notIncludedList = payload.value
      } else {
        state.notIncludedList[payload.index] = payload.value
      }
    },
  },
  modules: {
    user: user,
  },
})
