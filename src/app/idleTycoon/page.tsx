"use client";
import { useEffect, useState } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import MoneyIcon from "./Svg";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import updateBalance from "~/server/updateBalance";
import {User_makes_money} from "~/server/fetchBalance";
import getWindowDimensions from "~/server/getDmensions";
import Confetti from "react-confetti"

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

function Money_override_Modal() {
  return (
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="money_money" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">
              {
                "Actually chill out your making too much money"
              }
            </h3>
            <p className="py-4">
              {"I don't like you making that much money"}
            </p>
          </div>
        </dialog>
      </div>
  )
}

const MAX_MONEY_CLIKED = 20;

function Tycoon() {
  useEffect(() => {
    (document.getElementById("my_modal_3") as HTMLDialogElement).showModal();
  }, []);

  const { height, width } = getWindowDimensions();
  const [isExploding, setIsExploding] = useState(false);
  const [Position, setPosition] = useState({ x: 150, y: 150 })

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition({
        ...Position,
        x: Math.floor(Math.random() * width) - (width/2),
        y: Math.floor(Math.random() * height) - (height / 2),
      })

      return () => {
        clearInterval(timer)
      }}, 1500)
    }, [Position, height, width])

  const [numMoneyClicked, setMoneyClicked] = useState<number>(0);

  const {data: session} = useSession();

  if (!session) return <div>Please login</div>;

  const handleClick = () => {
    setIsExploding(true);
    console.log("button has been clicked, add $10 to the total balance", numMoneyClicked);
    setMoneyClicked((value) => (value + 1));
    if (numMoneyClicked <= MAX_MONEY_CLIKED) {
      void User_makes_money(session.user.id, 10);
    } else {
      (document.getElementById("money_money") as HTMLDialogElement).showModal();
    }
  };

  return (
      <>
        <Navbar/>
        <Money_override_Modal />
        <Modal/>

        {/*everytime you clikc the button your money should go up by a little bit;*/}

      {/* main content starts here */}
      <div className="h-screen w-screen bg-[url('/public/cat.jpg')">
        {isExploding && (
            <Confetti
                width={width}
                height={height}
                numberOfPieces={500}
            />
        )}
        <div className="flex h-screen w-screen items-center justify-center">
          {/* on hover, I want to make this button hard to click. */}
          <motion.button className="btn btn-primary h-24 w-52" onClick={handleClick} animate={{x: Position.x, y: Position.y, transition: {duration: 0.5}}} whileHover={{scale: 1.5, x:Position.y, y:Position.x}}>
            Click here!
          </motion.button>
        </div>
          {/*{Array.from(Array(numMoneyClicked).keys()).map((_, i) => {*/}
          {/*  // random element to be placed randomly on the page;*/}
          {/*  // generate a random x, random y;*/}

          {/*  return (*/}
          {/*      <div key={i} className={`absolute top-[${500}px] left-[100px] w-24 h-24`}>*/}
          {/*        <div className={"inline "} onClick={handleClick}>*/}
          {/*          <MoneyIcon pos_x={50} pos_y={50} />*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*  )*/}
          {/*})}*/}
      </div>
    </>
  );
}

export default Tycoon;
