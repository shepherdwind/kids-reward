import { createPool } from '@vercel/postgres'
import { REWARD_URL } from '$env/static/private'
export const db = createPool({ connectionString: REWARD_URL })