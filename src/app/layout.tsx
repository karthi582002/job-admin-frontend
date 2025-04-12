import type { Metadata } from "next";
import '@mantine/core/styles.css';
import "./globals.css";
import { satoshi } from "./fonts";
import React from "react";
import Providers from "./providers";
import {ColorSchemeScript} from "@mantine/core";


export const metadata: Metadata = {
  title: "Job Posts",
  description: "Job Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${satoshi.variable} antialiased`}
      >
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
