import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-8">
            {links.map((link, i) => (
                link.url ? (
                    <Link
                        key={i}
                        href={link.url}
                        preserveScroll
                        className={`px-4 py-2 text-xs font-primary border transition-colors ${
                            link.active 
                                ? 'bg-brand text-black border-brand' 
                                : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={i}
                        className="px-4 py-2 text-xs font-primary border border-white/5 text-zinc-600 cursor-not-allowed opacity-50"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}
