"use client";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import getBalance from "~/server/fetchBalance";
import { db } from "~/server/db";

function Navbar(props) {
  //   if (!data) return <div>loading...</div>;

  //   if (!session?.user) return <div>Please login first;</div>;
  //   if (!session?.user.image) return <div>no profile image</div>;
  const [pfp, setPFP] = useState("");
  const [balance, setBalance] = useState<number>();
  const data = getBalance("65aa1b0bdc191db3c2a06b50").then((res) => {
    if (res) {
      if (res.image) {
        setPFP(res.image);
      }
      setBalance(res.balance);
    }
  });
  return (
    <div className="text-xl text-white">
      <div className="absolute right-0 float-right m-3 mx-auto flex flex-wrap items-center justify-between p-4 font-bold">
        <Image
          src={pfp}
          alt="profile image"
          className="mr-4 rounded-full"
          width={36}
          height={36}
        />
        <h1>{`Balance $${balance}`}</h1>
      </div>
    </div>
  );
}

export default Navbar;
