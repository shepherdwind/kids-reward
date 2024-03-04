import { db } from "../database"

export async function load() {
  const startTime = Date.now()
  const [{ rows: users }, {rows: rewards }] = await Promise.all([
    db.query('SELECT * FROM users'),
    db.query('SELECT * FROM reward'),
  ]);
  const duration = Date.now() - startTime
  return {
    users: users,
    rewards: rewards,
    duration: duration,
  }
}
