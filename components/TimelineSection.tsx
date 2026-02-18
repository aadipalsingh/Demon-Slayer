"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * TimelineSection — Horizontal scroll section.
 *
 * Uses GSAP's pin + horizontal scroll technique:
 * The section is pinned in place while the content scrolls horizontally.
 * A timeline line animates from left to right as the user scrolls.
 */

interface TimelineItem {
    title: string;
    year: string;
    description: string;
    image: string;
    type: "season" | "movie";
}

const TIMELINE_ITEMS: TimelineItem[] = [
    {
        title: "Season 1: Unwavering Resolve",
        year: "2019",
        description:
            "Tanjiro's journey begins. After his family is slaughtered by demons and his sister Nezuko is turned, he vows to find a cure and avenge his family.",
        image: "/timeline/season-1.jpg",
        type: "season",
    },
    {
        title: "Mugen Train",
        year: "2020",
        description:
            "The highest-grossing anime film of all time. Tanjiro boards the Mugen Train alongside the Flame Hashira, Rengoku, to face an Upper Moon demon.",
        image: "/timeline/mugen-train.jpg",
        type: "movie",
    },
    {
        title: "Season 2: Entertainment District",
        year: "2022",
        description:
            "The battle moves underground as Tanjiro and the Sound Hashira Uzui infiltrate the Entertainment District to hunt Upper Moon Six.",
        image: "/timeline/season-2.jpg",
        type: "season",
    },
    {
        title: "Season 3: Swordsmith Village",
        year: "2023",
        description:
            "Ancient secrets are revealed in the hidden Swordsmith Village as two Upper Moons launch a devastating assault on the Demon Slayers' source of power.",
        image: "/timeline/season-3.jpeg",
        type: "season",
    },
    {
        title: "Season 4: Hashira Training",
        year: "2024",
        description:
            "The final preparation begins. The Hashira train the Demon Slayers to unlock their marks and prepare for the ultimate battle against Muzan.",
        image: "/timeline/season-4.jpeg",
        type: "season",
    },
    {
        title: "Infinity Castle",
        year: "2025",
        description:
            "The final trilogy begins. The Demon Slayers plunge into the Infinity Castle for the decisive war against Kibutsuji Muzan and his remaining Upper Moons.",
        image: "/timeline/infinity-castle.jpg",
        type: "movie",
    },
];

function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !scrollContentRef.current || !lineRef.current)
                return;

            const scrollWidth =
                scrollContentRef.current.scrollWidth - containerRef.current.clientWidth;

            // Pin the section and scroll content horizontally
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // Move content to the left (horizontal scroll)
            tl.to(scrollContentRef.current, {
                x: -scrollWidth,
                ease: "none",
            });

            // Animate the timeline line width from 0 to full
            tl.fromTo(
                lineRef.current,
                { width: "0%" },
                { width: "100%", ease: "none" },
                0 // Same time as horizontal scroll
            );

            // Animate Crimson Separator (Header)
            gsap.from(separatorRef.current, {
                scaleX: 0,
                opacity: 0,
                duration: 1.5,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="timeline"
            className="section-base relative" style={{ overflow: 'visible' }}
        >
            {/* Section header — positioned above the pinned area */}
            <div className="text-center px-6">
                <span className="text-[#B11226] text-sm uppercase tracking-[0.2em] font-semibold">
                    Journey
                </span>
                <h2 className="font-['Cinzel'] text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                    The <span className="text-[#B11226]">Timeline</span>
                </h2>
            </div>

            {/* Crimson Separator */}
            <div ref={separatorRef} className="crimson-separator" />

            {/* Horizontal scroll container */}
            <div ref={containerRef} className="relative overflow-hidden" style={{ overflow: 'clip' }}>
                {/* Timeline line — animates left to right */}
                <div className="absolute top-1/2 left-0 h-[2px] bg-[#B11226]/20 w-full z-0">
                    <div
                        ref={lineRef}
                        className="h-full bg-gradient-to-r from-[#B11226] to-[#FF6A00]"
                        style={{
                            width: "0%",
                            boxShadow: "0 0 20px rgba(177, 18, 38, 0.5)",
                        }}
                    />
                </div>

                {/* Scrollable content */}
                <div
                    ref={scrollContentRef}
                    className="horizontal-scroll-container items-center min-h-[70vh]"
                >
                    {TIMELINE_ITEMS.map((item, i) => (
                        <div
                            key={item.title}
                            className={`timeline-card flex-shrink-0 w-[350px] md:w-[420px]
                         ${i % 2 === 0 ? "self-start mt-20" : "self-end mb-20"}`}
                        >
                            {/* Year marker */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-4 h-4 rounded-full bg-[#B11226]"
                                    style={{
                                        boxShadow: "0 0 15px rgba(177, 18, 38, 0.6)",
                                    }}
                                />
                                <span className="font-['Cinzel'] text-2xl font-bold text-[#B11226]">
                                    {item.year}
                                </span>
                                <span
                                    className={`text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full
                    ${item.type === "movie"
                                            ? "bg-[#FF6A00]/10 text-[#FF6A00]"
                                            : "bg-[#B11226]/10 text-[#B11226]"
                                        }`}
                                >
                                    {item.type}
                                </span>
                            </div>

                            {/* Card */}
                            <div
                                className="rounded-[20px] overflow-hidden bg-[#111115] border border-white/5
                           card-glow group"
                            >
                                {/* Poster image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="420px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent" />
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <h3 className="font-['Cinzel'] text-lg font-bold mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[#8A8A8A] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default memo(TimelineSection);
