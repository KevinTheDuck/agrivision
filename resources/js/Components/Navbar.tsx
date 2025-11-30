import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Forum", href: "/forum" },
        { label: "Contact", href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navbarActive = isScrolled || mobileMenuOpen;

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav
                className={`
                    transition-all duration-300 ease-in-out border-b
                    ${
                        navbarActive
                            ? "bg-black/80 backdrop-blur-md border-white/10 py-4"
                            : "bg-transparent border-white/0 py-6"
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center group cursor-pointer">
                        <span className="text-2xl font-headline font-bold text-white group-hover:text-brand transition-colors">
                            Agrivision.
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-primary">
                        {navItems.map((item) => {
                            const isActive = url === item.href;
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`
                                        tracking-wider transition-colors duration-300
                                        ${
                                            isActive
                                                ? "text-brand"
                                                : "text-zinc-400 hover:text-brand"
                                        }
                                    `}
                                >
                                    {item.label}
                                </a>
                            );
                        })}

                        <button className="bg-white text-black hover:bg-green-500 px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-sm">
                            Get Started
                        </button>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white hover:text-green-400 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <div
                className={`
                    md:hidden absolute top-full left-0 w-full
                    bg-gradient-to-b from-black/80 to-black/60
                    backdrop-blur-lg border-b border-white/10
                    flex flex-col gap-6 p-6
                    transition-all duration-300

                    ${
                        mobileMenuOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-4 pointer-events-none"
                    }
                `}
            >
                {navItems.map((item) => {
                    const isActive = url === item.href;

                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`
                                tracking-wider transition-colors duration-300
                                ${
                                    isActive
                                        ? "text-brand"
                                        : "text-zinc-400 hover:text-brand"
                                }
                            `}
                        >
                            {item.label}
                        </a>
                    );
                })}

                <button className="bg-white text-black hover:bg-green-500 px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-sm">
                    Get Started
                </button>
            </div>
        </header>
    );
}
