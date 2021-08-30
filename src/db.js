import Dexie from 'dexie'

function createDB () {
  let db = new Dexie('yyx-tool')

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
