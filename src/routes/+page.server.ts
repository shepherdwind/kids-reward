import { db } from "../database"

export async function load() {
  const startTime = Date.now()
  const date = new Date();
  const startMonth = `${date.getFullYear()}-${date.getMonth() + 1}-01`;
  const endMonth = `${date.getFullYear()}-${date.getMonth() + 2}-01`;
  const [{ rows: users }, {rows: rewards }] = await Promise.all([
    db.query('SELECT * FROM users'),
    db.query(`SELECT * FROM reward where date >= '${startMonth}' and date < '${endMonth}' ORDER BY date DESC`),
  ]);

  const duration = Date.now() - startTime
  return {
    users: users.sort((a, b) => a.id - b.id),
    rewards: rewards,
    duration: duration,
  }
}
