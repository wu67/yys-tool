import Dexie from 'dexie'

// interface tableUser {
//   user_id: number,
//   content: any
// }
// interface tableNotIncluded {
//   user_id: number,
//   content: any
// }
// interface dexieDB {
//   user?: tableUser,
//   not_included?: tableNotIncluded,
//   version: Function,
// }

function createDB() {
  const db = new Dexie('yyx-tool')

  if (db.user && db.not_included) {
    return db
  }
  db.version(1).stores({
    user: `user_id,content`,
    not_included: `user_id,content`
  })

  return db
}

const db = createDB()

export default db
