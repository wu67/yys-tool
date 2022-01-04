import Dexie from 'dexie'
import $db from './db'
import { useStore } from 'vuex'
import {
  reactive
} from 'vue'
import $dayjs from 'dayjs'

export default function useCommon() {
  let db = reactive({})
  db = $db

  const $store = useStore()

  const commonNotIncluded = reactive([360, 359, 337, 336, 319, 313, 314, 310, 309, 308, 305, 294, 373])
  const formatTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    let str = ''
    if (date) {
      str = $dayjs(date).format(format)
    }
    return str
  }
  const updateUserData = (index = -1, value) => {
    if (index === -1) {
      db.user.add({
        user_id: value.data.player.id,
        content: value
      })
    } else {
      db.user.update(value.data.player.id, {
        user_id: value.data.player.id,
        content: value
      })
    }
  }
  const getUserData = () => {
    let result = []
    return db.user.each(user => {
      result.push(user.content)
    }).then(() => {
      $store.commit('user/updateUserDataByIndex', {
        index: -2,
        value: result
      })
      return result
    }).catch(() => {
      console.log('getUserData error')
    })
  }
  const deleteUserData = (id) => {
    if (id === 'all') {
      const pArray = [
        db.user.clear(),
        db.not_included.clear()
      ]
      return Promise.all(pArray)
    } else {
      const pArray = [
        db.user.where({ user_id: id }).delete(),
        db.not_included.where({ user_id: id }).delete()
      ]
      return Promise.all(pArray)
    }
  }
  const updateUserNotIncluded = (index = -1, data) => {
    if (index === -1) {
      return db.not_included.add({
        user_id: data.id,
        content: Dexie.deepClone(data.value)
      })
    } else {
      return db.not_included.update(data.id, {
        user_id: data.id,
        content: Dexie.deepClone(data.value)
      })
    }
  }
  const getNotIncluded = () => {
    let result = []
    return db.not_included.each(record => {
      result.push(record.content)
    }).then(() => {
      $store.commit('updateNotIncluded', {
        index: -2,
        value: result
      })
      return result
    })
  }
  return {
    db,
    commonNotIncluded,
    formatTime,
    updateUserData,
    getUserData,
    deleteUserData,
    updateUserNotIncluded,
    getNotIncluded,
  }
}
