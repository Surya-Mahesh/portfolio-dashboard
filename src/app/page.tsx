"use client";

import { ReactTyped } from "react-typed";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono">
      <ReactTyped
        strings={[
          "Welcome to Surya’s Portfolio_",
          "Fetching projects from GitHub...",
          "System Ready ✅",
          "SURYAA waves you a HI",
        ]}
        typeSpeed={50}
        backSpeed={30}
        loop
      />
    </main>
  );
}
