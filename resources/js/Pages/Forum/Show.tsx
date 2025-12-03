import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import VoteControl from '../../Components/Forum/VoteControl';
import CommentSection from '../../Components/Forum/CommentSection';
import ShareModal from '../../Components/ShareModal';
import { ArrowLeft, Share2, AlertTriangle } from 'lucide-react';

export default function Show({ post }: any) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <>
            <Head title={post.title} />
            <div className="min-h-screen bg-background text-foreground font-primary selection:bg-brand selection:text-black">
                <Navbar />
                
                <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
                    <Link 
                        // @ts-ignore
                        href={route('forum.index')}
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand mb-8 text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Forum
                    </Link>

                    <article className="bg-black/40 border border-white/10 p-8 relative overflow-hidden">
                        {/* Retro corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand" />

                        <div className="flex gap-6">
                            <div className="flex-shrink-0 pt-2">
                                <VoteControl id={post.id} type="post" score={post.score} userVote={post.user_vote} />
                            </div>

                            <div className="flex-grow">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4 font-mono">
                                    {post.categories.map((cat: any) => (
                                        <span key={cat.id} className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-white ${cat.color || 'bg-zinc-700'}`}>
                                            {cat.name}
                                        </span>
                                    ))}
                                    <span>•</span>
                                    <Link 
                                        // @ts-ignore
                                        href={route('profile.show', post.user.id)}
                                        className="text-brand hover:underline"
                                    >
                                        @{post.user.name}
                                    </Link>
                                    <span>•</span>
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-headline font-bold text-white mb-6 tracking-wide leading-tight">
                                    {post.title}
                                </h1>

                                <div className="prose prose-invert max-w-none mb-8 font-primary text-zinc-300">
                                    {post.body.split('\n').map((line: string, i: number) => (
                                        <p key={i} className="mb-4">{line}</p>
                                    ))}
                                </div>

                                {post.image_path && (
                                    <div className="mb-8 border border-white/10 rounded overflow-hidden">
                                        <img src={post.image_path} alt={post.title} className="w-full h-auto" />
                                    </div>
                                )}

                                {/* Auto-Classification Results Placeholder */}
                                {post.auto_classify && (
                                    <div className="bg-zinc-900/50 border border-brand/30 p-4 mb-8 rounded relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-brand/20 text-brand text-[10px] px-2 py-1 font-mono uppercase">
                                            AI Analysis
                                        </div>
                                        <h4 className="text-brand font-bold font-mono text-sm mb-2 flex items-center gap-2">
                                            <AlertTriangle size={14} /> SYSTEM ANALYSIS
                                        </h4>
                                        {post.classification_results ? (
                                            <div className="text-sm text-zinc-300 font-mono">
                                                <pre>{JSON.stringify(post.classification_results, null, 2)}</pre>
                                            </div>
                                        ) : (
                                            <p className="text-xs text-zinc-500 font-mono">
                                                Analysis pending or unavailable. System link offline.
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => setIsShareModalOpen(true)}
                                            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors font-mono uppercase tracking-wider"
                                        >
                                            <Share2 size={14} />
                                            Share Transmission
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <CommentSection post={post} />
                </main>

                <ShareModal 
                    isOpen={isShareModalOpen} 
                    onClose={() => setIsShareModalOpen(false)} 
                    // @ts-ignore
                    url={route('forum.show', post.id)}
                    title={post.title}
                />
            </div>
        </>
    );
}
