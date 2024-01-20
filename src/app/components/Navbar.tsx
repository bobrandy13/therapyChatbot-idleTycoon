"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import getBalance from "~/server/fetchBalance";

function Navbar() {
  //   if (!data) return <div>loading...</div>;

  //   if (!session?.user) return <div>Please login first;</div>;
  //   if (!session?.user.image) return <div>no profile image</div>;
  const [pfp, setPFP] = useState("");
  const [balance, setBalance] = useState<number>();

  const { data: session } = useSession();
  if (!session) return <div>please sign in</div>;
  getBalance(session?.user.id)
    .then((res) => {
      if (res) {
        if (res.image) {
          setPFP(res.image);
        }
        setBalance(res.balance);
      }
    })
    .catch((e) => console.error(e));
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
