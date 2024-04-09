import { db } from "../database"
import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
  const queryDate = event.url.searchParams.get('date');
  const startTime = Date.now()
  const date = new Date(queryDate || Date.now());
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
