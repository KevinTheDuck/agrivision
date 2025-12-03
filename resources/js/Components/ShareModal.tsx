import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
}

export default function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md z-[101]"
                    >
                        <div className="bg-zinc-900 border border-white/10 p-6 relative shadow-2xl">
                            {/* Retro corners */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand" />

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-headline font-bold text-white tracking-wider">
                                    SHARE TRANSMISSION
                                </h3>
                                <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 block">
                                        Transmission Link
                                    </label>
                                    <div className="flex gap-2">
                                        <input 
                                            readOnly 
                                            value={url} 
                                            className="flex-grow bg-black/50 border border-white/10 px-3 py-2 text-sm font-mono text-zinc-300 focus:outline-none"
                                        />
                                        <button 
                                            onClick={handleCopy}
                                            className={`px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-brand text-black hover:bg-white'}`}
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 block">
                                        Broadcast To Network
                                    </label>
                                    <div className="flex gap-2">
                                        <a 
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] border border-white/10 p-3 flex justify-center transition-colors"
                                        >
                                            <Twitter size={18} />
                                        </a>
                                        <a 
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-white/5 hover:bg-[#4267B2]/20 hover:text-[#4267B2] border border-white/10 p-3 flex justify-center transition-colors"
                                        >
                                            <Facebook size={18} />
                                        </a>
                                        <a 
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] border border-white/10 p-3 flex justify-center transition-colors"
                                        >
                                            <Linkedin size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
