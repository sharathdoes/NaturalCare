"use client"
import "./globals.css";
import NavBar from "@/components/Nav";
import localFont from "next/font/local";

import { SessionProvider } from 'next-auth/react';

const workSans = localFont({
  src: "./fonts/WorkSans-Regular.ttf"
})

const workSansBold = localFont({
  src: "./fonts/WorkSans-ExtraBold.ttf"
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className}`}>
        <SessionProvider>
        <NavBar />
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}
