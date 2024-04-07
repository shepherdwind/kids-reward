import { json } from "@sveltejs/kit";
import crypto from "crypto";
import { COMMIT_SCORE_HASH } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";
import { db } from "$database";
import type { Reward } from "$database/type.js";

interface ScoreRequest {
  mode: 'add' | 'delete';
  id?: number;
  reason: string;
  score: number;
  date: string;
  password: string;
  userId: number;
}

const createHash = (data: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(data || '');
  return hash.digest("hex");
}

export async function POST({ request }: RequestEvent) {
  const data: ScoreRequest = await request.json();
  if (createHash(data.password) !== COMMIT_SCORE_HASH) {
    return json({ success: false, error: "Invalid password" });
  }

  try {
    await db.query("BEGIN");
    if (data.mode === 'delete') {
      const ret = await removeScore(data);
      await db.query("COMMIT");
      return ret;
    }

    const ret = await addScore(data);
    await db.query("COMMIT");
    return ret;
  } catch (e) {
    await db.query("ROLLBACK");
    return json({ success: false, error: (e as Error).message });
  }
}

const removeScore = async (data: ScoreRequest) => {
  const rewards = await db.query<Reward>("SELECT * FROM reward WHERE id = $1", [data.id]);
  const score = rewards.rows?.[0]?.score;
  if (!score) {
    return json({ success: false, error: "Invalid reward id" });
  }

  if (score > 0) {
    // delete from score
    await db.query("UPDATE users SET score = score + $1 WHERE id = $2", [-score, data.userId]);
  } else {
    // delete from used
    await db.query("UPDATE users SET used = used + $1 WHERE id = $2", [score, data.userId]);
  }
  const ret = await db.query("DELETE FROM reward WHERE id = $1", [data.id]);
  return json({ success: true, data: ret });
}

const addScore = async (data: ScoreRequest) => {
  if (data.score > 0) {
    await db.query("UPDATE users SET score = score + $1 WHERE id = $2", [data.score, data.userId]);
  } else {
    await db.query("UPDATE users SET used = used + $1 WHERE id = $2", [-data.score, data.userId]);
  }


  const ret = await db.query(
    "INSERT INTO reward (reason, score, date, user_id) VALUES ($1, $2, $3, $4)",
    [data.reason, data.score, data.date, data.userId]
  );
  return json({ success: true, data: ret });
};
