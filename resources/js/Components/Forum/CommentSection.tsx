import React, { useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import VoteControl from './VoteControl';
import { MessageSquare, CornerDownRight } from 'lucide-react';

interface CommentProps {
    comment: any;
    postId: number;
    postAuthorId: number;
    depth?: number;
}

function CommentItem({ comment, postId, postAuthorId, depth = 0 }: CommentProps) {
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

    const isAuthor = comment.user_id === postAuthorId;

    return (
        <div className={`mt-4 ${depth > 0 ? 'ml-8 border-l border-white/10 pl-4' : ''}`}>
            <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                    <VoteControl id={comment.id} type="comment" score={comment.score} userVote={comment.user_vote} />
                </div>
                <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1 font-mono">
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
                            className={`font-bold hover:underline ${isAuthor ? 'text-brand' : 'text-white'}`}
                        >
                            {comment.user.name}
                        </Link>
                        {isAuthor && <span className="bg-brand/10 text-brand px-1 rounded text-[10px] uppercase border border-brand/20">AUTHOR</span>}
                        <span>•</span>
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="text-zinc-300 text-sm mb-2 font-primary pl-8">
                        {comment.body}
                    </div>

                    <button 
                        onClick={() => setReplying(!replying)}
                        className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 font-mono uppercase tracking-wider pl-8"
                    >
                        <MessageSquare size={12} /> Reply
                    </button>

                    {replying && (
                        <form onSubmit={submitReply} className="mt-4 mb-4">
                            <textarea
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-brand font-mono"
                                placeholder="Write a reply..."
                                rows={3}
                            />
                            <div className="flex justify-end mt-2 gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setReplying(false)}
                                    className="text-xs text-zinc-500 hover:text-white font-mono uppercase"
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
                <CommentItem key={reply.id} comment={reply} postId={postId} postAuthorId={postAuthorId} depth={depth + 1} />
            ))}
        </div>
    );
}

export default function CommentSection({ post }: { post: any }) {
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

            <form onSubmit={submit} className="mb-12">
                <textarea
                    value={data.body}
                    onChange={e => setData('body', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand font-mono text-sm"
                    placeholder="Broadcast your thoughts..."
                    rows={4}
                />
                <div className="flex justify-end mt-2">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="bg-brand text-black font-bold py-2 px-6 hover:bg-white transition-colors uppercase tracking-wider text-xs"
                    >
                        Send Transmission
                    </button>
                </div>
            </form>

            <div className="space-y-8">
                {post.comments.map((comment: any) => (
                    <CommentItem key={comment.id} comment={comment} postId={post.id} postAuthorId={post.user_id} />
                ))}
            </div>
        </div>
    );
}
