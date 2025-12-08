import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '../types';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FlashMessage() {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

    useEffect(() => {
        if (flash.error) {
            setMessage({ type: 'error', text: flash.error });
            setVisible(true);
        } else if (flash.success) {
            setMessage({ type: 'success', text: flash.success });
            setVisible(true);
        } else if (flash.message) {
            setMessage({ type: 'info', text: flash.message });
            setVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!message) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-24 right-4 z-[100] max-w-sm w-full"
                >
                    <div className={`
                        p-4 border flex items-start gap-3 shadow-lg relative
                        ${message.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-500' : ''}
                        ${message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : ''}
                        ${message.type === 'info' ? 'bg-brand/10 border-brand text-brand' : ''}
                    `}>
                        <div className="flex-shrink-0 mt-0.5">
                            {message.type === 'error' && <AlertTriangle size={18} />}
                            {message.type === 'success' && <CheckCircle size={18} />}
                            {message.type === 'info' && <Info size={18} />}
                        </div>
                        <div className="flex-grow text-sm font-primary">
                            {message.text}
                        </div>
                        <button 
                            onClick={() => setVisible(false)}
                            className="flex-shrink-0 hover:opacity-70 transition-opacity"
                        >
                            <X size={16} />
                        </button>

                        {/* Retro corners */}
                        <div className={`absolute top-0 left-0 w-1 h-1 border-t border-l ${
                            message.type === 'error' ? 'border-red-500' : 
                            message.type === 'success' ? 'border-green-500' : 'border-brand'
                        }`} />
                        <div className={`absolute top-0 right-0 w-1 h-1 border-t border-r ${
                            message.type === 'error' ? 'border-red-500' : 
                            message.type === 'success' ? 'border-green-500' : 'border-brand'
                        }`} />
                        <div className={`absolute bottom-0 left-0 w-1 h-1 border-b border-l ${
                            message.type === 'error' ? 'border-red-500' : 
                            message.type === 'success' ? 'border-green-500' : 'border-brand'
                        }`} />
                        <div className={`absolute bottom-0 right-0 w-1 h-1 border-b border-r ${
                            message.type === 'error' ? 'border-red-500' : 
                            message.type === 'success' ? 'border-green-500' : 'border-brand'
                        }`} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
