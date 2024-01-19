import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvder from "./components/SessionProvider";
import { authOptions } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kevin's Therapy App",
  description: "created by Kevin Huang",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <SessionProvder session={session}>{children} </SessionProvder>
      </body>
    </html>
  );
}
