import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { router } from '@inertiajs/react';

interface VoteControlProps {
    id: number;
    type: 'post' | 'comment';
    score: number;
    userVote: number; // 1, -1, or 0
}

export default function VoteControl({ id, type, score, userVote }: VoteControlProps) {
    const handleVote = (value: number) => {
        const routeName = type === 'post' ? 'forum.vote' : 'comments.vote';
        // @ts-ignore
        router.post(route(routeName, id), { value }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="flex flex-col items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
            <button 
                onClick={() => handleVote(1)}
                className={`p-1 rounded hover:bg-white/10 transition-colors ${userVote === 1 ? 'text-brand' : 'text-zinc-500'}`}
            >
                <ChevronUp size={20} />
            </button>
            <span className={`text-sm font-mono font-bold ${userVote !== 0 ? 'text-brand' : 'text-zinc-400'}`}>
                {score}
            </span>
            <button 
                onClick={() => handleVote(-1)}
                className={`p-1 rounded hover:bg-white/10 transition-colors ${userVote === -1 ? 'text-red-500' : 'text-zinc-500'}`}
            >
                <ChevronDown size={20} />
            </button>
        </div>
    );
}
