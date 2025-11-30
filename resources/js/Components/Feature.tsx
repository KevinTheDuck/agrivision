import React from "react";
import { motion } from "framer-motion";
import { ScanSearch, UploadCloud, MessageSquare } from "lucide-react";

const steps = [
    {
        icon: UploadCloud,
        title: "Upload Sample",
        desc: "Capture or upload high-resolution images of affected plant leaves directly from the field.",
    },
    {
        icon: ScanSearch,
        title: "AI Diagnosis",
        desc: "Our neural networks analyze patterns at pixel-level depth to identify pathogens instantly.",
    },
    {
        icon: MessageSquare,
        title: "Expert Review",
        desc: "Share findings with the community forum for secondary validation and treatment advice.",
    },
];

export default function Features() {
    return (
        <section
            id="detection"
            className="bg-black py-32 relative border-t border-white/10"
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter mb-4">
                            Precision{" "}
                            <span className="text-green-500">Agriculture</span>
                            <br />
                            Meet Deep Learning.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className={`group relative p-12 border-b md:border-b-0 border-white/10 hover:bg-white/5 transition-colors duration-500 ${
                                index !== steps.length - 1 ? "md:border-r" : ""
                            }`}
                        >
                            <div className="absolute font-primary top-6 right-6 text-white/10 text-6xl font-black select-none group-hover:text-green-900/20 transition-colors">
                                0{index + 1}
                            </div>

                            <div className="mb-8 p-4 bg-white/5 w-fit  rounded-sm group-hover:bg-green-500 group-hover:text-black transition-colors duration-300">
                                <step.icon size={28} />
                            </div>

                            <h3 className="text-2xl font-bold text-white font-headline mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                {step.title}
                            </h3>
                            <p className="text-zinc-500 font-primary leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
