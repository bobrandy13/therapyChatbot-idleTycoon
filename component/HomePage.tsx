"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import TherapyBot from "./TherapyChatBot";

export default function HomePage() {
  const [isVisible, setVisible] = useState(true);
  return (
    <div className="min-w-screen text-bold bg-base-100 flex min-h-screen items-center justify-center text-2xl text-white ">
      {isVisible && (
        <AnimatePresence mode="wait">
          <motion.div
            key="opening-text"
            className="flex flex-col flex-wrap items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {
              "Welcome to Kevin's therapy chatbot/idle tycoon (so you can afford the therapist)"
            }
            <button
              key={"button"}
              className="btn btn-active btn-primary m-4 mt-4 w-1/2 p-2 text-white"
              onClick={() => setVisible(false)}
            >
              Click here to start
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      {!isVisible && <TherapyBot />}
    </div>
  );
}
