"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * WorldSection — Full-screen cinematic video background with vintage gradients.
 *
 * Redesign:
 * - Removed 2-column layout.
 * - Video now covers the entire section.
 * - Text floats on the left with a strong "vintage blackish" gradient for readability.
 */
function WorldSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const moonRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in text content from the left
            gsap.fromTo(
                textRef.current,
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
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
                transformOrigin: "left",
                duration: 1.5,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Background darkens as user scrolls through this section
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                {
                    opacity: 0.8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 50%",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );

            // Moon rising effect — subtle vertical movement
            gsap.fromTo(
                moonRef.current,
                { y: 100, opacity: 0 },
                {
                    y: -50,
                    opacity: 0.6,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="world"
            className="section-base relative min-h-screen flex items-center"
        >
            {/* Background Video Layer - Full Screen */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
                >
                    <source src="/world-video.mp4" type="video/mp4" />
                </video>

                {/* Vintage Gradient Overlay (Left-focused for text readability) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
            </div>

            {/* Dynamic Darkening Overlay (scroll-linked) */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black pointer-events-none z-20 opacity-0"
            />

            {/* Moon rising effect */}
            <div
                ref={moonRef}
                className="absolute top-20 right-[10%] w-32 h-32 rounded-full opacity-0 z-0
                   bg-gradient-radial from-[#B11226]/20 via-[#FF6A00]/10 to-transparent
                   blur-2xl"
                style={{
                    background:
                        "radial-gradient(circle, rgba(177,18,38,0.3) 0%, rgba(255,106,0,0.1) 40%, transparent 70%)",
                }}
            />

            {/* Content Container - Single Column Left */}
            <div
                className="relative z-30 w-full"
                style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}
            >
                <div ref={textRef} className="space-y-8 max-w-2xl">
                    <span className="text-[#B11226] text-sm uppercase tracking-[0.3em] font-semibold drop-shadow-md block mb-2">
                        The World
                    </span>
                    <h2 className="font-['Cinzel'] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] drop-shadow-2xl">
                        A World Consumed
                        <br />
                        <span className="text-white text-shadow-glow">By Darkness</span>
                    </h2>

                    {/* Crimson Separator */}
                    <div ref={separatorRef} className="crimson-separator !mx-0" />

                    <p className="text-gray-200 text-lg leading-relaxed drop-shadow-lg font-medium">
                        In the Taisho era of Japan, an ancient evil lurks beneath the
                        moonlight. Demons roam the wilderness, preying on the innocent.
                        Only the Demon Slayer Corps — a secret society of swordsmen —
                        stands between humanity and annihilation.
                    </p>
                    <p className="text-gray-300 leading-relaxed font-light drop-shadow-md">
                        This is a world where every night could be your last, where the
                        boundary between life and death is thinner than a blade&apos;s edge,
                        and where hope burns brightest in the deepest darkness.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default memo(WorldSection);
