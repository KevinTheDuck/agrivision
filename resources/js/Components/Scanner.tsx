import React from "react";
import { motion } from "framer-motion";
import { Cpu, Scan, CheckCircle2, AlertTriangle } from "lucide-react";

export default function DetectionPromo() {
    return (
        <section className="bg-black py-24 relative overflow-hidden border-t border-white/10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative z-10 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-primary font-bold uppercase tracking-widest">
                        <Cpu size={14} />
                        <span>ResNet-50 Powered</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-none font-headline">
                        Diagnose in <br />
                        <span className="text-green-500">Milliseconds.</span>
                    </h2>

                    <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-lg font-primary">
                        Our optimized machine learning models run directly in
                        the browser or via API, delivering lab-grade diagnostic
                        accuracy without the wait.
                    </p>

                    <div className="space-y-4 mb-10">
                        {[
                            {
                                label: "Multi-Crop Support",
                                desc: "Optimized for Wheat, Rice, Corn, and Potato.",
                            },
                            {
                                label: "Offline Capable",
                                desc: "PWA support enables field use without internet.",
                            },
                            {
                                label: "Heatmap Visualization",
                                desc: "Pinpoint exact infection zones on leaves.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-4 border border-white/5 bg-white/[0.02] rounded-sm hover:border-green-500/30 transition-colors"
                            >
                                <CheckCircle2
                                    className="text-green-500 shrink-0 mt-1"
                                    size={20}
                                />
                                <div>
                                    <h4 className="text-white font-bold text-sm font-headline">
                                        {item.label}
                                    </h4>
                                    <p className="text-zinc-500 text-sm font-primary">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="bg-green-500 font-primary text-black px-8 py-4 font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-green-400 transition-all flex items-center gap-2">
                        Try Demo Model <Scan size={16} />
                    </button>
                </div>

                <div className="relative order-1 lg:order-2 h-[500px] flex items-center justify-center bg-neutral-900/50 rounded-lg border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    <div className="relative w-64 h-80 opacity-80">
                        <svg
                            viewBox="0 0 100 120"
                            className="w-full h-full fill-none stroke-white/20 stroke-[0.5]"
                        >
                            <path
                                d="M50,110 Q50,60 10,60 Q50,60 50,10 Q50,60 90,60 Q50,60 50,110 Z"
                                className="fill-white/5"
                            />
                            <path d="M50,110 L50,10" />
                            <path d="M50,30 L80,50" />
                            <path d="M50,50 L20,70" />
                            <path d="M50,80 L70,90" />
                        </svg>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0.5, 1.2, 1.2, 0.5],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            className="absolute top-[40%] right-[30%] w-8 h-8 bg-red-500/40 rounded-full blur-md"
                        />
                    </div>

                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start font-primary z-20">
                        <div className="space-y-1">
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                                Target ID
                            </div>
                            <div className="text-sm font-mono text-green-500">
                                IMG_8842_RAW
                            </div>
                        </div>
                        <div className="space-y-1 text-right">
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                                Status
                            </div>
                            <div className="text-sm font-mono text-white flex items-center justify-end gap-2">
                                Processing{" "}
                                <span className="block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur border border-white/10 rounded-sm font-primary z-20">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400 uppercase">
                                Detection Result
                            </span>
                            <span className="text-xs text-red-400 uppercase font-bold flex items-center gap-1">
                                <AlertTriangle size={12} /> Positive
                            </span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                whileInView={{ width: "94%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="bg-red-500 h-full w-[94%]"
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-gray-500">
                                Early Blight
                            </span>
                            <span className="text-[10px] text-gray-300">
                                94.2% Confidence
                            </span>
                        </div>
                    </div>

                    <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{
                            duration: 4,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="absolute left-0 right-0 h-[2px] bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-0"
                    >
                        <div className="absolute right-4 -top-8 bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded-sm font-primary">
                            SCANNING...
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
