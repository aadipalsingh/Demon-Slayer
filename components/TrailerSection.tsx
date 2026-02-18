"use client";

import { useEffect, useRef, memo, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * TrailerSection — Large centered video container with modal.
 *
 * Animations:
 * 1. Container fades in + scales up on scroll (GSAP)
 * 2. Play button overlay with pulse glow
 * 3. Modal with expand animation when clicked (Framer Motion AnimatePresence)
 */
function TrailerSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in + scale up the video container on scroll
            gsap.fromTo(
                videoContainerRef.current,
                { opacity: 0, scale: 0.9, y: 40 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Animate Separator
            gsap.from(separatorRef.current, {
                scaleX: 0,
                opacity: 0,
                duration: 1.5,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);

    return (
        <section
            ref={sectionRef}
            id="trailer"
            className="section-base relative flex flex-col items-center justify-center min-h-[80vh]"
        >
            {/* Section header */}
            <div className="text-center mb-12 relative z-10">
                <span className="text-[#B11226] text-sm uppercase tracking-[0.2em] font-semibold">
                    Experience
                </span>
                <h2 className="font-['Cinzel'] text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                    The <span className="text-[#B11226]">Trailer</span>
                </h2>

                {/* Crimson Separator */}
                <div ref={separatorRef} className="crimson-separator" />
            </div>

            {/* Video container */}
            <div
                ref={videoContainerRef}
                className="relative w-full max-w-6xl aspect-video mx-auto px-4 md:px-0 group"
            >
                <div
                    className="relative w-full h-full rounded-[20px] overflow-hidden
                     bg-[#111115] border border-white/5
                     shadow-[0_0_60px_rgba(177,18,38,0.1)]
                     transition-shadow duration-500
                     group-hover:shadow-[0_0_80px_rgba(177,18,38,0.2)]"
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/wyiZWYMilgk?autoplay=1&mute=1&loop=1&playlist=wyiZWYMilgk&controls=0&modestbranding=1&rel=0"
                        title="Demon Slayer: Infinity Castle Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full object-cover"
                        style={{ border: "none" }}
                    />

                    {/* Interaction Shield (Pointer events pass through for controls, but we can add overlay if needed) */}
                    <div className="absolute inset-0 pointer-events-none rounded-[20px] border border-white/10" />
                </div>
            </div>
        </section>
    );
}

export default memo(TrailerSection);
