import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import Navbar from "../components/Navbar";

export default async function TycoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
