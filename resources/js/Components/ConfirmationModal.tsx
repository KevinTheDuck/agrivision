import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

export default function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "Confirm", 
    cancelText = "Cancel",
    isDestructive = false 
}: ConfirmationModalProps) {
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
                        <div className={`bg-zinc-900 border p-6 relative shadow-2xl ${isDestructive ? 'border-red-500/30' : 'border-white/10'}`}>
                            {/* Retro corners */}
                            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isDestructive ? 'border-red-500' : 'border-brand'}`} />
                            <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isDestructive ? 'border-red-500' : 'border-brand'}`} />
                            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${isDestructive ? 'border-red-500' : 'border-brand'}`} />
                            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isDestructive ? 'border-red-500' : 'border-brand'}`} />

                            <div className="flex justify-between items-center mb-6">
                                <h3 className={`text-lg font-headline font-bold tracking-wider flex items-center gap-2 ${isDestructive ? 'text-red-500' : 'text-white'}`}>
                                    {isDestructive && <AlertTriangle size={20} />}
                                    {title}
                                </h3>
                                <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="text-zinc-300 font-primary mb-8">
                                {message}
                            </p>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-primary uppercase text-zinc-400 hover:text-white transition-colors"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className={`px-6 py-2 text-sm font-bold font-primary uppercase transition-colors ${
                                        isDestructive 
                                            ? 'bg-red-500 text-black hover:bg-red-400' 
                                            : 'bg-brand text-black hover:bg-white'
                                    }`}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
