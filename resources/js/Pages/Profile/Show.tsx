import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '../../Components/Navbar';
import PostCard from '../../Components/Forum/PostCard';
import Pagination from '../../Components/Pagination';
import { User as UserIcon, MessageSquare, FileText, Calendar, Tag, Shield } from 'lucide-react';

export default function Show({ profileUser, posts, comments, initialTab = 'posts' }: any) {
    const [activeTab, setActiveTab] = useState<'posts' | 'comments'>(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

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
            <Head title={`${profileUser.name}'s Profile`} />
            <div className="min-h-screen bg-background text-foreground font-primary selection:bg-brand selection:text-black">
                <Navbar />
                
                <main className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Profile Header */}
                        <motion.div variants={itemVariants} className="bg-black/40 border border-white/10 p-8 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand" />

                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 bg-zinc-900 flex-shrink-0">
                                    {profileUser.avatar ? (
                                        <img src={profileUser.avatar} alt={profileUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                            <UserIcon size={48} />
                                        </div>
                                    )}
                                </div>

                                <div className="text-center md:text-left flex-grow">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <h1 className="text-3xl font-headline font-bold text-white tracking-wider">
                                            {profileUser.name}
                                        </h1>
                                        {(profileUser.role === 'moderator' || profileUser.role === 'admin') && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-primary uppercase tracking-wider rounded-sm border border-green-500/20">
                                                <Shield size={12} /> Moderator
                                            </span>
                                        )}
                                    </div>
                                    {profileUser.flair && (
                                        <div className="mb-4">
                                            <span className="inline-block px-2 py-1 bg-brand/10 text-brand text-xs font-primary uppercase tracking-wider rounded-sm border border-brand/20">
                                                {profileUser.flair}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs font-primary text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>Joined {new Date(profileUser.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileText size={14} />
                                            <span>{posts.total} Transmissions</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageSquare size={14} />
                                            <span>{comments.total} Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tabs */}
                        <motion.div variants={itemVariants} className="flex border-b border-white/10 mb-8">
                            <button
                                onClick={() => setActiveTab('posts')}
                                className={`px-6 py-3 text-sm font-primary uppercase tracking-wider transition-colors relative ${
                                    activeTab === 'posts' ? 'text-brand' : 'text-zinc-500 hover:text-white'
                                }`}
                            >
                                Transmissions
                                {activeTab === 'posts' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('comments')}
                                className={`px-6 py-3 text-sm font-primary uppercase tracking-wider transition-colors relative ${
                                    activeTab === 'comments' ? 'text-brand' : 'text-zinc-500 hover:text-white'
                                }`}
                            >
                                Comments
                                {activeTab === 'comments' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand" />
                                )}
                            </button>
                        </motion.div>

                        {/* Content */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            {activeTab === 'posts' ? (
                                <>
                                    {posts.data.length > 0 ? (
                                        posts.data.map((post: any) => (
                                            <PostCard key={post.id} post={post} />
                                        ))
                                    ) : (
                                        <div className="text-center py-12 border border-white/10 border-dashed text-zinc-500 font-primary">
                                            No transmissions found.
                                        </div>
                                    )}
                                    <Pagination links={posts.links} />
                                </>
                            ) : (
                                <>
                                    {comments.data.length > 0 ? (
                                        comments.data.map((comment: any) => (
                                            <div key={comment.id} className="bg-black/40 border border-white/10 p-4">
                                                <div className="text-xs text-zinc-500 mb-2 font-primary flex items-center gap-2">
                                                    <span>On</span>
                                                    {comment.post ? (
                                                        <Link 
                                                            // @ts-ignore
                                                            href={route('forum.show', comment.post.id)}
                                                            className="text-brand hover:underline"
                                                        >
                                                            {comment.post.title}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-zinc-600 italic">[Deleted Transmission]</span>
                                                    )}
                                                    <span>•</span>
                                                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-zinc-300 text-sm">{comment.body}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 border border-white/10 border-dashed text-zinc-500 font-primary">
                                            No comments found.
                                        </div>
                                    )}
                                    <Pagination links={comments.links} />
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
