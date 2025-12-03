import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import Dither from "./Dither";

export default function Hero() {
    const { auth } = usePage().props as any;
    const [scrollOpacity, setScrollOpacity] = React.useState(1);

    React.useEffect(() => {
        const handleScroll = () => {
            const maxFadeDistance = 200;
            const scrollY = window.scrollY;

            const opacity = Math.max(0, 1 - scrollY / maxFadeDistance);

            setScrollOpacity(opacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-50">
                <Dither
                    waveSpeed={0.02}
                    waveFrequency={4.5}
                    waveAmplitude={0.3}
                    enableMouseInteraction={false}
                    colorNum={4}
                    pixelSize={2}
                    waveColor={[0.5, 0.5, 0.5]}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs uppercase tracking-widest text-foreground font-medium font-primary">
                            Next Gen Plant Health
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter mb-8 leading-[0.9] font-headline">
                        Cultivating <br />
                        Intelligence.
                    </h1>

                    <p className="text-lg md:text-base text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light font-primary">
                        {
                            "Advanced machine learning models for real-time plant disease detection. Join the community of researchers and farmers preserving the future of agriculture."
                        }
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mb-28">
                        <Link 
                            href={auth.user ? route('forum.index') : route('login')}
                            className="group relative px-8 py-4 bg-foreground text-background text-sm font-headline font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:bg-brand inline-block"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Analysis <ArrowRight size={16} />
                            </span>
                        </Link>
                        <Link 
                            href={route('forum.index')}
                            className="px-8 py-4 bg-transparent border border-white/20 text-foreground font-headline text-sm font-bold uppercase tracking-wider hover:bg-white/5 rounded-sm transition-colors inline-block"
                        >
                            View Community
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ opacity: scrollOpacity }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center select-none pointer-events-none"
                    style={{ opacity: scrollOpacity }}
                >
                    <motion.div
                        animate={{ y: [0, 6, 0], opacity: [1, 0.7, 1] }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="mt-3 text-white/70"
                    >
                        <ChevronDown size={28} strokeWidth={1.5} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
