import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '../../Components/Navbar';
import PostCard from '../../Components/Forum/PostCard';
import { Plus, Search, Filter } from 'lucide-react';

export default function Index({ posts, categories, filters }: any) {
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
            <Head title="Forum" />
            <div className="min-h-screen bg-background text-foreground font-primary selection:bg-brand selection:text-black">
                <Navbar />
                
                <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col md:flex-row gap-8"
                    >
                        {/* Sidebar */}
                        <motion.div variants={itemVariants} className="w-full md:w-64 flex-shrink-0 space-y-8">
                            <Link 
                                // @ts-ignore
                                href={route('forum.create')}
                                className="w-full flex items-center justify-center gap-2 bg-brand text-black font-bold py-3 px-4 hover:bg-white transition-colors uppercase tracking-wider text-sm"
                            >
                                <Plus size={16} /> Create Post
                            </Link>

                            <div className="bg-black/40 border border-white/10 p-4">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Filter size={12} /> Categories
                                </h3>
                                <div className="space-y-2">
                                    <Link 
                                        // @ts-ignore
                                        href={route('forum.index')}
                                        className={`block text-sm hover:text-brand transition-colors ${!filters.category ? 'text-brand font-bold' : 'text-zinc-400'}`}
                                    >
                                        All Categories
                                    </Link>
                                    {categories.map((cat: any) => (
                                        <Link 
                                            key={cat.id}
                                            // @ts-ignore
                                            href={route('forum.index', { category: cat.slug })}
                                            className={`block text-sm hover:text-brand transition-colors ${filters.category === cat.slug ? 'text-brand font-bold' : 'text-zinc-400'}`}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/10 p-4">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Sort By</h3>
                                <div className="space-y-2">
                                    <Link 
                                        // @ts-ignore
                                        href={route('forum.index', { ...filters, sort: 'newest' })}
                                        className={`block text-sm hover:text-brand transition-colors ${filters.sort !== 'best' ? 'text-brand font-bold' : 'text-zinc-400'}`}
                                    >
                                        Newest
                                    </Link>
                                    <Link 
                                        // @ts-ignore
                                        href={route('forum.index', { ...filters, sort: 'best' })}
                                        className={`block text-sm hover:text-brand transition-colors ${filters.sort === 'best' ? 'text-brand font-bold' : 'text-zinc-400'}`}
                                    >
                                        Top Rated
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div variants={containerVariants} className="flex-grow space-y-6">
                            {/* Search Bar */}
                            <motion.div variants={itemVariants} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search transmission..." 
                                    className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand transition-colors font-mono text-sm"
                                    defaultValue={filters.search}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            // @ts-ignore
                                            window.location = route('forum.index', { ...filters, search: e.currentTarget.value });
                                        }
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={containerVariants} className="space-y-4">
                                {posts.data.map((post: any) => (
                                    <motion.div key={post.id} variants={itemVariants}>
                                        <PostCard post={post} />
                                    </motion.div>
                                ))}
                                {posts.data.length === 0 && (
                                    <motion.div variants={itemVariants} className="text-center py-12 border border-white/10 border-dashed text-zinc-500 font-mono">
                                        No transmissions found.
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 mt-8">
                                {posts.links.map((link: any, i: number) => (
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`px-4 py-2 text-xs font-mono border ${link.active ? 'bg-brand text-black border-brand' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={i}
                                            className="px-4 py-2 text-xs font-mono border border-white/5 text-zinc-600 cursor-not-allowed opacity-50"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
