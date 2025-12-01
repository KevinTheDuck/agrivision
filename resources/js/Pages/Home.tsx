import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Scroll from "../Components/Scroll.js";
import Navbar from "../Components/Navbar.js";
import Hero from "../Components/Hero.js";
import Feature from "../Components/Feature.js";
import Intro from "../Components/Intro.js";
import Scanner from "../Components/Scanner.js";
import Database from "../Components/Database.js";
import Footer from "../Components/Footer.js";

interface Props {
    title: string;
}

export default function Home({ title }: Props) {
    const [introFinished, setIntroFinished] = useState(false);
    return (
        <>
            {!introFinished && (
                <Intro onComplete={() => setIntroFinished(true)} />
            )}

            <Head title={title || "Home"} />
            <Scroll>
                <main
                    className="
                    bg-background
                    text-foreground
                    min-h-screen
                    selection:bg-selectionBg
                    selection:text-selectionText"
                >
                    <Navbar />
                    <Hero />
                    <Feature />
                    <Scanner />
                    <Database />
                    <Footer />
                </main>
            </Scroll>
        </>
    );
}
