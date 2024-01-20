import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { db } from "~/server/db";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function fetchData() {
  return db.user.findUnique({
    where: {
      id: "65aa1b0bdc191db3c2a06b50",
    },
  });
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchData();
  console.log(data);
  return (
    <div>
      <Navbar data={data} />
      {children}
    </div>
  );
}
