import Dexie from 'dexie'

interface ITableNotIncluded {
  user_id: number,
  content: number[]
}
class YYSDexie extends Dexie {
  not_included!: Dexie.Table<ITableNotIncluded>
  user!: Dexie.Table<any>

  constructor() {
    super('yyx-tool')
    if (this.user && this.not_included) {
      return this
    }
    this.version(1).stores({
      user: `user_id,content`,
      not_included: `user_id,content`,
    })
  }
}

const db = new YYSDexie()

export default db
