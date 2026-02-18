"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import Image from "next/image";

/**
 * Navbar — Premium glassmorphism navigation bar with animated interactions.
 *
 * Features:
 * - Logo image replacing text brand
 * - Frosted glass background with gradient border glow
 * - Floating pill-style nav container (centered, detached from edges)
 * - Active section tracking with animated indicator
 * - Smooth hide/show on scroll direction
 * - Animated hover effects with crimson glow
 * - Mobile hamburger menu with slide-in panel
 */

const NAV_LINKS = [
    { label: "World", href: "#world" },
    { label: "Characters", href: "#characters" },
    { label: "Breathing", href: "#breathing" },
    { label: "Trailer", href: "#trailer" },
    { label: "Timeline", href: "#timeline" },
    { label: "Manga", href: "#manga" },
];

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const lastScrollY = useRef(0);

    // Smart scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setIsScrolled(currentY > 50);

            if (currentY > lastScrollY.current && currentY > 200) {
                setIsHidden(true);
                setMobileOpen(false);
            } else {
                setIsHidden(false);
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section via IntersectionObserver
    useEffect(() => {
        const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { threshold: 0.3 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
            }
        },
        []
    );

    return (
        <>
            <nav
                className="navbar-root"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 50,
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isHidden ? "translateY(-100%)" : "translateY(0)",
                    padding: isScrolled ? "8px 0" : "16px 0",
                }}
            >
                <div
                    style={{
                        maxWidth: "1360px",
                        margin: "0 auto",
                        padding: "0 24px",
                    }}
                >
                    {/* Main navbar container — floating pill */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 28px",
                            borderRadius: "16px",
                            background: isScrolled
                                ? "rgba(11, 11, 15, 0.65)"
                                : "rgba(11, 11, 15, 0.3)",
                            backdropFilter: "blur(24px) saturate(180%)",
                            WebkitBackdropFilter: "blur(24px) saturate(180%)",
                            border: isScrolled
                                ? "1px solid rgba(177, 18, 38, 0.15)"
                                : "1px solid rgba(255, 255, 255, 0.06)",
                            boxShadow: isScrolled
                                ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(177,18,38,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
                                : "0 4px 16px rgba(0,0,0,0.2)",
                            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        {/* Logo */}
                        <a
                            href="#"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                flexShrink: 0,
                            }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Demon Slayer"
                                width={100}
                                height={34}
                                style={{
                                    objectFit: "contain",
                                    filter: "drop-shadow(0 0 10px rgba(177, 18, 38, 0.2))",
                                    transition: "filter 0.3s ease",
                                }}
                                priority
                            />
                        </a>

                        {/* Desktop Navigation Links */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                            className="nav-links-desktop"
                        >
                            {NAV_LINKS.map((link) => {
                                const isActive =
                                    activeSection === link.href.replace("#", "");
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="nav-link-pill"
                                        style={{
                                            padding: "8px 18px",
                                            borderRadius: "10px",
                                            fontSize: "13px",
                                            fontWeight: 500,
                                            letterSpacing: "0.06em",
                                            textTransform: "uppercase",
                                            textDecoration: "none",
                                            color: isActive ? "#F2F2F2" : "#8A8A8A",
                                            background: isActive
                                                ? "rgba(177, 18, 38, 0.15)"
                                                : "transparent",
                                            border: isActive
                                                ? "1px solid rgba(177, 18, 38, 0.3)"
                                                : "1px solid transparent",
                                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                            cursor: "pointer",
                                            position: "relative",
                                        }}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    bottom: "-1px",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: "20px",
                                                    height: "2px",
                                                    borderRadius: "1px",
                                                    background:
                                                        "linear-gradient(90deg, #B11226, #FF6A00)",
                                                    boxShadow: "0 0 8px rgba(177,18,38,0.5)",
                                                }}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <button
                            className="nav-cta-btn"
                            style={{
                                padding: "10px 28px",
                                borderRadius: "12px",
                                border: "none",
                                background:
                                    "linear-gradient(135deg, #B11226 0%, #FF6A00 100%)",
                                color: "#F2F2F2",
                                fontSize: "13px",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                boxShadow:
                                    "0 4px 15px rgba(177,18,38,0.3), 0 0 0 1px rgba(177,18,38,0.2)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <span style={{ position: "relative", zIndex: 1 }}>
                                Explore
                            </span>
                        </button>

                        {/* Mobile Hamburger */}
                        <button
                            className="nav-mobile-toggle"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle navigation"
                            style={{
                                display: "none",
                                flexDirection: "column",
                                gap: "5px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "8px",
                                zIndex: 60,
                            }}
                        >
                            <span
                                style={{
                                    display: "block",
                                    width: "24px",
                                    height: "2px",
                                    borderRadius: "2px",
                                    background: "#F2F2F2",
                                    transition: "all 0.3s ease",
                                    transform: mobileOpen
                                        ? "rotate(45deg) translate(5px, 5px)"
                                        : "none",
                                }}
                            />
                            <span
                                style={{
                                    display: "block",
                                    width: "24px",
                                    height: "2px",
                                    borderRadius: "2px",
                                    background: "#F2F2F2",
                                    transition: "all 0.3s ease",
                                    opacity: mobileOpen ? 0 : 1,
                                }}
                            />
                            <span
                                style={{
                                    display: "block",
                                    width: "24px",
                                    height: "2px",
                                    borderRadius: "2px",
                                    background: "#F2F2F2",
                                    transition: "all 0.3s ease",
                                    transform: mobileOpen
                                        ? "rotate(-45deg) translate(5px, -5px)"
                                        : "none",
                                }}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Slide-in Panel */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "280px",
                    height: "100vh",
                    zIndex: 49,
                    background: "rgba(11, 11, 15, 0.95)",
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                    borderLeft: "1px solid rgba(177, 18, 38, 0.15)",
                    transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "40px 32px",
                    gap: "8px",
                }}
            >
                {NAV_LINKS.map((link, i) => {
                    const isActive =
                        activeSection === link.href.replace("#", "");
                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            style={{
                                padding: "16px 20px",
                                borderRadius: "12px",
                                fontSize: "16px",
                                fontWeight: 500,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                color: isActive ? "#F2F2F2" : "#8A8A8A",
                                background: isActive
                                    ? "rgba(177, 18, 38, 0.12)"
                                    : "transparent",
                                borderLeft: isActive
                                    ? "2px solid #B11226"
                                    : "2px solid transparent",
                                transition: `all 0.3s ease ${i * 50}ms`,
                                opacity: mobileOpen ? 1 : 0,
                                transform: mobileOpen
                                    ? "translateX(0)"
                                    : "translateX(20px)",
                            }}
                        >
                            {link.label}
                        </a>
                    );
                })}
            </div>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 48,
                        background: "rgba(0,0,0,0.5)",
                    }}
                />
            )}

            {/* Inline styles for hover effects and responsive */}
            <style jsx global>{`
                .nav-link-pill:hover {
                    color: #F2F2F2 !important;
                    background: rgba(177, 18, 38, 0.08) !important;
                    box-shadow: 0 0 20px rgba(177, 18, 38, 0.15);
                }

                .nav-cta-btn:hover {
                    transform: scale(1.05) translateY(-1px);
                    box-shadow: 0 8px 25px rgba(177, 18, 38, 0.5),
                        0 0 40px rgba(255, 106, 0, 0.2),
                        0 0 0 1px rgba(177, 18, 38, 0.3) !important;
                }

                .nav-cta-btn::before {
                    content: "";
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.15) 50%,
                        transparent 70%
                    );
                    transform: rotate(45deg) translateX(-100%);
                    transition: transform 0.6s ease;
                }

                .nav-cta-btn:hover::before {
                    transform: rotate(45deg) translateX(100%);
                }

                @media (max-width: 768px) {
                    .nav-links-desktop {
                        display: none !important;
                    }
                    .nav-cta-btn {
                        display: none !important;
                    }
                    .nav-mobile-toggle {
                        display: flex !important;
                    }
                }
            `}</style>
        </>
    );
}

export default memo(Navbar);
