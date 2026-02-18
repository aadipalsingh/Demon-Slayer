import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

export const metadata: Metadata = {
    title: "Demon Slayer — When Demons Rule the Night",
    description:
        "A cinematic, immersive experience inspired by the world of Demon Slayer. Step into the darkness.",
    keywords: ["demon slayer", "anime", "cinematic", "dark fantasy"],
};

/**
 * Root layout — sets up global fonts, dark background,
 * and Lenis smooth scroll provider that syncs with GSAP ScrollTrigger.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased bg-[#0B0B0F] text-[#F2F2F2] overflow-x-hidden">
                <LenisProvider>{children}</LenisProvider>
            </body>
        </html>
    );
}
