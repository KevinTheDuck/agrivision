import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { MessageSquare, Share2, Lock, Shield, Star } from 'lucide-react';
import VoteControl from './VoteControl';
import ShareModal from '../ShareModal';

interface PostProps {
    post: any;
}

export default function PostCard({ post }: PostProps) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <>
            <div className={`flex gap-4 bg-black/40 border p-4 hover:border-brand/50 transition-colors group relative overflow-hidden ${post.is_locked ? 'border-red-500/30' : 'border-white/10'}`}>
                {/* Retro corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-brand transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-brand transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-brand transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-brand transition-colors" />

                <div className="flex-shrink-0">
                    <VoteControl id={post.id} type="post" score={post.score} userVote={post.user_vote} />
                </div>

                <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2 font-primary">
                        {post.is_featured && (
                            <span className="text-brand flex items-center gap-1">
                                <Star size={10} /> FEATURED
                            </span>
                        )}
                        {post.is_locked && (
                            <span className="text-red-500 flex items-center gap-1">
                                <Lock size={10} /> LOCKED
                            </span>
                        )}
                        {post.categories.map((cat: any) => (
                            <span key={cat.id} className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-white ${cat.color || 'bg-zinc-700'}`}>
                                {cat.name}
                            </span>
                        ))}
                        <span>•</span>
                        <Link 
                            // @ts-ignore
                            href={route('profile.show', post.user.id)}
                            className="text-brand hover:underline flex items-center gap-1"
                        >
                            @{post.user.name}
                            {(post.user.role === 'moderator' || post.user.role === 'admin') && (
                                <Shield size={10} className="text-green-500" />
                            )}
                        </Link>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>

                    <Link 
                        // @ts-ignore
                        href={route('forum.show', post.id)} 
                        className="block group-hover:text-brand transition-colors"
                    >
                        <h3 className="text-xl font-bold text-white mb-2 font-headline tracking-wide">{post.title}</h3>
                        <p className="text-zinc-400 text-sm line-clamp-3 font-primary">{post.body}</p>
                    </Link>

                    {post.image_path && (
                        <div className="mt-4 h-48 w-full overflow-hidden rounded border border-white/10">
                            <img src={post.image_path} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                        <Link 
                            // @ts-ignore
                            href={route('forum.show', post.id)} 
                            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors font-primary uppercase tracking-wider"
                        >
                            <MessageSquare size={14} />
                            {post.comments_count} Comments
                        </Link>
                        <button 
                            onClick={() => setIsShareModalOpen(true)}
                            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors font-primary uppercase tracking-wider"
                        >
                            <Share2 size={14} />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)} 
                // @ts-ignore
                url={route('forum.show', post.id)}
                title={post.title}
            />
        </>
    );
}
