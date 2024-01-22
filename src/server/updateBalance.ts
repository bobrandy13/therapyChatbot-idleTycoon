"use server";
import { db } from "./db";

export default async function updateBalance(
  amount_to_add: number,
  user_id: string,
) {
  const findBalance = await db.user.findUnique({
    where: {
      id: user_id,
    },
  });

  return findBalance;
}
