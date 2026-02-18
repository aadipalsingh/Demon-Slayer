"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * MangaSection — Grid of manga covers + stats counter.
 *
 * Animations:
 * 1. Covers slide upward with slight rotation (staggered)
 * 2. Stats counter animation using GSAP onUpdate
 */

interface MangaCover {
    title: string;
    image: string;
}

const MANGA_COVERS: MangaCover[] = [
    { title: "Volume 1 — Cruelty", image: "/manga/vol-1.jpg" },
    { title: "Volume 2 — It Was You", image: "/manga/vol-2.jpg" },
    { title: "Volume 3 — Believe", image: "/manga/vol-3.jpg" },
    { title: "Volume 4 — Robust Sword", image: "/manga/vol-4.jpg" },
];

interface MangaStat {
    label: string;
    value: number;
    suffix: string;
}

const MANGA_STATS: MangaStat[] = [
    { label: "Volumes", value: 23, suffix: "" },
    { label: "Chapters", value: 205, suffix: "" },
    { label: "Years Running", value: 4, suffix: "" },
];

function MangaSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const coversRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Covers slide upward with slight rotation (staggered)
            if (coversRef.current) {
                const covers = coversRef.current.children;
                gsap.fromTo(
                    covers,
                    {
                        opacity: 0,
                        y: 100,
                        rotation: (i: number) => (i % 2 === 0 ? -5 : 5),
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotation: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: coversRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // 2. Stats counter animation
            if (statsRef.current) {
                const statElements = statsRef.current.querySelectorAll("[data-target]");
                statElements.forEach((el) => {
                    const target = parseInt(el.getAttribute("data-target") || "0", 10);
                    const suffix = el.getAttribute("data-suffix") || "";
                    const obj = { value: 0 };

                    gsap.to(obj, {
                        value: target,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                        onUpdate: () => {
                            el.textContent = `${Math.round(obj.value)}${suffix}`;
                        },
                    });
                });
            }

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

    return (
        <section
            ref={sectionRef}
            id="manga"
            className="section-base relative z-10"
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px', width: '100%' }}>
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="text-[#FF6A00] text-sm uppercase tracking-[0.2em] font-semibold">
                        Source Material
                    </span>
                    <h2 className="font-['Cinzel'] text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                        The <span className="text-[#FF6A00]">Manga</span>
                    </h2>
                    {/* Crimson Separator */}
                    <div ref={separatorRef} className="crimson-separator" />
                </div>

                {/* Manga covers grid */}
                <div
                    ref={coversRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                >
                    {MANGA_COVERS.map((cover) => (
                        <div
                            key={cover.title}
                            className="group relative rounded-[20px] overflow-hidden bg-[#111115]
                         border border-white/5 card-glow cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src={cover.image}
                                    alt={cover.title}
                                    fill
                                    className="object-cover transition-transform duration-700
                             group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="font-['Cinzel'] text-sm font-bold text-[#F2F2F2]">
                                    {cover.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats counters */}
                <div
                    ref={statsRef}
                    className="w-full flex flex-wrap justify-center items-center gap-12 md:gap-24 max-w-5xl mx-auto mt-32"
                >
                    {MANGA_STATS.map((stat) => (
                        <div key={stat.label} className="text-center min-w-[120px]">
                            <span
                                data-target={stat.value}
                                data-suffix={stat.suffix}
                                className="block font-['Cinzel'] text-5xl md:text-6xl font-bold text-[#FF6A00]"
                            >
                                0
                            </span>
                            <span className="text-sm text-[#8A8A8A] uppercase tracking-[0.15em] mt-3 block">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default memo(MangaSection);
