
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "H&Z Studios | Admin Dashboard",
  description: "H&Z Studios Administration Centre",
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
