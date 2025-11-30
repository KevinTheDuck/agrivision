import React from "react";
import { motion } from "framer-motion";
import {
    Database,
    MessageCircle,
    ArrowUpRight,
    FileJson,
    Users,
    Globe,
} from "lucide-react";

const discussions = [
    {
        user: "Sarah K.",
        topic: "Identification help: Yellowing on Tomato leaves",
        time: "2m ago",
        tag: "Question",
    },
    {
        user: "Dr. Aris",
        topic: "Published new dataset: Rice Blast V2",
        time: "15m ago",
        tag: "Release",
    },
    {
        user: "FarmTech",
        topic: "Model accuracy drops in low light?",
        time: "1h ago",
        tag: "Discussion",
    },
    {
        user: "GreenLab",
        topic: "Integration with drone imagery successful",
        time: "3h ago",
        tag: "Showcase",
    },
    {
        user: "J. Doe",
        topic: "Treatment for Early Blight organic?",
        time: "5h ago",
        tag: "Help",
    },
];

export default function Community() {
    return (
        <section
            id="forum"
            className="bg-background py-16 relative border-t border-white/10"
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-14">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tight mb-4">
                            Collective{" "}
                            <span className="text-green-500">
                                Intelligence.
                            </span>
                        </h2>
                        <p className="text-gray-400 max-w-md font-primary">
                            Access the world's largest open-source plant
                            pathology database and connect with experts
                            globally.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center font-primary gap-2 text-white hover:text-green-400 transition-colors uppercase text-xs font-bold tracking-widest border-b border-green-500 pb-1">
                        View All Discussions <ArrowUpRight size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-auto lg:h-[600px]">
                    <div className="md:col-span-2 lg:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] hover:border-green-500/30 transition-all duration-500">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent_50%)]" />

                        <div className="p-8 h-full flex flex-col justify-between relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-white/5 rounded-lg text-green-500">
                                    <Database size={32} />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase font-primary">
                                    Open Access
                                </span>
                            </div>

                            <div className="mt-12">
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-6xl font-bold font-headline text-white tracking-tighter">
                                        54
                                        <span className="text-green-500">
                                            K
                                        </span>
                                    </h3>
                                    <span className="text-xl text-zinc-500">
                                        +
                                    </span>
                                </div>
                                <p className="text-xl text-white font-medium mb-2 font-primary">
                                    Labeled Images
                                </p>
                                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-8 font-primary">
                                    High-resolution dataset covering 14 crop
                                    species and 26 diseases. Curated by
                                    universities and research centers worldwide.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="bg-white text-black px-6 py-3 rounded-lg font-primary font-bold text-sm hover:bg-green-400 transition-colors flex justify-center items-center gap-2">
                                        <FileJson size={16} /> Download JSON
                                    </button>
                                    <button className="bg-transparent border border-white/20 text-white font-primary px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/5 transition-colors">
                                        View Docs
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-20 pointer-events-none">
                            <div className="w-full h-full border-t border-l border-white/20 grid grid-cols-4 grid-rows-4">
                                {[...Array(16)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="border-r border-b border-white/20"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 lg:col-span-1 row-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col">
                        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3 mb-1">
                                <MessageCircle
                                    size={20}
                                    className="text-green-500"
                                />
                                <h3 className="text-white font-bold font-headline">
                                    Field Insights
                                </h3>
                            </div>
                            <p className="text-xs text-zinc-500 font-primary">
                                Live feed from the forum
                            </p>
                        </div>

                        <div className="relative flex-1 overflow-hidden p-4">
                            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

                            <motion.div
                                animate={{ y: [0, -200] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 15,
                                    ease: "linear",
                                    repeatType: "loop",
                                }}
                                className="space-y-4"
                            >
                                {[
                                    ...discussions,
                                    ...discussions,
                                    ...discussions,
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-green-500/30 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] text-green-400  bg-green-500/10 px-2 py-0.5 rounded-sm font-primary">
                                                {item.tag}
                                            </span>
                                            <span className="text-[10px] text-gray-600 font-primary">
                                                {item.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-200 font-medium mb-2 group-hover:text-green-400 transition-colors line-clamp-2 font-primary">
                                            {item.topic}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-zinc-700" />
                                            <span className="text-xs text-zinc-500 font-primary">
                                                {item.user}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="p-4 border-t border-white/10 bg-white/[0.02] text-center">
                            <button className="text-xs font-bold text-white hover:text-green-500 uppercase tracking-widest transition-colors font-primary">
                                Join Discussion
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-1 lg:col-span-1 bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 flex flex-col justify-center hover:bg-white/5 transition-colors group">
                        <Globe
                            className="text-gray-600 group-hover:text-white mb-4 transition-colors"
                            size={24}
                        />
                        <div className="text-3xl font-bold text-white mb-1 font-primary">
                            142
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-primary">
                            Countries Active
                        </div>
                    </div>

                    <div className="md:col-span-1 lg:col-span-1 bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 flex flex-col justify-center hover:bg-white/5 transition-colors group">
                        <Users
                            className="text-gray-600 group-hover:text-white mb-4 transition-colors"
                            size={24}
                        />
                        <div className="text-3xl font-bold text-white mb-1 font-primary">
                            12K
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-primary">
                            Researchers
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
