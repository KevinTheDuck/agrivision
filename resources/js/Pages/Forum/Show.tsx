import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '../../Components/Navbar';
import VoteControl from '../../Components/Forum/VoteControl';
import CommentSection from '../../Components/Forum/CommentSection';
import ShareModal from '../../Components/ShareModal';
import ConfirmationModal from '../../Components/ConfirmationModal';
import FlashMessage from '../../Components/FlashMessage';
import { ArrowLeft, Share2, AlertTriangle, Lock, Trash2, Shield, Star, Eye, CheckCircle } from 'lucide-react';

export default function Show({ post }: any) {
    const { auth } = usePage().props as any;
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: 'Confirm',
        isDestructive: false,
        onConfirm: () => {},
    });

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

    const isModerator = auth.user && (auth.user.role === 'moderator' || auth.user.role === 'admin');
    const isAuthor = auth.user && auth.user.id === post.user_id;

    const closeConfirmModal = () => setConfirmModal({ ...confirmModal, isOpen: false });

    const handleDelete = () => {
        setConfirmModal({
            isOpen: true,
            title: 'DELETE TRANSMISSION',
            message: 'Are you sure you want to delete this transmission? This action cannot be undone.',
            confirmText: 'Delete',
            isDestructive: true,
            onConfirm: () => {
                // @ts-ignore
                router.delete(route('forum.destroy', post.id));
            },
        });
    };

    const handleToggleLock = () => {
        const action = post.is_locked ? 'unlock' : 'lock';
        setConfirmModal({
            isOpen: true,
            title: `${action.toUpperCase()} TRANSMISSION`,
            message: `Are you sure you want to ${action} this transmission? ${action === 'lock' ? 'Users will no longer be able to comment.' : 'Users will be able to comment again.'}`,
            confirmText: action === 'lock' ? 'Lock' : 'Unlock',
            isDestructive: action === 'lock',
            onConfirm: () => {
                // @ts-ignore
                router.post(route('forum.toggleLock', post.id));
            },
        });
    };

    const handleToggleFeature = () => {
        const action = post.is_featured ? 'unfeature' : 'feature';
        setConfirmModal({
            isOpen: true,
            title: `${action.toUpperCase()} TRANSMISSION`,
            message: `Are you sure you want to ${action} this transmission? ${action === 'feature' ? 'It will be displayed in the featured section.' : 'It will be removed from the featured section.'}`,
            confirmText: action === 'feature' ? 'Feature' : 'Unfeature',
            isDestructive: false,
            onConfirm: () => {
                // @ts-ignore
                router.post(route('forum.toggleFeature', post.id));
            },
        });
    };

    return (
        <>
            <Head title={post.title} />
            <div className="min-h-screen bg-background text-foreground font-primary selection:bg-brand selection:text-black">
                <Navbar />
                <FlashMessage />
                
                <main className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={itemVariants}>
                            <Link 
                                // @ts-ignore
                                href={route('forum.index')}
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand mb-8 text-xs font-primary uppercase tracking-wider transition-colors"
                            >
                                <ArrowLeft size={14} /> Back to Forum
                            </Link>
                        </motion.div>

                        <motion.article variants={itemVariants} className={`bg-black/40 border p-8 relative overflow-hidden ${post.is_locked ? 'border-red-500/30' : 'border-white/10'}`}>
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
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4 font-primary">
                                        {post.is_featured && (
                                            <span className="text-brand flex items-center gap-1 mr-2">
                                                <Star size={12} /> FEATURED
                                            </span>
                                        )}
                                        {post.is_locked && (
                                            <span className="text-red-500 flex items-center gap-1 mr-2">
                                                <Lock size={12} /> LOCKED
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
                                                <Shield size={12} className="text-green-500" />
                                            )}
                                            {post.user.is_expert && (
                                                <CheckCircle size={12} className="text-blue-500" />
                                            )}
                                        </Link>
                                        <span>•</span>
                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        {(isModerator || isAuthor) && (
                                            <>
                                                <span>•</span>
                                                <span className="flex items-center gap-1 text-zinc-400">
                                                    <Eye size={12} /> {post.views} Views
                                                </span>
                                            </>
                                        )}
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
                                            <div className="absolute top-0 right-0 bg-brand/20 text-brand text-[10px] px-2 py-1 font-primary uppercase">
                                                AI Analysis
                                            </div>
                                            <h4 className="text-brand font-bold font-primary text-sm mb-2 flex items-center gap-2">
                                                <AlertTriangle size={14} /> SYSTEM ANALYSIS
                                            </h4>
                                            {post.classification_results ? (
                                                <div className="text-sm text-zinc-300 font-primary">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-zinc-500 uppercase text-xs tracking-wider">Detected Condition</span>
                                                        <span className="text-brand font-bold">
                                                            {(post.classification_results.confidence * 100).toFixed(1)}% Confidence
                                                        </span>
                                                    </div>
                                                    <div className="text-lg font-headline text-white mb-4">
                                                        {post.classification_results.class.replace(/___/g, ' - ').replace(/_/g, ' ')}
                                                    </div>
                                                    
                                                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-brand" 
                                                            style={{ width: `${post.classification_results.confidence * 100}%` }}
                                                        />
                                                    </div>

                                                    <div className="mt-4 flex items-start gap-2 text-[10px] text-yellow-500/80 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                                                        <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                                                        <p>
                                                            <strong>Disclaimer:</strong> AI analysis may be inaccurate. Results should be verified by experts or discussed with the community.
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-xs text-zinc-500 font-primary">
                                                    Analysis pending or unavailable. System link offline.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={() => setIsShareModalOpen(true)}
                                                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors font-primary uppercase tracking-wider"
                                            >
                                                <Share2 size={14} />
                                                Share Transmission
                                            </button>
                                        </div>

                                        {isModerator && (
                                            <div className="flex items-center gap-4">
                                                <button 
                                                    onClick={handleToggleFeature}
                                                    className={`flex items-center gap-2 text-xs transition-colors font-primary uppercase tracking-wider ${post.is_featured ? 'text-brand hover:text-brand/80' : 'text-zinc-400 hover:text-brand'}`}
                                                >
                                                    <Star size={14} />
                                                    {post.is_featured ? 'Unfeature' : 'Feature'}
                                                </button>
                                                <button 
                                                    onClick={handleToggleLock}
                                                    className="flex items-center gap-2 text-xs text-yellow-500 hover:text-yellow-400 transition-colors font-primary uppercase tracking-wider"
                                                >
                                                    <Lock size={14} />
                                                    {post.is_locked ? 'Unlock' : 'Lock'}
                                                </button>
                                                <button 
                                                    onClick={handleDelete}
                                                    className="flex items-center gap-2 text-xs text-red-500 hover:text-red-400 transition-colors font-primary uppercase tracking-wider"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.article>

                        <motion.div variants={itemVariants}>
                            <CommentSection post={post} />
                        </motion.div>
                    </motion.div>
                </main>

                <ShareModal 
                    isOpen={isShareModalOpen} 
                    onClose={() => setIsShareModalOpen(false)} 
                    // @ts-ignore
                    url={route('forum.show', post.id)}
                    title={post.title}
                />

                <ConfirmationModal
                    isOpen={confirmModal.isOpen}
                    onClose={closeConfirmModal}
                    onConfirm={confirmModal.onConfirm}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    confirmText={confirmModal.confirmText}
                    isDestructive={confirmModal.isDestructive}
                />
            </div>
        </>
    );
}
