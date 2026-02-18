import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorldSection from "@/components/WorldSection";
import CharactersSection from "@/components/CharactersSection";
import BreathingSection from "@/components/BreathingSection";
import TrailerSection from "@/components/TrailerSection";
import TimelineSection from "@/components/TimelineSection";
import MangaSection from "@/components/MangaSection";
import ImpactSection from "@/components/ImpactSection";
import FinalCTA from "@/components/FinalCTA";

/**
 * Home page — Assembles all cinematic sections in order.
 *
 * Each section is a self-contained component that handles its own
 * scroll-triggered animations via GSAP and Framer Motion.
 * Lenis smooth scroll is initialized in the layout.tsx.
 */
export default function Home() {
    return (
        <main className="relative overflow-x-hidden">
            <Navbar />
            <Hero />
            <WorldSection />
            <CharactersSection />
            <BreathingSection />
            <TrailerSection />
            <TimelineSection />
            <MangaSection />
            <ImpactSection />
            <FinalCTA />
        </main>
    );
}
