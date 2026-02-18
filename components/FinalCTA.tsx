"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * FinalCTA — Full-width closing section.
 *
 * "Will You Step Into the Night?" headline with a large glowing CTA button.
 * Background dramatically fades to solid black.
 */
const FinalCTA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonContainerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });

            // 0. Background fade to solid black (scrubbed)
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 50%",
                        end: "bottom bottom",
                        scrub: true,
                    },
                }
            );

            // 1. Staggered Content Reveal
            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            )
                .fromTo(
                    headlineRef.current,
                    { opacity: 0, scale: 0.95, textShadow: "0 0 0px rgba(177,18,38,0)" },
                    {
                        opacity: 1,
                        scale: 1,
                        textShadow: "0 0 30px rgba(177,18,38,0.3)",
                        duration: 1.4,
                        ease: "power2.out",
                    },
                    "-=0.6"
                )
                .fromTo(
                    textRef.current,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                    "-=1"
                )
                .fromTo(
                    buttonContainerRef.current,
                    { opacity: 0, scale: 0.9, y: 10 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" },
                    "-=0.8"
                )
                .fromTo(
                    footerRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1.5 },
                    "-=0.5"
                );

            // 2. Ambient Glow Pulse
            gsap.to(glowRef.current, {
                opacity: 0.15,
                scale: 1.2,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            id="final"
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* 1. Subtle Radial Gradient (Center Highlight) */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at center, #1a0505 0%, #000000 70%)",
                    }}
                />

                {/* 2. Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] animate-noise pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url('/noise.png')` }} // Assuming generic noise or just CSS noise
                ></div>

                {/* 3. Red Aura Glow (Center) */}
                <div
                    ref={glowRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[800px] h-[800px] rounded-full bg-[#B11226] blur-[150px] opacity-10"
                />

                {/* 4. Floating Embers (Atmosphere) */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="ember"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll-triggered Fade to Black Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black pointer-events-none z-1"
            />

            {/* Content Container */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-[#B11226] text-sm md:text-base uppercase tracking-[0.4em] font-semibold mb-8 opacity-0"
                >
                    The Choice Is Yours
                </p>

                {/* Headline */}
                <h2
                    ref={headlineRef}
                    className="font-['Cinzel'] text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-10
                     text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60
                     drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0"
                >
                    Will You Step
                    <br />
                    <span className="text-[#B11226] drop-shadow-[0_0_25px_rgba(177,18,38,0.5)]">
                        Into The Night?
                    </span>
                </h2>

                {/* Description - Explicitly Centered */}
                <div className="flex justify-center w-full mb-16">
                    <p
                        ref={textRef}
                        className="text-lg md:text-xl text-[#8A8A8A] max-w-2xl text-center opacity-0 font-light leading-relaxed"
                    >
                        The battle between light and darkness rages on. Every warrior must
                        choose their path. What will yours be?
                    </p>
                </div>

                {/* Premium CTA Button */}
                <div ref={buttonContainerRef} className="opacity-0">
                    <button
                        onClick={scrollToTop}
                        className="group relative inline-flex items-center justify-center
                         px-20 py-6 text-lg font-['Cinzel'] font-bold tracking-[0.25em]
                         uppercase text-[#F2F2F2] rounded-full overflow-hidden
                         bg-gradient-to-br from-[#B11226] to-[#FF6A00]
                         transition-all duration-700
                         hover:scale-105 hover:shadow-[0_0_80px_rgba(177,18,38,0.8)]
                         cursor-pointer
                         border border-white/10"
                    >
                        {/* Internal Glow */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                            transition-opacity duration-500
                            bg-gradient-to-t from-black/20 to-transparent" />

                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            Begin Your Journey
                        </span>
                    </button>
                </div>

                {/* Footer / Tech Stack */}
                <div ref={footerRef} className="mt-24 space-y-3 opacity-0">
                    <div className="w-px h-12 bg-gradient-to-b from-[#B11226] to-transparent mx-auto mb-6 opacity-30" />
                    <p className="text-[10px] text-[#8A8A8A]/30 uppercase tracking-[0.3em]">
                        Cinematic Experience
                    </p>
                    <p className="text-[10px] text-[#8A8A8A]/10 font-['Sora'] tracking-widest">
                        DESIGNED WITH PASSION
                    </p>
                </div>
            </div>

            {/* Bottom Fade Out */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
        </section>
    );
}

export default memo(FinalCTA);
