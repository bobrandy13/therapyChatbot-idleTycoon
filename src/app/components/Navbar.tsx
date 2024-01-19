"use client";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

function Navbar() {
  const { data: session } = useSession();
  if (!session?.user) return <div>Please login first;</div>;
  if (!session?.user.image) return <div>no profile image</div>;
  return (
    <div className="text-xl text-white">
      <div className="absolute right-0 float-right m-3 mx-auto flex flex-wrap items-center justify-between p-4 font-bold">
        <Image
          src={session.user.image}
          alt="profile image"
          className="mr-4 rounded-full"
          width={36}
          height={36}
        />
        <h1>Balance: $500</h1>
      </div>
    </div>
  );
}

export default Navbar;
