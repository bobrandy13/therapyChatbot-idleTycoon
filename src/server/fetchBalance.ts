"use server";
import { db } from "./db";

export default async function getBalance(userId: string) {
  const balance = await db.user.findUnique({ where: { id: userId } });

  return balance;
}

export async function billUser(userId: string, deduct_amount: number) {
  // fetch the current balanace;
  const balance = await getBalance(userId);
  if (balance) {
    const updateBalance = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: balance.balance - deduct_amount,
      },
    });
    return updateBalance;
  }
}
