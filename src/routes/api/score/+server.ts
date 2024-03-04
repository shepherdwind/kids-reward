import { json } from "@sveltejs/kit";
import crypto from "crypto";
import { COMMIT_SCORE_HASH  } from "$env/static/private";
import { db } from "$database";

interface AddScoreRequest {
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
export const POST = async ({ request }) => {
  const data: AddScoreRequest = await request.json();
  console.log(COMMIT_SCORE_HASH, createHash(data.password));
  if (createHash(data.password) !== COMMIT_SCORE_HASH) {
    return json({ success: false, error: "Invalid password" });
  }
  const ret = await db.query(
    "INSERT INTO reward (reason, score, date, user_id) VALUES ($1, $2, $3, $4)",
    [data.reason, data.score, data.date, data.userId]
  );
  return json({ success: true, data: ret });
};
