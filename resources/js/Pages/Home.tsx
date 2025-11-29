import React from "react";
import { Head } from "@inertiajs/react";
import Scroll from "../Components/Scroll.js";
import Navbar from "../Components/Navbar.js";
import Hero from "../Components/Hero.js";

interface Props {
    title: string;
}

export default function Home({ title }: Props) {
    return (
        <>
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
                </main>
            </Scroll>
        </>
    );
}
