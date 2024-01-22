"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import getMachineReponse from "~/server/MachineReponse";
import { billUser } from "~/server/fetchBalance";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import saveMessage from "~/server/saveMessageToDb";
import Modal_component from "../components/Modal";
import { type Session } from "next-auth";
import { AnimatedText } from "../components/AnimatedText";
import type memeType from "~/server/tyoes/memeType";
import renderMeme from "~/server/renderMeme";
import Image from "next/image";

const WAITING_TIME = 3;

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
  const { data: session } = useSession();
  const [submitHidden, setHidden] = useState("block");
  const [meme, setMeme] = useState<memeType>({});
  const [machineMessage, setMessage] = useState("Machine is thinking");
  const [showAfteRSubmit, setShow] = useState("hidden");
  // const [deepQuote, setQuote] = useState("hidden");
  const [isAnimated, setAnimateState] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!session) return <div>No account please login</div>;

  const callback = async () => {
    console.log("timer finished");
    const { prefix, content, author } = await messagesLoop();

    const message = `${prefix} I get that your sad. But to get by, I really like this quote by ${author}. "${content}" Isn't that quite elegant? `;
    if (textAreaRef.current) {
      saveMessage(session, textAreaRef.current?.value, message).catch((e) =>
        console.log("there has ben an error", e),
      );
    }

    const meme: memeType = await renderMeme();
    setMeme(meme);
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

      setMeme({});

      const dotdotdot = setInterval(() => {
        counter++;
        setMessage("Machien is thinking");
        setMessage((message) => (message += ".".repeat(counter % 4)));
        if (counter > WAITING_TIME) {
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
            <AnimatedText text={machineMessage} />
            {meme?.url && meme.url !== undefined && <>
              {/* render the meme  if the meme exists*/}
              <div className="flex items-center justify-center w-full m-4">
                <Image src={meme.url} alt="meme image" height={400} width={400} />
              </div>
            </>
            }
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
    </div >
  );
}

export default TherapyBot;
