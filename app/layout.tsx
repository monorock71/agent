import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S-Well Agent OS",
  description: "AI Infrastructure for Real-World Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
