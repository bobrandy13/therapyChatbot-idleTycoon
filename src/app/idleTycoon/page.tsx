"use client";
import { useEffect, useState } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import MoneyIcon from "./Svg";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import updateBalance from "~/server/updateBalance";

function Modal() {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">
            {
              "Welcome to Kevin's idle tycoon so you can grind back your money to afford therapy!"
            }
          </h3>
          <p className="py-4">
            Your income will continue to build as you play the game.
            <br />
            Press esc or close to close this window.
          </p>
        </div>
      </dialog>
    </div>
  );
}

const MAX_MONEY_CLIKED = 20;

function Tycoon() {
  useEffect(() => {
    (document.getElementById("my_modal_3") as HTMLDialogElement).showModal();
  }, []);

  const [numMoneyClicked, setMoneyClicked] = useState<number>(0);

  const { data: session } = useSession();

  if (!session) return <div>Please login</div>;

  const handleClick = () => {
    console.log("button has been clicked, add $10 to the total balance");
    setMoneyClicked((value) => (value < MAX_MONEY_CLIKED ? value + 1 : value));
  };

  return (
    <>
      <Navbar />
      <Modal />

      {/* main content starts here */}
      <div className="h-screen w-screen">
        <div className="flex h-screen w-screen items-center justify-center">
          <button className="btn btn-primary h-24 w-52" onClick={handleClick}>
            Click here!
          </button>
        </div>
        <div
          className=""
          style={{
            position: "absolute",
            top: 150,
            left: 120,
          }}
        >
          {Array.from(Array(numMoneyClicked).keys()).map((_, i) => {
            return <MoneyIcon key={i} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Tycoon;
