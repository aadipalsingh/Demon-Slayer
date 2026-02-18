/**
 * animations.ts — Reusable GSAP animation helpers
 *
 * All helpers return a GSAP context or tween that can be cleaned up
 * in React's useEffect return. This ensures strict mode compatibility
 * and prevents memory leaks.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ===== FADE IN UP ===== */
/* Standard scroll-triggered fade + slide up animation */
export function fadeInUp(
  element: gsap.TweenTarget,
  options?: {
    trigger?: string | Element;
    duration?: number;
    delay?: number;
    y?: number;
    start?: string;
  }
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options?.y ?? 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: (options?.trigger as Element) ?? (element as Element),
        start: options?.start ?? "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/* ===== STAGGER FADE IN ===== */
/* Staggered entrance for a group of elements (e.g., card grids) */
export function staggerFadeIn(
  elements: gsap.TweenTarget,
  options?: {
    trigger?: string | Element;
    stagger?: number;
    duration?: number;
    y?: number;
    start?: string;
  }
) {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: options?.y ?? 80,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: (options?.trigger as Element) ?? (elements as Element),
        start: options?.start ?? "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/* ===== PARALLAX ===== */
/* Scroll-driven parallax movement on an element */
export function parallax(
  element: gsap.TweenTarget,
  options?: {
    trigger?: string | Element;
    yPercent?: number;
    start?: string;
    end?: string;
  }
) {
  return gsap.to(element, {
    yPercent: options?.yPercent ?? -20,
    ease: "none",
    scrollTrigger: {
      trigger: (options?.trigger as Element) ?? (element as Element),
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      scrub: 1,
    },
  });
}

/* ===== HORIZONTAL SCROLL ===== */
/* Pins a section and scrolls its content horizontally */
export function horizontalScroll(
  container: Element,
  scrollContent: Element,
  options?: {
    ease?: string;
    end?: string;
  }
) {
  const scrollWidth = scrollContent.scrollWidth - container.clientWidth;

  return gsap.to(scrollContent, {
    x: -scrollWidth,
    ease: options?.ease ?? "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: options?.end ?? `+=${scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
}

/* ===== COUNTER ANIMATION ===== */
/* Animates a number counting up from 0 to target value */
export function counterAnimation(
  element: Element,
  target: number,
  options?: {
    trigger?: string | Element;
    duration?: number;
    suffix?: string;
    prefix?: string;
    start?: string;
  }
) {
  const obj = { value: 0 };
  const suffix = options?.suffix ?? "";
  const prefix = options?.prefix ?? "";

  return gsap.to(obj, {
    value: target,
    duration: options?.duration ?? 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: (options?.trigger as Element) ?? element,
      start: options?.start ?? "top 80%",
      toggleActions: "play none none reverse",
    },
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
    },
  });
}

/* ===== MASK REVEAL ===== */
/* Reveals text with a clip-path mask animation */
export function maskReveal(
  element: gsap.TweenTarget,
  options?: {
    trigger?: string | Element;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  return gsap.fromTo(
    element,
    {
      clipPath: "inset(0 100% 0 0)",
    },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: options?.duration ?? 1.2,
      delay: options?.delay ?? 0,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: (options?.trigger as Element) ?? (element as Element),
        start: options?.start ?? "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/* ===== SLOW ZOOM ===== */
/* Slowly zooms in a background image for cinematic effect */
export function slowZoom(
  element: gsap.TweenTarget,
  options?: {
    trigger?: string | Element;
    scale?: number;
    duration?: number;
  }
) {
  return gsap.fromTo(
    element,
    { scale: 1 },
    {
      scale: options?.scale ?? 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: (options?.trigger as Element) ?? (element as Element),
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    }
  );
}

/* ===== CLEANUP HELPER ===== */
/* Creates a GSAP context for React component cleanup */
export function createGsapContext(scope: Element | string) {
  return gsap.context(() => {}, scope);
}
