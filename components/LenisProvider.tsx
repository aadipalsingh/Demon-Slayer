"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * LenisProvider — Initializes Lenis smooth scroll and syncs it
 * with GSAP ScrollTrigger so both animation systems use the
 * same scroll position values. This prevents desync issues.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Create Lenis instance with smooth, cinematic scroll feel
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Sync Lenis scroll position with GSAP ScrollTrigger
        // This ensures GSAP animations fire at the correct scroll positions
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP's ticker for the Lenis animation frame loop
        // This gives us buttery smooth 60fps scroll
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing so Lenis controls timing
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Cleanup: destroy Lenis and remove from GSAP ticker
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
