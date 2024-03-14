export type User = {
  id: number;
  name: string;
  image: string;
  birthday: Date;
  score: number;
  used: number;
  createdAt: Date;
}
export type Reward = {
  id: number;
  user_id: number;
  score: number;
  reason: string;
  date: Date;
  createdAt: Date;
}