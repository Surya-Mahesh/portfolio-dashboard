"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Terminal() {
    const [lines, setLines] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [index, setIndex] = useState(-1);
    const [booting, setBooting] = useState(true);
    const router = useRouter();
    const bottomRef = useRef<HTMLDivElement>(null);

    // Audio refs
    const bootAudioRef = useRef<HTMLAudioElement | null>(null);
    const keyAudioRef = useRef<HTMLAudioElement | null>(null);

    // Load audios (optional - will not throw if missing)
    useEffect(() => {
        try {
            bootAudioRef.current = new Audio("/sounds/boot.mp3");
            // lower volume so it's not too loud
            bootAudioRef.current.volume = 0.7;
        } catch (e) {
            bootAudioRef.current = null;
        }

        try {
            keyAudioRef.current = new Audio("/sounds/key.mp3");
            keyAudioRef.current.volume = 0.15;
        } catch (e) {
            keyAudioRef.current = null;
        }
    }, []);

    // Auto scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    // Boot sequence animation + play boot sound
    useEffect(() => {
        const bootLines = [
            "Initializing kernel...",
            "Loading modules...",
            "Establishing secure connection...",
            "Booting UI renderer...",
            "System Ready.",
            "",
            "Type 'help' to get started."
        ];

        // play boot sound (if available). try/catch in case browser blocks autoplay;
        // the user can interact and the audio will play later when allowed.
        if (bootAudioRef.current) {
            // attempt to play — browsers may require user interaction; this won't crash
            bootAudioRef.current.play().catch(() => {
                // ignore autoplay block
            });
        }

        let i = 0;
        const interval = setInterval(() => {
            setLines((prev) => [...prev, bootLines[i]]);
            i++;
            if (i === bootLines.length) {
                clearInterval(interval);
                setBooting(false);
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    const runCommand = (cmd: string) => {
        let output: string[] = [`> ${cmd}`];
        const c = cmd.toLowerCase();

        switch (c) {
            case "help":
                output.push(
                    "Available commands:",
                    " about        → show bio",
                    " skills       → list skills",
                    " projects     → open projects page",
                    " contact      → how to reach me",
                    " experience   → open experience page",
                    " resume       → open resume",
                    " clear        → clear screen",
                    " sudo         → ???",
                    "",
                    "Navigation commands:",
                    " open <page>  → open page (example: open projects)"
                );
                break;

            case "about":
                output.push("I am Surya Mahesh — Developer, ML Engineer, and AI Builder.");
                break;

            case "skills":
                output.push("Skills: Python, JS, React, Next.js, ML, APIs, Docker, SQL.");
                break;

            case "projects":
                output.push("Opening projects page...");
                router.push("/projects");
                break;

            case "contact":
                output.push("Opening contact page...");
                router.push("/contact");
                break;

            case "experience":
                output.push("Opening experience page...");
                router.push("/experience");
                break;

            case "resume":
                output.push("Opening resume...");
                router.push("/resume");
                break;

            case "clear":
                setLines([]);
                return;

            case "sudo":
                output.push("Permission denied: This action will be reported. 😎");
                break;

            default:
                if (c.startsWith("open ")) {
                    const page = c.split(" ")[1];
                    output.push(`Opening ${page} page...`);
                    router.push(`/${page}`);
                } else {
                    output.push("Unknown command. Type 'help'.");
                }
        }

        setLines((prev) => [...prev, ...output]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        runCommand(input);
        setHistory((prev) => [...prev, input]);
        setIndex(-1);
        setInput("");
    };

    // Command history navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // keypress sound for visible keys only
        const skipKeys = ["Shift", "Control", "Alt", "Meta", "ArrowUp", "ArrowDown", "Enter"];
        if (!skipKeys.includes(e.key) && keyAudioRef.current) {
            // clone to allow overlapping clicks
            try {
                keyAudioRef.current.currentTime = 0;
                keyAudioRef.current.play().catch(() => { });
            } catch {
                // ignore
            }
        }

        if (e.key === "ArrowUp") {
            if (history.length === 0) return;
            const newIndex = index < history.length - 1 ? index + 1 : history.length - 1;
            setIndex(newIndex);
            setInput(history[history.length - 1 - newIndex]);
        }
        if (e.key === "ArrowDown") {
            if (index <= 0) {
                setIndex(-1);
                setInput("");
            } else {
                const newIndex = index - 1;
                setIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            }
        }
    };

    return (
        <div className="w-full max-w-3xl bg-black text-green-400 p-4 font-mono border border-green-600 rounded-lg shadow-xl">
            <div className="min-h-[400px] max-h-[500px] overflow-y-auto">
                {lines.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">{line}</div>
                ))}
                <div ref={bottomRef} />
            </div>

            {!booting && (
                <form onSubmit={handleSubmit} className="flex mt-4">
                    <span className="mr-2">&gt;</span>
                    <input
                        className="flex-1 bg-black text-green-400 outline-none caret-green-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </form>
            )}
        </div>
    );
}
