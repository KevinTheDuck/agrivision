import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import FlashMessage from '../../Components/FlashMessage';
import { Upload, X, Scan, AlertCircle, CheckCircle, Loader2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index() {
    const { auth, flash, errors } = usePage().props as any;
    const { data, setData, post, processing, reset } = useForm({
        image: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const analysisResult = (usePage().props as any).analysis;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        post(route('demo.analyze'), {
            preserveScroll: true,
            onSuccess: () => {
                // Keep the preview, but maybe scroll to results?
            }
        });
    };

    const clearAll = () => {
        setData('image', null);
        setPreview(null);
        window.location.reload();
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Head title="AI Model Demo" />
            <div className="min-h-screen bg-background text-foreground font-primary selection:bg-brand selection:text-black">
                <Navbar />
                <FlashMessage />
                
                <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={itemVariants} className="mb-12 border-b border-white/10 pb-4">
                            <h1 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-wider">
                                SYSTEM DIAGNOSTIC
                            </h1>
                            <p className="text-brand/60 text-xs font-primary uppercase tracking-widest mt-2">
                                // Initialize Computer Vision Module
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Upload Section */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                <div className="bg-black/40 border border-white/10 p-6 rounded-lg">
                                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Upload size={20} className="text-brand" />
                                        Input Source
                                    </h2>
                                    
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded flex items-start gap-3 text-blue-400 text-xs leading-relaxed mb-6">
                                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                        <p>
                                            <strong>Note:</strong> For best results, ensure the image is clear and contains a single isolated leaf. This helps the model focus on the specific symptoms.
                                        </p>
                                    </div>

                                    <form onSubmit={submit} className="space-y-6">
                                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all relative ${
                                            preview ? 'border-brand/50 bg-brand/5' : 'border-white/10 hover:border-white/30'
                                        }`}>
                                            {preview ? (
                                                <div className="relative inline-block w-full">
                                                    <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded shadow-lg" />
                                                    <button
                                                        type="button"
                                                        onClick={clearAll}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-lg z-10"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                    />
                                                    <label htmlFor="image" className="cursor-pointer flex flex-col items-center gap-4 py-8">
                                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-brand transition-colors">
                                                            <Scan size={32} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-sm font-bold text-white uppercase tracking-wider">Click to Upload</p>
                                                            <p className="text-xs text-zinc-500">JPG, PNG up to 5MB</p>
                                                        </div>
                                                    </label>
                                                </>
                                            )}
                                        </div>

                                        {errors.image && (
                                            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded flex items-center gap-2 text-red-400 text-sm">
                                                <AlertCircle size={16} />
                                                {errors.image}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={!data.image || processing}
                                            className="w-full bg-brand text-black font-bold py-4 hover:bg-white transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Scan size={18} />
                                                    Run Analysis
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Results Section */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                <div className="bg-black/40 border border-white/10 p-6 rounded-lg h-full">
                                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <CheckCircle size={20} className={analysisResult ? "text-brand" : "text-zinc-600"} />
                                        Analysis Results
                                    </h2>

                                    <AnimatePresence mode="wait">
                                        {analysisResult ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-6"
                                            >
                                                <div className="p-4 bg-white/5 rounded border border-white/10">
                                                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Detected Condition</div>
                                                    <div className="text-2xl font-bold text-white capitalize">
                                                        {analysisResult.class.replace(/___/g, ' - ').replace(/_/g, ' ')}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs uppercase tracking-wider text-zinc-400">
                                                        <span>Confidence Score</span>
                                                        <span>{(analysisResult.confidence * 100).toFixed(1)}%</span>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${analysisResult.confidence * 100}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className={`h-full ${
                                                                analysisResult.confidence > 0.8 ? 'bg-green-500' : 
                                                                analysisResult.confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2 text-xs text-yellow-500/80 bg-yellow-500/10 p-3 rounded border border-yellow-500/20">
                                                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                                    <p>
                                                        <strong>Disclaimer:</strong> AI analysis may be inaccurate. Results should be verified by experts or discussed with the community.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-brand/10 border border-brand/20 rounded">
                                                    <h3 className="text-brand font-bold text-sm uppercase tracking-wider mb-2">Recommendation</h3>
                                                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                                                        Based on the analysis, this plant appears to be affected by <strong>{analysisResult.class.replace(/___/g, ' - ').replace(/_/g, ' ')}</strong>. 
                                                        Join our community for more insights and opionions on treatment options.
                                                    </p>
                                                    <Link 
                                                        // @ts-ignore
                                                        href={route('forum.index')}
                                                        className="inline-flex items-center gap-2 bg-brand text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-sm"
                                                    >
                                                        <MessageSquare size={14} /> Ask the Community
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="h-64 flex flex-col items-center justify-center text-zinc-600 border border-white/5 border-dashed rounded">
                                                <Scan size={48} className="mb-4 opacity-20" />
                                                <p className="text-sm uppercase tracking-wider">Waiting for input...</p>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
