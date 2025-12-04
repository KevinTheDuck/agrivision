import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Github, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen bg-background text-foreground flex flex-col font-primary selection:bg-selectionBg selection:text-selectionText relative">
                <div className="absolute top-0 left-0 w-full z-20 pt-6">
                    <div className="max-w-7xl mx-auto px-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-primary uppercase tracking-wider">Back to Home</span>
                        </Link>
                    </div>
                </div>

                <main className="flex-grow flex items-center justify-center px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full max-w-md p-8 border border-white/10 bg-black/80 backdrop-blur-md rounded-none relative"
                    >
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand" />

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h1 className="text-3xl font-headline font-bold text-center mb-2 text-white tracking-wider">
                                SYSTEM ACCESS
                            </h1>
                            <p className="text-center text-brand/60 text-xs mb-8 font-primary uppercase tracking-widest">
                                // Authentication Required
                            </p>
                        </motion.div>
                        
                        <div className="space-y-4">
                            <motion.a
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                href="/auth/google/redirect"
                                className="flex items-center justify-center w-full py-4 px-4 border border-white/10 bg-white/5 hover:bg-brand/10 hover:border-brand/50 text-white hover:text-brand transition-all duration-300 group relative overflow-hidden"
                            >
                                <Chrome className="w-5 h-5 mr-3 relative z-10" />
                                <span className="relative z-10 font-primary text-sm uppercase tracking-wider">Login with Google</span>
                            </motion.a>
                            
                            <motion.a
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                href="/auth/github/redirect"
                                className="flex items-center justify-center w-full py-4 px-4 border border-white/10 bg-white/5 hover:bg-brand/10 hover:border-brand/50 text-white hover:text-brand transition-all duration-300 group relative overflow-hidden"
                            >
                                <Github className="w-5 h-5 mr-3 relative z-10" />
                                <span className="relative z-10 font-primary text-sm uppercase tracking-wider">Login with GitHub</span>
                            </motion.a>
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-[10px] text-white/20 font-primary">
                                ESTABLISHING SECURE UPLINK...
                            </p>
                        </motion.div>
                    </motion.div>
                </main>

                <footer className="py-6 text-center border-t border-white/5 bg-black/50 backdrop-blur-sm relative z-10">
                    <p className="text-[10px] text-zinc-600 font-primary tracking-widest">
                        {new Date().getFullYear()} Agrivision Inc. // Secure Access Terminal
                    </p>
                </footer>
            </div>
        </>
    );
}
