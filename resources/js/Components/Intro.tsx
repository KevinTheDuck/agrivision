import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const [logs, setLogs] = useState<string[]>([]);
    const [isExit, setIsExit] = useState(false);

    const bootSequence = [
        "INITIALIZING AGRIVISION KERNEL v2.4.0...",
        "CHECKING MEMORY INTEGRITY... OK",
        "SYSTEM READY.",
    ];

    useEffect(() => {
        let delay = 0;
        let mounted = true;

        bootSequence.forEach((log, index) => {
            const stepDelay = Math.random() * 150 + 50;
            delay += stepDelay;

            setTimeout(() => {
                if (mounted) {
                    setLogs((prev) => [...prev, log]);
                }
            }, delay);
        });

        setTimeout(() => {
            if (mounted) {
                setIsExit(true);
            }
        }, delay + 800);

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-primary overflow-hidden"
            initial={{ opacity: 1 }}
            animate={
                isExit
                    ? {
                          opacity: 0,
                          scale: 1.2,
                          filter: "blur(10px)",
                      }
                    : {
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)",
                      }
            }
            transition={{
                duration: 1,
                ease: "easeInOut",
            }}
            onAnimationComplete={() => {
                if (isExit) onComplete();
            }}
        >
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))]"
                style={{ backgroundSize: "100% 4px" }}
            />
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

            <div className="w-full max-w-2xl px-6 relative z-20 flex flex-col justify-center h-full">
                <div className="space-y-2 mb-8">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-500 text-xs md:text-sm tracking-wider font-bold drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]"
                        >
                            <span className="mr-2 text-green-700">{`>`}</span>
                            {log}
                        </motion.div>
                    ))}
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-2 h-4 bg-green-500 inline-block align-middle ml-2 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                    />
                </div>

                <div className="w-full">
                    <div className="w-full h-0.5 bg-green-900/30">
                        <motion.div
                            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.3, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
