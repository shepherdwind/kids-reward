import { createPool, sql } from '@vercel/postgres'
import { POSTGRES_URL } from '$env/static/private'

export async function load() {
  const db = createPool({ connectionString: POSTGRES_URL })
  const startTime = Date.now()
  const { rows: users } = await db.query('SELECT * FROM users')
  const duration = Date.now() - startTime
  return {
    users: users,
    duration: duration,
  }
}
