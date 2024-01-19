"use client";
import React, { type KeyboardEvent, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const variants = {
  open: { width: "60%", height: "100px", y: 300 },
  close: { width: "40%", y: 0 },
};
function TherapyBot() {
  const [submitHidden, setHidden] = useState("block");
  const [machineMessage, setMessage] = useState("Machine is thinking");
  const [showAfteRSubmit, setShow] = useState("hidden");
  const [isAnimated, setAnimateState] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = () => {
    if (textAreaRef.current?.value) {
      console.log(textAreaRef.current.value);
      setHidden("hidden");
      setShow("inline");
      setAnimateState(true);
    }
    let counter = 0;

    setInterval(() => {
      counter++;
      setMessage("Machien is thinking");
      setMessage((message) => (message += ".".repeat(counter % 4)));
    }, 1000);
  };

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center text-3xl">
      <>
        <h1 className={`absolute ${showAfteRSubmit}`}>{machineMessage}</h1>
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
