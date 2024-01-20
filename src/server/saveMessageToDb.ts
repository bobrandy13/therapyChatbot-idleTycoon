"use server";
import { db } from "./db";
import { Session } from "next-auth";

export default async function saveMessage(
  session: Session,
  message_contents: string,
  response: string,
) {
  console.log(session, message_contents);
  console.log("this functoin ran");

  const create_message = await db.messages.create({
    data: {
      messageContents: message_contents,
      userID: session.user.id,
      response: response,
    },
  });

  console.log(create_message);
  return create_message;
}
