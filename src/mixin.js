import Dexie from 'dexie'

export default {
  filters: {
    formatTime (date, format = 'yyyy-MM-dd hh:mm:ss') {
      if (date instanceof Date) {
        const syntax = {
          '(y+)': date.getFullYear(),
          '(M+)': date.getMonth() + 1,
          '(d+)': date.getDate(),
          '(h+)': date.getHours(),
          '(m+)': date.getMinutes(),
          '(s+)': date.getSeconds(),
        }
        for (const factor in syntax) {
          const result = format.match(factor)
          if (result !== null) {
            format = format.replace(result[0], `000${syntax[factor]}`.substr(-(result[0].length)))
          }
        }
        return format
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      db: null,
      // 默认设置联动卡为未收录
      commonNotIncluded: [360, 359, 337, 336, 319, 313, 314, 310, 309, 308, 305, 294]
    }
  },
  created () {
    this.connectDB()
  },
  methods: {
    connectDB () {
      // todo db面向对象重构。目前会重复创建连接，完全面条式的面向过程代码
      this.db = new Dexie('yyx-tool')

      if (this.db.user && this.db.not_included) {
        return
      }
      this.db.version(1).stores({
        user: `user_id,content`,
        not_included: `user_id,content`
      })
    },
    updateUserData (index = -1, value) {
      if (index === -1) {
        this.db.user.add({
          user_id: value.data.player.id,
          content: value
        })
      } else {
        this.db.user.update(value.data.player.id, {
          user_id: value.data.player.id,
          content: value
        })
      }
    },
    getUserData () {
      let result = []
      return this.db.user.each(user => {
        result.push(user.content)
      }).then(() => {
        this.$store.commit('user/updateUserDataByIndex', {
          index: -2,
          value: result
        })
        return result
      })
    },
    deleteUserData (id) {
      if (id === 'all') {
        const pArray = [
          this.db.user.clear(),
          this.db.not_included.clear()
        ]
        return Promise.all(pArray)
      } else {
        const pArray = [
          this.db.user.where({ user_id: id }).delete(),
          this.db.not_included.where({ user_id: id }).delete()
        ]
        return Promise.all(pArray)
      }
    },
    updateUserNotIncluded (index = -1, data) {
      if (index === -1) {
        return this.db.not_included.add({
          user_id: data.id,
          content: data.value
        })
      } else {
        return this.db.not_included.update(data.id, {
          user_id: data.id,
          content: data.value
        })
      }
    },
    getNotIncluded () {
      let result = []
      return this.db.not_included.each(record => {
        result.push(record.content)
      }).then(() => {
        this.$store.commit('updateNotIncluded', {
          index: -2,
          value: result
        })
        return result
      })
    }
  }
}
