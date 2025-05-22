"use client"
import "./globals.css";
import NavBar from "@/components/Nav";

import { SessionProvider } from 'next-auth/react';

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <NavBar />
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}
