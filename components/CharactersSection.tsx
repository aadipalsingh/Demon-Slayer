"use client";

import { useEffect, useRef, memo, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * CharactersSection — Premium character showcase with 8 warriors.
 *
 * Features:
 * - 8 characters in two rows of 4
 * - Heavy GSAP scroll-driven entrance animations (staggered, rotated, scaled)
 * - Premium glassmorphism card containers with animated glow borders
 * - 3D tilt on hover with parallax image shift
 * - Character-themed color glow on hover
 * - Expandable card overlay with character details on click
 * - Animated section header with crimson line wipe
 * - Floating particle effects per character color
 */

interface CharacterData {
    name: string;
    title: string;
    tagline: string;
    image: string;
    background: string;
    color: string;
    secondaryColor: string;
    rank: string;
}

const CHARACTERS: CharacterData[] = [
    {
        name: "Tanjiro Kamado",
        title: "Sun Breather",
        tagline: "The boy who carries the sun within his blade — a gentle soul forged in fire.",
        image: "/characters/tanjiro.png",
        background: "/backgrounds/bg_tanjiro.png",
        color: "#B11226",
        secondaryColor: "#FF6A00",
        rank: "Demon Slayer",
    },
    {
        name: "Nezuko Kamado",
        title: "Demon Princess",
        tagline: "A demon who chose to protect humanity — her blood burns with defiance.",
        image: "/characters/nezuko.png",
        background: "/backgrounds/bg_nezuko.png",
        color: "#FF6A88",
        secondaryColor: "#FFB3C6",
        rank: "Demon",
    },
    {
        name: "Zenitsu Agatsuma",
        title: "Thunder God",
        tagline: "Thunder strikes only once — and it never misses. Asleep, he is unstoppable.",
        image: "/characters/zenitsu.png",
        background: "/backgrounds/bg_zenitsu.png",
        color: "#FFB800",
        secondaryColor: "#FFE066",
        rank: "Demon Slayer",
    },
    {
        name: "Inosuke Hashibira",
        title: "Beast King",
        tagline: "A beast raised by the mountain itself — his blades cut through anything.",
        image: "/characters/inosuke.png",
        background: "/backgrounds/bg_inosuke.png",
        color: "#4A90D9",
        secondaryColor: "#7AB8FF",
        rank: "Demon Slayer",
    },
    {
        name: "Giyu Tomioka",
        title: "Water Hashira",
        tagline: "Silent as still water, deadly as a tidal wave — the strongest pillar.",
        image: "/characters/giyu.png",
        background: "/backgrounds/bg_giyu.png",
        color: "#1E90FF",
        secondaryColor: "#63B3ED",
        rank: "Hashira",
    },
    {
        name: "Kyojuro Rengoku",
        title: "Flame Hashira",
        tagline: "Set your heart ablaze — his flame will never be extinguished.",
        image: "/characters/rengoku.png",
        background: "/backgrounds/bg_rengoku.png",
        color: "#FF4500",
        secondaryColor: "#FF8C00",
        rank: "Hashira",
    },
    {
        name: "Shinobu Kocho",
        title: "Insect Hashira",
        tagline: "A butterfly's grace, a viper's poison — elegance that kills.",
        image: "/characters/shinobu.png",
        background: "/backgrounds/bg_shinobu.png",
        color: "#9B59B6",
        secondaryColor: "#D6A3FF",
        rank: "Hashira",
    },
    {
        name: "Tengen Uzui",
        title: "Sound Hashira",
        tagline: "Flashy and flamboyant — completing the mission with style is absolute.",
        image: "/characters/tengen.png",
        background: "/backgrounds/bg_tengen.png",
        color: "#FFD700",
        secondaryColor: "#C0C0C0",
        rank: "Hashira",
    },
    {
        name: "Mitsuri Kanroji",
        title: "Love Hashira",
        tagline: "Love is the strongest power — sweet, passionate, and incredibly deadly.",
        image: "/characters/mitsuri.png",
        background: "/backgrounds/bg_mitsuri.png",
        color: "#FF69B4",
        secondaryColor: "#98FB98",
        rank: "Hashira",
    },
    {
        name: "Gyomei Himejima",
        title: "Stone Hashira",
        tagline: "The gentle giant who weeps for the souls he saves — strongest of all.",
        image: "/characters/gyomei.png",
        background: "/backgrounds/bg_gyomei.png",
        color: "#808080",
        secondaryColor: "#D3D3D3",
        rank: "Hashira",
    },
    {
        name: "Akaza",
        title: "Upper Rank Three",
        tagline: "Strength is everything — weak ones have no right to live.",
        image: "/characters/akaza.png",
        background: "/backgrounds/bg_akaza.png",
        color: "#FF1493",
        secondaryColor: "#00BFFF",
        rank: "Upper Moon",
    },
];

/**
 * CharacterCard — Premium card with:
 * - 3D tilt parallax on hover
 * - Animated color glow border
 * - Glass overlay with character info
 * - Rank badge
 * - Click to reveal expanded details
 */
function CharacterCard({
    character,
    index,
}: {
    character: CharacterData;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -12;
            const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 12;
            const mx = (e.clientX - rect.left) / rect.width;
            const my = (e.clientY - rect.top) / rect.height;

            setTilt({ x: tiltX, y: tiltY });
            setMousePos({ x: mx, y: my });
        },
        []
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className="character-card-enhanced"
            style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                perspective: "1200px",
                background: "#0D0D12",
            }}
            animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
                scale: isHovered ? 1.04 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
                mass: 0.8,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Animated glow border */}
            <div
                style={{
                    position: "absolute",
                    inset: "-2px",
                    borderRadius: "22px",
                    background: isHovered
                        ? `conic-gradient(from ${mousePos.x * 360}deg at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${character.color}, ${character.secondaryColor}, transparent 60%)`
                        : `linear-gradient(135deg, ${character.color}15, transparent 50%, ${character.color}08)`,
                    zIndex: 0,
                    transition: "all 0.5s ease",
                    opacity: isHovered ? 1 : 0.4,
                }}
            />

            {/* Card inner container */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "#0D0D12",
                    border: `1px solid ${isHovered ? character.color + "40" : "rgba(255,255,255,0.06)"}`,
                    transition: "border-color 0.4s ease",
                }}
            >
                {/* Media Container (Background + Character) */}
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                    {/* Breathing Style Background */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                        <Image
                            src={character.background}
                            alt={`${character.name} background`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            style={{
                                transform: isHovered ? "scale(1.1)" : "scale(1.0)",
                                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(to top, #0D0D12 10%, #0D0D12cc 40%, transparent 80%)`,
                                mixBlendMode: "multiply",
                            }}
                        />
                    </div>

                    {/* Character Image */}
                    <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
                        <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-contain object-bottom"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            style={{
                                transform: isHovered
                                    ? `scale(1.08) translate(${(mousePos.x - 0.5) * -12}px, ${(mousePos.y - 0.5) * -12}px)`
                                    : "scale(1)",
                                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                                filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))",
                            }}
                        />
                    </div>

                    {/* Cinematic overlay for depth integration */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 2,
                            background: `linear-gradient(to top, #0D0D12 0%, transparent 40%)`,
                            pointerEvents: "none",
                        }}
                    />

                    {/* Hover color wash */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${character.color}20, transparent 60%)`,
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Rank badge */}
                    <div
                        style={{
                            position: "absolute",
                            top: "14px",
                            right: "14px",
                            padding: "5px 12px",
                            borderRadius: "8px",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: character.color,
                            background: `${character.color}15`,
                            backdropFilter: "blur(12px)",
                            border: `1px solid ${character.color}30`,
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "translateY(0)" : "translateY(-8px)",
                            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        {character.rank}
                    </div>
                </div>

                {/* Card info */}
                <div style={{ padding: "20px 22px 24px" }}>
                    {/* Title accent */}
                    <span
                        style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: character.color,
                            display: "block",
                            marginBottom: "6px",
                            opacity: 0.9,
                        }}
                    >
                        {character.title}
                    </span>

                    {/* Character name */}
                    <h3
                        style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#F2F2F2",
                            marginBottom: "8px",
                            lineHeight: 1.2,
                            transition: "color 0.3s ease",
                            ...(isHovered ? { color: character.color } : {}),
                        }}
                    >
                        {character.name}
                    </h3>

                    {/* Tagline */}
                    <p
                        style={{
                            fontSize: "13px",
                            lineHeight: 1.6,
                            color: "#8A8A8A",
                            margin: 0,
                            overflow: "hidden",
                            maxHeight: isHovered ? "100px" : "42px",
                            transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        {character.tagline}
                    </p>

                    {/* Animated line */}
                    <div
                        style={{
                            marginTop: "14px",
                            height: "2px",
                            borderRadius: "1px",
                            background: `linear-gradient(90deg, ${character.color}, ${character.secondaryColor})`,
                            width: isHovered ? "100%" : "0%",
                            transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                            boxShadow: isHovered
                                ? `0 0 12px ${character.color}60`
                                : "none",
                        }}
                    />
                </div>
            </div>

            {/* Ambient glow behind card on hover */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%",
                    height: "40px",
                    borderRadius: "50%",
                    background: character.color,
                    filter: "blur(30px)",
                    opacity: isHovered ? 0.3 : 0,
                    transition: "opacity 0.5s ease",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
        </motion.div >
    );
}

function CharactersSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    // Carousel State
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [autoPlayReset, setAutoPlayReset] = useState(0);

    // Navigation Handlers
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % CHARACTERS.length);
        setAutoPlayReset((prev) => prev + 1); // Reset timer on manual interaction
    }, []);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + CHARACTERS.length) % CHARACTERS.length);
        setAutoPlayReset((prev) => prev + 1);
    }, []);

    // Auto-Play Effect
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % CHARACTERS.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, autoPlayReset]);

    // Pause on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Header Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                const headerChildren = headerRef.current.children;
                gsap.fromTo(headerChildren[0],
                    { opacity: 0, x: -60, rotateZ: -3 },
                    { opacity: 1, x: 0, rotateZ: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
                );
                gsap.fromTo(headerChildren[1],
                    { opacity: 0, scale: 0.7, y: 40 },
                    { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.2, ease: "power4.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
                );
                if (headerChildren[2]) {
                    gsap.fromTo(headerChildren[2],
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
                    );
                }
            }
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 1.5, delay: 0.3, ease: "power4.inOut", scrollTrigger: { trigger: lineRef.current, start: "top 90%" } }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Helper to determine card position state
    const getCardStyle = (index: number) => {
        const len = CHARACTERS.length;
        // Calculate relative position accounting for wrap-around
        // We want to know if 'index' is the Previous, Current, or Next card relative to 'activeIndex'

        if (index === activeIndex) {
            return {
                zIndex: 10,
                opacity: 1,
                scale: 1,
                x: "0%",
                rotateY: 0,
                pointerEvents: "auto",
            };
        }

        const prevIndex = (activeIndex - 1 + len) % len;
        if (index === prevIndex) {
            return {
                zIndex: 5,
                opacity: 0.6,
                scale: 0.8,
                x: "-60%", // Move to left
                rotateY: 10,
                pointerEvents: "auto", // Allow clicking to navigate? Or just visual? User said "Previous card scaled smaller on left"
            };
        }

        const nextIndex = (activeIndex + 1) % len;
        if (index === nextIndex) {
            return {
                zIndex: 5,
                opacity: 0.6,
                scale: 0.8,
                x: "60%", // Move to right
                rotateY: -10,
                pointerEvents: "auto",
            };
        }

        // Hidden cards
        return {
            zIndex: 0,
            opacity: 0,
            scale: 0.6,
            x: "0%", // Center them behind so they don't fly in from weird places? Or keep them at the side they came from?
            // Actually, for a clean loop, hidden cards should arguably stay out of the way or transition from the "exit" position.
            // But user requirement says "Others hidden off-screen".
            // Let's keep them centered but invisible for simplicity, or we can try to slide them.
            // With framer motion layout animations, keeping them at 0 opacity is safest.
            rotateY: 0,
            pointerEvents: "none",
        };
    };

    return (
        <section
            ref={sectionRef}
            id="characters"
            className="section-base relative"
            style={{ overflow: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
            {/* Background ambient effects */}
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "-10%",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(177,18,38,0.06), transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "-5%",
                    width: "350px",
                    height: "350px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(74,144,217,0.05), transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
                {/* Section Header */}
                <div ref={headerRef} style={{ textAlign: "center", marginBottom: "40px" }}>
                    <span
                        style={{
                            display: "inline-block",
                            color: "#B11226",
                            fontSize: "13px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.25em",
                            marginBottom: "16px",
                        }}
                    >
                        ⚔ Warriors ⚔
                    </span>
                    <h2
                        style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            marginBottom: "20px",
                        }}
                    >
                        Those Who{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #B11226, #FF6A00)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Fight
                        </span>
                    </h2>
                    <p
                        style={{
                            maxWidth: "600px",
                            margin: "0 auto",
                            fontSize: "16px",
                            color: "#8A8A8A",
                            lineHeight: 1.7,
                        }}
                    >
                        From Hashira to Demon Slayer — those who stand between humanity
                        and the darkness.
                    </p>
                </div>

                {/* Animated crimson line */}
                <div
                    ref={lineRef}
                    style={{
                        width: "120px",
                        height: "2px",
                        margin: "0 auto 60px",
                        background: "linear-gradient(90deg, #B11226, #FF6A00)",
                        borderRadius: "1px",
                        boxShadow: "0 0 15px rgba(177,18,38,0.4)",
                        transformOrigin: "center",
                    }}
                />

                {/* CAROUSEL CONTAINER */}
                <div
                    className="relative w-full flex items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
                    style={{ height: "600px" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Navigation Buttons - Absolute */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 md:left-10 z-20 p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-red-900/40 hover:border-red-500/50 transition-all duration-300 group"
                        aria-label="Previous Character"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white group-hover:scale-110 transition-transform"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 md:right-10 z-20 p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-red-900/40 hover:border-red-500/50 transition-all duration-300 group"
                        aria-label="Next Character"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white group-hover:scale-110 transition-transform"><path d="M9 18l6-6-6-6" /></svg>
                    </button>

                    <div className="relative w-full max-w-[400px] h-[580px] flex items-center justify-center">
                        <AnimatePresence initial={false} mode="popLayout">
                            {CHARACTERS.map((char, i) => {
                                const style = getCardStyle(i);
                                // Optimization: Only render visible cards to keep DOM light? 
                                // Actually user said "others hidden off-screen".
                                // If opacity is 0, we can use `display: none` via Framer Motion's hidden variant logic if we want, but let's stick to opacity.

                                return (
                                    <motion.div
                                        key={char.name}
                                        className="absolute top-0 left-0 w-full h-full"
                                        initial={style}
                                        animate={style}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        style={{
                                            transformStyle: "preserve-3d",
                                            perspective: "1000px",
                                            pointerEvents: style.pointerEvents as "auto" | "none",
                                        }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.2}
                                        onDragEnd={(e, { offset, velocity }) => {
                                            const swipe = Math.abs(offset.x) * velocity.x;
                                            if (swipe < -100 || offset.x < -100) {
                                                handleNext();
                                            } else if (swipe > 100 || offset.x > 100) {
                                                handlePrev();
                                            }
                                        }}
                                    >
                                        <CharacterCard character={char} index={i} />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(CharactersSection);
