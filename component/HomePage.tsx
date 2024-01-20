"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }
  const [isVisible, setVisible] = useState(true);
  return (
    <div className="min-w-screen text-bold flex min-h-screen items-center justify-center bg-base-100 text-2xl text-white ">
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
              className="btn btn-primary btn-active m-4 mt-4 w-1/2 p-2 text-white"
              onClick={() => {
                void signIn("github", {
                  callbackUrl: "/home",
                });
                setVisible(false);
              }}
            >
              Sign in to get started.
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      {/* {!isVisible && <TherapyBot />} */}
    </div>
  );
}
