"use client";
import React, { type KeyboardEvent, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import getMachineReponse from "~/server/MachineReponse";

const variants = {
  open: { width: "60%", height: "100px", y: 200 },
  close: { width: "40%", y: 0 },
};

const messagesLoop = async () => {
  const { prefix, content, author } = await getMachineReponse();
  return { prefix, content, author };
};

function TherapyBot() {
  const [submitHidden, setHidden] = useState("block");
  const [machineMessage, setMessage] = useState("Machine is thinking");
  const [showAfteRSubmit, setShow] = useState("hidden");
  const [deepQuote, setQuote] = useState("hidden");
  const [isAnimated, setAnimateState] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const callback = async () => {
    console.log("timer finished");
    const { prefix, content, author } = await messagesLoop();

    const message =
      `${prefix}. Cant help you there. But "` + content + `" said ` + author;

    setMessage(message);
  };
  const handleSubmit = async () => {
    if (textAreaRef.current?.value) {
      console.log(textAreaRef.current.value);
      setHidden("hidden");
      setShow("inline");
      setAnimateState(true);

      // TODO: deduct money from the system.
    }
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
  };

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center text-3xl">
      <>
        <h1 className={` absolute top-24 ${showAfteRSubmit} p-10 text-center`}>
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
  );
}

export default TherapyBot;
