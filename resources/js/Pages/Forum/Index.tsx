import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../Components/Navbar';
import PostCard from '../../Components/Forum/PostCard';
import FlashMessage from '../../Components/FlashMessage';
import { Plus, Search, Filter, Pin, Megaphone, Star, Eye, EyeOff, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

export default function Index({ posts, featuredPosts, announcementPosts, categories, filters }: any) {
    const [showFeatured, setShowFeatured] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                <FlashMessage />
                
                <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto flex gap-8">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col md:flex-row gap-8 w-full"
                    >
                        {/* Sidebar */}
                        <motion.div 
                            variants={itemVariants} 
                            className={`w-full flex-shrink-0 space-y-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:w-64' : 'md:w-12'}`}
                        >
                            <Link 
                                // @ts-ignore
                                href={route('forum.create')}
                                className={`w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 hover:bg-brand transition-colors uppercase tracking-wider text-sm ${isSidebarOpen ? 'px-4' : 'px-0'}`}
                                title="Create Post"
                            >
                                <Plus size={16} /> 
                                <span className={`${!isSidebarOpen && 'md:hidden'} whitespace-nowrap`}>Create Post</span>
                            </Link>

                            <button 
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className={`w-full flex items-center justify-between bg-black/40 border border-white/10 p-3 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-white hover:border-white/30 transition-all ${!isSidebarOpen && 'md:justify-center'}`}
                                title="Toggle Filters"
                            >
                                <span className={`flex items-center gap-2 ${!isSidebarOpen && 'md:hidden'}`}>
                                    <SlidersHorizontal size={14} /> Filters & Options
                                </span>
                                {isSidebarOpen ? <ChevronUp size={14} /> : (
                                    <>
                                        <span className="md:hidden"><ChevronDown size={14} /></span>
                                        <span className="hidden md:block"><SlidersHorizontal size={14} /></span>
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="space-y-8 overflow-hidden"
                                    >
                                        <div className="bg-black/40 border border-white/10 p-4 mt-4">
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

                                        <div className="bg-black/40 border border-white/10 p-4">
                                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">View Options</h3>
                                            <button 
                                                onClick={() => setShowFeatured(!showFeatured)}
                                                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors w-full"
                                            >
                                                {showFeatured ? <EyeOff size={14} /> : <Eye size={14} />}
                                                {showFeatured ? 'Hide Featured' : 'Show Featured'}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div variants={containerVariants} className="flex-grow space-y-6">
                            {/* Search Bar */}
                            <motion.div variants={itemVariants} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search transmission..." 
                                    className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand transition-colors font-primary text-sm"
                                    defaultValue={filters.search}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            // @ts-ignore
                                            window.location = route('forum.index', { ...filters, search: e.currentTarget.value });
                                        }
                                    }}
                                />
                            </motion.div>

                            {/* Announcements Section */}
                            {showFeatured && announcementPosts && announcementPosts.length > 0 && (
                                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                                    <div className="flex items-center gap-2 text-yellow-500 text-xs font-headline uppercase tracking-widest mb-2">
                                        <Megaphone size={12} /> Announcements
                                    </div>
                                    {announcementPosts.map((post: any) => (
                                        <div key={post.id} className="border-l-2 border-yellow-500 pl-4">
                                            <PostCard post={post} />
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Featured Section */}
                            {showFeatured && featuredPosts && featuredPosts.length > 0 && (
                                <motion.div variants={itemVariants} className="space-y-4 mb-8">
                                    <div className="flex items-center gap-2 text-brand text-xs font-headline uppercase tracking-widest mb-2">
                                        <Star size={12} /> Featured Transmissions
                                    </div>
                                    {featuredPosts.map((post: any) => (
                                        <div key={post.id} className="border-l-2 border-brand pl-4">
                                            <PostCard post={post} />
                                        </div>
                                    ))}
                                    <div className="border-b border-white/10 my-8" />
                                </motion.div>
                            )}

                            <motion.div variants={containerVariants} className="space-y-4">
                                {posts.data.map((post: any) => (
                                    <motion.div key={post.id} variants={itemVariants}>
                                        <PostCard post={post} />
                                    </motion.div>
                                ))}
                                {posts.data.length === 0 && (
                                    <motion.div variants={itemVariants} className="text-center py-12 border border-white/10 border-dashed text-zinc-500 font-primary">
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
                                            className={`px-4 py-2 text-xs font-primary border ${link.active ? 'bg-brand text-black border-brand' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}
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
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
