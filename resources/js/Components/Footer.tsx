import React from "react";
import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-8">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-zinc-600 text-xs font-primary">
                    © {new Date().getFullYear()} Agrivision Inc. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/KevinTheDuck/agrivision"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
