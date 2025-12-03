"use client";

import { ReactTyped } from "react-typed";
import { useState, useEffect } from "react";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => setBootComplete(true), 3500);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono">
      {!bootComplete ? (
        <div className="space-y-2 text-left">
          <p>&gt; Initializing system...</p>
          <p>&gt; Loading modules...</p>
          <p>&gt; Establishing secure connection...</p>
          <p>&gt; Calibrating UI renderer...</p>
          <p>&gt; All systems nominal.</p>
        </div>
      ) : (
        <div className="text-center space-y-8">
          <ReactTyped
            strings={[
              "Welcome to Surya Mahesh’s Portfolio_",
              "Fetching projects from GitHub...",
              "System Ready ✅",
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
            className="text-3xl"
          />

          {/* ✅ Projects Section */}
          <section className="mt-10 space-y-6 text-left max-w-xl">
            <h2 className="text-4xl font-bold underline">My Projects</h2>

            <div>
              <h3 className="text-2xl font-bold">Project 1</h3>
              <p className="text-green-300">Cool React project</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Project 2</h3>
              <p className="text-green-300">Next.js + Tailwind portfolio</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Project 3</h3>
              <p className="text-green-300">ML Prediction API</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Project 4</h3>
              <p className="text-green-300">OpenAI hackathon winner</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
