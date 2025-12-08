import React, { useState, useEffect } from "react";
import { Menu, X, User as UserIcon, ChevronDown, LogOut, Settings } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";
import { PageProps } from "../types";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { url, props } = usePage<PageProps>();
    const { auth } = props;

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Forum", href: "/forum" },
        { label: "Demo Model", href: "/demo" },
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
                    <Link href="/" className="flex items-center group cursor-pointer w-1/4">
                        <span className="text-2xl font-headline font-bold text-white group-hover:text-brand transition-colors">
                            Agrivision.
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center justify-center gap-8 text-sm font-primary w-2/4">
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
                    </div>

                    <div className="hidden md:flex items-center justify-end w-1/4">
                        {auth.user ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 text-white hover:text-brand transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-brand/50 transition-colors bg-zinc-900">
                                        {auth.user.avatar ? (
                                            <img 
                                                src={auth.user.avatar} 
                                                alt={auth.user.name} 
                                                className="w-full h-full object-cover"
                                                key={auth.user.avatar} // Force re-render on avatar change
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <UserIcon size={14} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-xs font-bold uppercase tracking-wider leading-none">{auth.user.name}</p>
                                        {auth.user.flair && (
                                            <p className="text-[10px] text-brand font-primary mt-1 leading-none">{auth.user.flair}</p>
                                        )}
                                    </div>
                                    <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute top-full right-0 mt-4 w-64 bg-black/90 backdrop-blur-md border border-white/10 p-4 shadow-xl">
                                        <div className="absolute -top-2 right-4 w-4 h-4 bg-black/90 border-t border-l border-white/10 rotate-45" />
                                        
                                        <div className="mb-4 pb-4 border-b border-white/10">
                                            <p className="text-sm font-bold text-white">{auth.user.name}</p>
                                            <p className="text-xs text-zinc-500 font-primary mt-1">{auth.user.email}</p>
                                            {auth.user.flair && (
                                                <span className="inline-block mt-2 px-2 py-1 bg-brand/10 text-brand text-[10px] font-primary uppercase tracking-wider rounded-sm border border-brand/20">
                                                    {auth.user.flair}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Link 
                                                // @ts-ignore
                                                href={route('profile.show', auth.user.id)}
                                                className="flex items-center gap-3 text-xs font-primary text-zinc-400 hover:text-white hover:bg-white/5 p-2 rounded-sm transition-colors"
                                            >
                                                <UserIcon size={14} />
                                                MY PROFILE
                                            </Link>
                                            <Link 
                                                href={route('profile.edit')}
                                                className="flex items-center gap-3 text-xs font-primary text-zinc-400 hover:text-white hover:bg-white/5 p-2 rounded-sm transition-colors"
                                            >
                                                <Settings size={14} />
                                                SETTINGS
                                            </Link>
                                            <Link 
                                                href="/logout" 
                                                method="post" 
                                                as="button"
                                                className="w-full flex items-center gap-3 text-xs font-primary text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-sm transition-colors"
                                            >
                                                <LogOut size={14} />
                                                DISCONNECT
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-white text-black hover:bg-brand px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-sm"
                            >
                                Sign In
                            </Link>
                        )}
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

                {auth.user ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                                {auth.user.avatar ? (
                                    <img src={auth.user.avatar} alt={auth.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                        <UserIcon size={16} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{auth.user.name}</p>
                                <p className="text-xs text-zinc-500 font-primary">{auth.user.email}</p>
                            </div>
                        </div>

                        <Link
                            href={route('profile.edit')}
                            className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                        >
                            <Settings size={14} /> Edit Profile
                        </Link>

                        <Link
                            href="/forum"
                            className="bg-brand text-black hover:bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-sm text-center"
                        >
                            Go to Forum
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors text-center flex items-center justify-center gap-2"
                        >
                            <LogOut size={14} /> Logout
                        </Link>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="bg-white text-black hover:bg-brand px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-sm text-center"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
