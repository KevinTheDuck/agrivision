import React, { useState } from 'react';
import { useForm, usePage, Link, router } from '@inertiajs/react';
import VoteControl from './VoteControl';
import { MessageSquare, CornerDownRight, Shield, Trash2, Pin, CheckCircle } from 'lucide-react';

interface CommentProps {
    comment: any;
    postId: number;
    postAuthorId: number;
    depth?: number;
    isLocked?: boolean;
}

function CommentItem({ comment, postId, postAuthorId, depth = 0, isLocked = false }: CommentProps) {
    const [replying, setReplying] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        post_id: postId,
        parent_id: comment.id,
        body: '',
    });
    const { auth } = usePage<any>().props;

    const submitReply = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        post(route('comments.store'), {
            onSuccess: () => {
                setReplying(false);
                reset();
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this comment?')) {
            // @ts-ignore
            router.delete(route('comments.destroy', comment.id));
        }
    };

    const handlePin = () => {
        // @ts-ignore
        router.post(route('comments.togglePin', comment.id));
    };

    const isAuthor = comment.user_id === postAuthorId;
    const isModerator = auth.user && (auth.user.role === 'moderator' || auth.user.role === 'admin');
    const isCommenter = auth.user && auth.user.id === comment.user_id;
    const isCommenterMod = comment.user.role === 'moderator' || comment.user.role === 'admin';

    return (
        <div className={`mt-4 ${depth > 0 ? 'ml-8 border-l border-white/10 pl-4' : ''} ${comment.is_pinned ? 'bg-brand/5 border border-brand/20 p-4 rounded' : ''}`}>
            {comment.is_pinned && (
                <div className="flex items-center gap-2 text-brand text-[10px] font-primary uppercase tracking-widest mb-2">
                    <Pin size={10} /> Pinned Transmission
                </div>
            )}
            <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                    <VoteControl id={comment.id} type="comment" score={comment.score} userVote={comment.user_vote} />
                </div>
                <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1 font-primary">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                            {comment.user.avatar ? (
                                <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-[10px]">
                                    {comment.user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <Link 
                            // @ts-ignore
                            href={route('profile.show', comment.user.id)}
                            className={`font-bold hover:underline flex items-center gap-1 ${isAuthor ? 'text-brand' : 'text-white'}`}
                        >
                            {comment.user.name}
                            {isCommenterMod && <Shield size={10} className="text-green-500" />}
                            {comment.user.is_expert && <CheckCircle size={10} className="text-blue-500" />}
                        </Link>
                        {isAuthor && <span className="bg-brand/10 text-brand px-1 rounded text-[10px] uppercase border border-brand/20">AUTHOR</span>}
                        {isCommenterMod && <span className="bg-green-500/10 text-green-500 px-1 rounded text-[10px] uppercase border border-green-500/20">MOD</span>}
                        <span>•</span>
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="text-zinc-300 text-sm mb-2 font-primary pl-8">
                        {comment.body}
                    </div>

                    <div className="flex items-center gap-4 pl-8">
                        {!isLocked && (
                            <button 
                                onClick={() => setReplying(!replying)}
                                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 font-primary uppercase tracking-wider"
                            >
                                <MessageSquare size={12} /> Reply
                            </button>
                        )}
                        
                        {(isModerator || isCommenter) && (
                            <button 
                                onClick={handleDelete}
                                className="text-xs text-red-500/50 hover:text-red-500 flex items-center gap-1 font-primary uppercase tracking-wider"
                            >
                                <Trash2 size={12} /> Delete
                            </button>
                        )}

                        {isModerator && depth === 0 && (
                            <button 
                                onClick={handlePin}
                                className={`text-xs flex items-center gap-1 font-primary uppercase tracking-wider ${comment.is_pinned ? 'text-brand hover:text-brand/80' : 'text-zinc-500 hover:text-white'}`}
                            >
                                <Pin size={12} /> {comment.is_pinned ? 'Unpin' : 'Pin'}
                            </button>
                        )}
                    </div>

                    {replying && (
                        <form onSubmit={submitReply} className="mt-4 mb-4">
                            <textarea
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-brand font-primary"
                                placeholder="Write a reply..."
                                rows={3}
                            />
                            <div className="flex justify-end mt-2 gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setReplying(false)}
                                    className="text-xs text-zinc-500 hover:text-white font-primary uppercase"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-brand text-black px-3 py-1 text-xs font-bold uppercase hover:bg-white transition-colors"
                                >
                                    Reply
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {comment.replies && comment.replies.map((reply: any) => (
                <CommentItem key={reply.id} comment={reply} postId={postId} postAuthorId={postAuthorId} depth={depth + 1} isLocked={isLocked} />
            ))}
        </div>
    );
}

export default function CommentSection({ post }: { post: any }) {
    const { auth } = usePage<any>().props;
    const isModerator = auth.user && (auth.user.role === 'moderator' || auth.user.role === 'admin');

    const { data, setData, post: submitPost, processing, reset } = useForm({
        post_id: post.id,
        parent_id: null,
        body: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        submitPost(route('comments.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="mt-12">
            <h3 className="text-xl font-headline font-bold text-white mb-6 flex items-center gap-2">
                <CornerDownRight className="text-brand" />
                TRANSMISSIONS ({post.comments.length})
            </h3>

            {post.is_locked && !isModerator ? (
                <div className="mb-12 p-4 border border-red-500/30 bg-red-500/10 text-red-400 font-primary text-sm flex items-center gap-2">
                    <Shield size={16} />
                    This transmission has been locked by a moderator. No further comments are allowed.
                </div>
            ) : (
                <form onSubmit={submit} className="mb-12">
                    <textarea
                        value={data.body}
                        onChange={e => setData('body', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand font-primary"
                        placeholder={post.is_locked ? "Write a moderator note..." : "Add to the transmission..."}
                        rows={4}
                    />
                    <div className="flex justify-end mt-2">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-brand text-black px-6 py-2 font-bold uppercase hover:bg-white transition-colors text-sm"
                        >
                            {post.is_locked ? "Post Mod Note" : "Post Comment"}
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {post.comments.filter((c: any) => !c.parent_id).map((comment: any) => (
                    <CommentItem key={comment.id} comment={comment} postId={post.id} postAuthorId={post.user_id} isLocked={post.is_locked} />
                ))}
            </div>
        </div>
    );
}
