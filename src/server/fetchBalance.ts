import { db } from "./db";

export default async function getBalance(userId: string) {
  const balance = await db.user.findUnique({ where: { id: userId } });

  return balance;
}
