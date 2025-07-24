import { openDB } from 'idb'

const DB_NAME = 'rumlevo-db'
const DB_VERSION = 1

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('geo')) db.createObjectStore('geo')
      if (!db.objectStoreNames.contains('birds')) db.createObjectStore('birds')
    }
  })
}

export const saveToStore = async (storeName, key, value) => {
  const db = await initDB()
  await db.put(storeName, value, key)
}

export const loadFromStore = async (storeName, key) => {
  const db = await initDB()
  return db.get(storeName, key)
}