import { db } from "../database"

export async function load() {
  const startTime = Date.now()
  const { rows: users } = await db.query('SELECT * FROM users')
  const duration = Date.now() - startTime
  return {
    users: users,
    duration: duration,
  }
}
