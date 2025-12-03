import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Surya Mahesh Portfolio",
  description: "Next.js Portfolio with Boot + Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-green-400 font-mono">{children}</body>
    </html>
  );
}
