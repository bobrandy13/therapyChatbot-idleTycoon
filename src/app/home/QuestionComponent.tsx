"use client";
import React, { useRef, useState } from "react";
import type SessionType from "~/server/tyoes/SessionType";
import { motion } from "framer-motion";
import getMachineReponse from "~/server/MachineReponse";
import { billUser } from "~/server/fetchBalance";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import saveMessage from "~/server/saveMessageToDb";
import Modal_component from "../components/Modal";
import { type Session } from "next-auth";
import messages from "~/server/getMessages";

const variants = {
  open: { width: "60%", height: "100px", y: 200 },
  close: { width: "40%", y: 0 },
};

const messagesLoop = async () => {
  const { prefix, content, author } = await getMachineReponse();
  return { prefix, content, author };
};

const deductFromTotal = (User: Session, amount: number): boolean => {
  if (!User.user) {
    return false;
  }
  if (!User.user.id) return false;
  void billUser(User.user.id, amount);
  return true;
};

function TherapyBot() {
  const [counter, setCounter] = useState(0);
  const { data: session } = useSession();
  const [submitHidden, setHidden] = useState("block");
  const [machineMessage, setMessage] = useState("Machine is thinking");
  const [showAfteRSubmit, setShow] = useState("hidden");
  // const [deepQuote, setQuote] = useState("hidden");
  const [isAnimated, setAnimateState] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!messages) return <div>Please refresh the page</div>

  if (!session) return <div>No account please login</div>;

  const callback = async () => {
    console.log("timer finished");
    const { prefix, content, author } = await messagesLoop();
    let message = "";

    if (session.user.id === "65ab4ef391cd122b7067805b" || session.user.id === "65ab41a116affc2896cc7a4b") {
      // set custom message;
      message = "Hi! Dont be sad. This therapy chatbot is always here for you, and you'll never run out of money";
      if (messages[counter]) message = messages[counter] ?? "Don't be sad 😄";
    } else {
      message = `${prefix}. But "` + content + `" said ` + author;
    }

    if (textAreaRef.current) {
      saveMessage(session, textAreaRef.current?.value, message).catch((e) =>
        console.log("there has ben an error", e),
      );
    }

    setCounter(counter => counter + 1);
    setCounter(counter => counter % messages.length)

    setMessage(message);
  };
  const handleSubmit = async () => {
    if (textAreaRef.current?.value) {
      // TODO: save textarea Value to DB

      setHidden("hidden");
      setShow("inline");
      setAnimateState(true);

      if (!session) {
        return <div>There is no user account</div>;
      }

      // TODO: deduct money from the system.
      deductFromTotal(session, 50);
      let counter = 0;

      const dotdotdot = setInterval(() => {
        counter++;
        setMessage("Machien is thinking");
        setMessage((message) => (message += ".".repeat(counter % 4)));
        if (counter > 5) {
          clearInterval(dotdotdot);
          void callback();
        }
      }, 1000);
    }
  };

  return (
    <div>
      <Modal_component />
      <Navbar />
      <div className="min-w-screen flex min-h-screen items-center justify-center text-3xl">
        <>
          <h1
            className={` absolute top-24 ${showAfteRSubmit} p-10 text-center`}
          >
            {machineMessage}
          </h1>
          <div className="flex w-full items-center justify-center">
            <motion.div
              animate={isAnimated ? "open" : "close"}
              variants={variants}
              className=""
            >
              <label className="form-control w-full">
                <div className={`label ${submitHidden}`}>
                  <span className="label-text">
                    What brings you here today???
                  </span>
                </div>
                <textarea
                  placeholder="Type here"
                  className="textarea textarea-bordered h-32 w-full"
                  ref={textAreaRef}
                />
                <button
                  className={`btn btn-primary ${showAfteRSubmit}`}
                  onClick={() => handleSubmit()}
                >
                  Submit again
                </button>
                <button
                  onClick={() => handleSubmit()}
                  className={`btn btn-secondary h-12 ${submitHidden}`}
                >
                  Submit
                </button>
              </label>
            </motion.div>
          </div>
        </>
      </div>
    </div>
  );
}

export default TherapyBot;
