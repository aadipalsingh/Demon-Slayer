"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * BreathingSection — Cinematic Radial Layout
 * 
 * Features:
 * - Staggered GSAP Entrance
 * - Idle "Breathing" Pulse (Scale/Glow)
 * - Focus Interaction: Hover one dims others + Tints background
 * - Total Concentration Center Pulse
 */

interface BreathingStyle {
    name: string;
    kanji: string;
    color: string;
    description: string;
}

const BREATHING_STYLES: BreathingStyle[] = [
    { name: "Water", kanji: "水", color: "#4A90D9", description: "Flowing like a river, cutting through all resistance" },
    { name: "Flame", kanji: "炎", color: "#FF6A00", description: "The dance of flames that incinerates all evil" },
    { name: "Thunder", kanji: "雷", color: "#FFB800", description: "A single strike faster than the eye can follow" },
    { name: "Wind", kanji: "風", color: "#4ECDC4", description: "Savage gusts that tear through the darkness" },
    { name: "Stone", kanji: "岩", color: "#8A8A8A", description: "Immovable and indestructible as the earth itself" },
    { name: "Mist", kanji: "霞", color: "#B8C9E8", description: "Obscuring all senses, striking from the void" },
];

function BreathingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
    const separatorRef = useRef<HTMLDivElement>(null);

    // Track active hover for background tint
    const [hoveredStyle, setHoveredStyle] = useState<BreathingStyle | null>(null);

    // --- GSAP ANIMATION SETUP ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial State Setup
            gsap.set(nodesRef.current, { opacity: 0, scale: 0.8 });
            gsap.set(centerRef.current, { opacity: 0, scale: 0.5 });

            // 2. Scroll Reveal Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            });

            // Reveal Center
            tl.to(centerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out"
            })
                // Animate Separator
                .from(separatorRef.current, {
                    scaleX: 0,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, "-=0.8")
                // Reveal Outer Nodes
                .to(nodesRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.2)"
                }, "-=0.5");

            // 3. Idle Breathing Loop (Continuous)
            // Pulse the outer nodes slightly
            gsap.to(nodesRef.current, {
                scale: 1.03,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: {
                    each: 0.2, // Stagger the 'breath' so they don't pulse in unison
                    from: "random"
                }
            });

            // Pulse the center glowing ring
            gsap.to(".center-pulse-ring", {
                scale: 1.5,
                opacity: 0,
                duration: 4,
                repeat: -1,
                ease: "power1.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // --- HOVER INTERACTION HANDLERS ---
    const handleMouseEnter = (index: number, style: BreathingStyle) => {
        setHoveredStyle(style);

        // Enhance Active Node
        gsap.to(nodesRef.current[index], {
            scale: 1.15,
            opacity: 1,
            zIndex: 10,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Dim Peers
        nodesRef.current.forEach((node, i) => {
            if (i !== index && node) {
                gsap.to(node, {
                    scale: 0.9,
                    opacity: 0.3,
                    duration: 0.4,
                    overwrite: "auto"
                });
            }
        });
    };

    const handleMouseLeave = () => {
        setHoveredStyle(null);

        // Reset All Nodes
        nodesRef.current.forEach((node) => {
            if (node) {
                gsap.to(node, {
                    scale: 1, // Will be picked up by the idle loop eventually, but strictly return to 1 first
                    opacity: 1,
                    zIndex: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });

        // NOTE: The idle animation (gsap.to loop) might fight with this reset.
        // Ideally we pause idle on hover, resume on leave. 
        // For simplicity and "organic" feel, letting the idle loop continue on top of scale 1 is usually okay 
        // if the idle is subtle (1 -> 1.03). 
        // The hover scale (1.15) overpowers it. 
    };

    return (
        <section
            ref={sectionRef}
            id="breathing"
            className="section-base relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* --- CINEMATIC BACKGROUND TINT --- */}
            <div
                className="absolute inset-0 pointer-events-none transition-colors duration-1000 ease-in-out z-0"
                style={{
                    background: hoveredStyle
                        ? `radial-gradient(circle at 50% 50%, ${hoveredStyle.color}15 0%, transparent 60%)`
                        : `radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)`
                }}
            />

            {/* Section Header */}
            <div className="text-center relative z-10 px-4">
                <span className="text-[#FF6A00] text-sm uppercase tracking-[0.2em] font-semibold block mb-2">
                    Techniques
                </span>
                <h2 className="font-['Cinzel'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Breathing <span className="text-[#FF6A00]">Styles</span>
                </h2>
                <p
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        fontSize: "16px",
                        color: "#8A8A8A",
                        lineHeight: 1.7,
                        textAlign: "center",
                    }}
                >
                    Ancient sword techniques passed down through generations, each
                    channeling the power of nature itself.
                </p>
            </div>

            {/* Crimson Separator */}
            <div ref={separatorRef} className="crimson-separator" />

            {/* --- RADIAL INTERACTIVE CONTAINER --- */}
            <div
                ref={containerRef}
                className="relative w-[600px] h-[600px] mx-auto hidden md:block z-10"
            >
                {/* CENTER NODE: Total Concentration */}
                <div
                    ref={centerRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                >
                    {/* Pulse Ring */}
                    <div className="center-pulse-ring absolute inset-[-40px] border border-[#B11226]/30 rounded-full" />

                    {/* Inner Glow Aura */}
                    <div className="absolute inset-[-20px] bg-[#B11226]/10 blur-xl rounded-full" />

                    <div className="relative z-10 text-center">
                        <span className="block font-['Cinzel'] text-3xl font-bold text-[#B11226] drop-shadow-[0_0_15px_rgba(177,18,38,0.6)]">
                            全集中
                        </span>
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A] mt-2 font-semibold">
                            Total Concentration
                        </span>
                    </div>
                </div>

                {/* OUTER NODES */}
                {BREATHING_STYLES.map((style, i) => {
                    // Position Math
                    const angle = (i / BREATHING_STYLES.length) * 360 - 90;
                    const radius = 240;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;

                    return (
                        <div
                            key={style.name}
                            ref={(el) => { nodesRef.current[i] = el; }}
                            className="absolute cursor-pointer flex flex-col items-center group"
                            style={{
                                left: "50%",
                                top: "50%",
                                marginLeft: x,
                                marginTop: y,
                                transform: "translate(-50%, -50%)" // Centering the node itself
                            }}
                            onMouseEnter={() => handleMouseEnter(i, style)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Visual Circle */}
                            <div className="relative w-20 h-20 flex items-center justify-center transition-all duration-500">
                                {/* SVG Ring */}
                                <svg width="80" height="80" viewBox="0 0 80 80" className="absolute inset-0">
                                    <circle cx="40" cy="40" r="38" fill="none" stroke={style.color} strokeWidth="1" opacity="0.3" />
                                    {/* Hover Fill Animation */}
                                    <circle
                                        cx="40"
                                        cy="40"
                                        r="38"
                                        fill={style.color}
                                        fillOpacity="0"
                                        stroke={style.color}
                                        strokeWidth="2"
                                        strokeDasharray="240"
                                        strokeDashoffset="240"
                                        className="transition-all duration-700 ease-out group-hover:stroke-dashoffset-0 group-hover:fill-opacity-10"
                                    />
                                </svg>

                                {/* Kanji */}
                                <span
                                    className="text-2xl font-bold transition-all duration-300"
                                    style={{
                                        color: style.color,
                                        textShadow: hoveredStyle === style ? `0 0 20px ${style.color}` : "none"
                                    }}
                                >
                                    {style.kanji}
                                </span>
                            </div>

                            {/* Label */}
                            <span
                                className="mt-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
                                style={{ color: hoveredStyle === style ? "#fff" : style.color }}
                            >
                                {style.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Fallback - Simple Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4 px-6 mt-8 w-full max-w-sm">
                {BREATHING_STYLES.map((style) => (
                    <div
                        key={style.name}
                        className="glass rounded-xl p-4 text-center border border-white/5 active:scale-95 transition-transform"
                    >
                        <span className="text-2xl block mb-2" style={{ color: style.color }}>{style.kanji}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-white/70">{style.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default memo(BreathingSection);
