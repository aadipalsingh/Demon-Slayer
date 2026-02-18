"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ImpactSection — Global impact stats with animated counters.
 *
 * Centered layout with large numbers that count up.
 * Background has a subtle animated gradient.
 */

interface ImpactStat {
    label: string;
    value: number;
    prefix: string;
    suffix: string;
}

const IMPACT_STATS: ImpactStat[] = [
    { label: "Box Office", value: 500, prefix: "$", suffix: "M+" },
    { label: "Countries", value: 120, prefix: "", suffix: "+" },
    { label: "Awards", value: 35, prefix: "", suffix: "+" },
    { label: "Fans Worldwide", value: 100, prefix: "", suffix: "M+" },
];

function ImpactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading fade in
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
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

            // Counter animations for each stat
            if (statsRef.current) {
                const statElements = statsRef.current.querySelectorAll("[data-target]");
                statElements.forEach((el) => {
                    const target = parseInt(el.getAttribute("data-target") || "0", 10);
                    const prefix = el.getAttribute("data-prefix") || "";
                    const suffix = el.getAttribute("data-suffix") || "";
                    const obj = { value: 0 };

                    gsap.to(obj, {
                        value: target,
                        duration: 2.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                        onUpdate: () => {
                            el.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
                        },
                    });
                });

                // Cards stagger fade in
                gsap.fromTo(
                    statsRef.current.children,
                    { opacity: 0, y: 60, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="impact"
            className="section-base relative animated-gradient-bg"
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px', width: '100%' }}>
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <span className="text-[#B11226] text-sm uppercase tracking-[0.2em] font-semibold">
                        Phenomenon
                    </span>
                    <h2 className="font-['Cinzel'] text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                        Global <span className="text-[#B11226]">Impact</span>
                    </h2>
                    <div className="flex justify-center w-full mt-6">
                        <p className="text-[#8A8A8A] max-w-3xl text-center text-lg leading-relaxed">
                            A cultural phenomenon that transcended borders and redefined
                            what anime could achieve on the world stage.
                        </p>
                    </div>

                    {/* Crimson Separator */}
                    <div ref={separatorRef} className="crimson-separator" />
                </div>

                {/* Stats grid */}
                <div
                    ref={statsRef}
                    className="w-full flex flex-wrap justify-center gap-6 md:gap-10 max-w-6xl mx-auto"
                >
                    {IMPACT_STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="glass rounded-[20px] p-8 text-center flex-1 min-w-[200px] max-w-[280px]
                         hover:shadow-[0_0_30px_rgba(177,18,38,0.2)]
                         transition-shadow duration-500"
                        >
                            <span
                                data-target={stat.value}
                                data-prefix={stat.prefix}
                                data-suffix={stat.suffix}
                                className="block font-['Cinzel'] text-3xl md:text-4xl lg:text-5xl
                          font-bold text-[#B11226] mb-3"
                            >
                                {stat.prefix}0{stat.suffix}
                            </span>
                            <span className="text-sm text-[#8A8A8A] uppercase tracking-[0.15em]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default memo(ImpactSection);
