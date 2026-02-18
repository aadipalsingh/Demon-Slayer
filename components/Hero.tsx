"use client";

import { useEffect, useRef, memo, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero — 100vh cinematic opening section.
 *
 * Animation breakdown:
 * 1. Background slowly zooms in via GSAP scrub (parallax depth cue)
 * 2. Headline reveals with mask animation (clip-path wipe)
 * 3. Subtext fades up with slight delay
 * 4. Buttons scale in staggered
 * 5. Floating ember particles via CSS animation
 * 6. Scroll indicator bounces at the bottom
 */

/** Generate random ember particle styles for the floating effect */
function generateEmbers(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 20}%`,
        size: `${2 + Math.random() * 4}px`,
        duration: `${4 + Math.random() * 6}s`,
        delay: `${Math.random() * 5}s`,
        drift: `${-30 + Math.random() * 60}px`,
    }));
}

function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const btnsRef = useRef<HTMLDivElement>(null);

    // Memoize ember data so it doesn't regenerate on re-renders
    const embers = useMemo(() => generateEmbers(25), []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Slow zoom on the background image — creates cinematic depth
            gsap.fromTo(
                bgRef.current,
                { scale: 1 },
                {
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 2,
                    },
                }
            );

            // 2. Headline mask reveal — wipes in from left to right
            gsap.fromTo(
                headlineRef.current,
                { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 1,
                    duration: 1.5,
                    delay: 0.3,
                    ease: "power4.inOut",
                }
            );

            // 3. Subtext fade + slide up
            gsap.fromTo(
                subtextRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 1.0,
                    ease: "power3.out",
                }
            );

            // 4. Buttons scale in staggered
            if (btnsRef.current) {
                gsap.fromTo(
                    btnsRef.current.children,
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        delay: 1.4,
                        ease: "back.out(1.7)",
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert(); // Cleanup for strict mode
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        >
            {/* Background Video with Fallback */}
            <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/hero-bg.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video, though poster handles loading state */}
                    <Image
                        src="/hero-bg.jpg"
                        alt="Cinematic dark fantasy forest"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                </video>
            </div>

            {/* Dark gradient overlay */}
            <div className="gradient-overlay" />

            {/* Vignette effect */}
            <div className="vignette" />

            {/* Floating ember particles */}
            <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
                {embers.map((ember) => (
                    <span
                        key={ember.id}
                        className="ember"
                        style={{
                            left: ember.left,
                            bottom: ember.bottom,
                            width: ember.size,
                            height: ember.size,
                            ["--duration" as string]: ember.duration,
                            ["--delay" as string]: ember.delay,
                            ["--drift" as string]: ember.drift,
                        }}
                    />
                ))}
            </div>

            {/* Content layer */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                {/* Headline with cinematic glow */}
                <h1
                    ref={headlineRef}
                    className="font-['Cinzel'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                     font-bold leading-[1.1] mb-6 text-glow-crimson opacity-0"
                >
                    When Demons Rule the Night,
                    <br />
                    <span className="text-[#B11226]">One Boy Carries the Sun.</span>
                </h1>

                {/* Subtext */}
                <p
                    ref={subtextRef}
                    className="text-lg md:text-xl text-[#8A8A8A] max-w-4xl mx-auto mb-16 opacity-0 text-center"
                >
                    A cinematic journey through darkness, hope, and the unyielding flame
                    of the human spirit.
                </p>

                {/* CTA Buttons */}
                <div ref={btnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => scrollToSection("characters")}
                        className="btn-glow cursor-pointer"
                    >
                        Enter the World
                    </button>
                    <button
                        onClick={() => scrollToSection("trailer")}
                        className="btn-outline cursor-pointer"
                    >
                        Watch Trailer
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                        Scroll
                    </span>
                    <svg
                        width="20"
                        height="30"
                        viewBox="0 0 20 30"
                        fill="none"
                        className="stroke-[#8A8A8A]"
                    >
                        <rect x="1" y="1" width="18" height="28" rx="9" strokeWidth="2" />
                        <circle cx="10" cy="10" r="2" fill="#B11226">
                            <animate
                                attributeName="cy"
                                values="10;20;10"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </svg>
                </div>
            </div>
        </section>
    );
}

export default memo(Hero);
