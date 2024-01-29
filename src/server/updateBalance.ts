"use server";
import { db } from "./db";

export default async function updateBalance(
  user_id: string,
  amount_to_add: number,
) {
  const findBalance = await db.user.findUnique({
    where: {
      id: user_id,
    },
  });

  return findBalance;
}
