import React from "react";
import { Github, LucideTwitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6 justify-center">
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
                    <div className="max-w-xs">
                        <div className="flex items-center  mb-6">
                            <span className="text-5xl font-bold font-headline tracking-tight text-foreground">
                                Agrivision.
                            </span>
                        </div>
                        <p className="text-zinc-500 text-sm font-primary leading-relaxed">
                            Empowering agriculture through artificial
                            intelligence. Detect, diagnose, and discuss plant
                            health in real-time.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                        <div>
                            <h4 className="text-foreground font-headline font-bold uppercase tracking-wider mb-6 text-xs">
                                Platform
                            </h4>
                            <ul className="space-y-4 font-primary">
                                <li>
                                    <a
                                        href="#"
                                        className="text-zinc-500 hover:text-green-500 transition-colors"
                                    >
                                        Detection
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-zinc-500 hover:text-green-500 transition-colors"
                                    >
                                        Forum
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-foreground font-headline font-bold uppercase tracking-wider mb-6 text-xs">
                                Company
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="#"
                                        className="text-zinc-500 hover:text-green-500 transition-colors"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-zinc-500 hover:text-green-500 transition-colors"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-xs">
                        © {new Date().getFullYear()} Agrivision Inc. All rights
                        reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href="#"
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            <LucideTwitter size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
