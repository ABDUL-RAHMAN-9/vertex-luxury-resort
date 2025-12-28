import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowDown, Maximize2 } from "lucide-react";

// --- Custom Hook for Scroll Reveals ---
const useReveal = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
};

// --- Sub-Component: Reveal Text ---
const RevealText = ({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => {
    const { ref, isVisible } = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${className} ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const OurStory = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // --- SCROLL LOGIC ---
    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            // Update scroll progress bar
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScrollProgress(scroll);

            // Update Navbar state (trigger after 50px of scrolling)
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleStartJourney = () => {
        navigate("/");
        setTimeout(() => {
            const footer = document.getElementById("footer");
            if (footer) footer.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="bg-[#050505] min-h-screen text-[#Eaeaea] font-sans selection:bg-vertex-gold selection:text-black">
            {/* --- PROGRESS BAR (Left Side) --- */}
            <div className="fixed left-0 top-0 h-full w-[2px] bg-white/5 z-[60] hidden lg:block">
                <div
                    className="w-full bg-vertex-gold transition-all duration-100 ease-out"
                    style={{ height: `${scrollProgress * 100}%` }}
                />
            </div>

            {/* --- REFINED GLASSY NAVIGATION --- */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? "py-4 bg-[#050505]/70 backdrop-blur-md border-b border-white/10"
                        : "py-8 bg-transparent"
                }`}>
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
                    <Link
                        to="/"
                        className={`group flex items-center gap-2 text-xs md:text-sm font-display tracking-widest uppercase transition-all duration-300 ${
                            isScrolled
                                ? "text-white"
                                : "text-white mix-blend-difference"
                        } hover:text-vertex-gold`}>
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Home</span>
                    </Link>

                    <div
                        className={`font-display font-bold text-xl md:text-2xl tracking-[0.3em] transition-all duration-300 ${
                            isScrolled
                                ? "text-white"
                                : "text-white mix-blend-difference"
                        }`}>
                        VERTEX
                    </div>

                    {/* Simple CTA that appears on scroll for better UX */}
                    <button
                        onClick={handleStartJourney}
                        className={`text-[10px] tracking-[0.2em] uppercase border border-vertex-gold/50 px-4 py-2 transition-all duration-500 hover:bg-vertex-gold hover:text-black ${
                            isScrolled
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-4 pointer-events-none"
                        }`}>
                        Book Now
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="relative h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
                        alt="Background"
                    />
                </div>

                <div className="relative z-20 max-w-7xl">
                    <div className="flex items-center gap-4 mb-8 overflow-hidden">
                        <span className="h-[1px] w-12 bg-vertex-gold animate-slide-right" />
                        <p className="text-vertex-gold text-xs font-bold tracking-[0.4em] uppercase animate-fade-in">
                            Est. 2025
                        </p>
                    </div>

                    <h1
                        className="font-display text-6xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tighter text-white mix-blend-overlay opacity-0 animate-fade-up"
                        style={{
                            animationDelay: "200ms",
                            animationFillMode: "forwards",
                        }}>
                        CULINARY <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                            ARCHITECTS.
                        </span>
                    </h1>
                </div>

                <div className="absolute bottom-12 left-6 md:left-24 right-6 md:right-24 flex justify-between items-end z-20">
                    <p className="max-w-xs text-xs md:text-sm text-white/50 font-light leading-relaxed uppercase tracking-wider hidden md:block">
                        Scroll to discover the <br /> art of dining & wellness
                    </p>
                    <ArrowDown className="w-5 h-5 text-white animate-bounce opacity-50" />
                </div>
            </header>

            {/* --- SECTION 1: THE MANIFESTO --- */}
            <section className="relative py-32 border-b border-white/5">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="lg:w-1/3">
                            <div className="sticky top-32">
                                <RevealText>
                                    <h2 className="font-display text-4xl md:text-5xl mb-6">
                                        THE <br /> CONCEPT
                                    </h2>
                                    <div className="w-12 h-[2px] bg-vertex-gold mb-6" />
                                    <p className="text-white/60 text-sm leading-relaxed font-light">
                                        01 — Gastronomy <br />
                                        02 — Viticulture <br />
                                        03 — Restoration
                                    </p>
                                </RevealText>
                            </div>
                        </div>

                        <div className="lg:w-2/3 space-y-32">
                            <RevealText>
                                <p className="text-2xl md:text-4xl font-light leading-tight text-white/90">
                                    "We didn't just want to open a restaurant.
                                    We wanted to create a{" "}
                                    <span className="text-vertex-gold italic font-serif">
                                        temple of flavor
                                    </span>{" "}
                                    where time slows down."
                                </p>
                            </RevealText>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <RevealText delay={200}>
                                    <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
                                        The Palate
                                    </h3>
                                    <p className="text-white/70 font-light leading-relaxed">
                                        A fusion of culinary excellence and
                                        architectural brutalism. Here, the plate
                                        is the canvas, and the wine list is a
                                        curated library of history.
                                    </p>
                                </RevealText>
                                <RevealText delay={400}>
                                    <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
                                        The Pause
                                    </h3>
                                    <p className="text-white/70 font-light leading-relaxed">
                                        Beyond dining, we offer restoration. A
                                        hidden spa and lounge designed to
                                        cleanse the senses before or after your
                                        meal.
                                    </p>
                                </RevealText>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: ARCHITECTURAL DETAILS --- */}
            <section className="py-32 bg-[#080808]">
                <div className="container mx-auto px-6 md:px-24">
                    <RevealText className="mb-16 flex items-end justify-between">
                        <h2 className="font-display text-4xl">SENSORY ETHOS</h2>
                        <span className="hidden md:block text-xs text-white/40 tracking-widest uppercase">
                            Designed for taste
                        </span>
                    </RevealText>

                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
                        {[
                            {
                                title: "The Kitchen",
                                desc: "Open-fire cooking center stage.",
                            },
                            {
                                title: "The Cellar",
                                desc: "3,000 bottles, perfectly aged.",
                            },
                            {
                                title: "Acoustics",
                                desc: "Engineered for intimate conversation.",
                            },
                            {
                                title: "The Spa",
                                desc: "Pre-dinner sensory calibration.",
                            },
                            {
                                title: "Lighting",
                                desc: "Shadows that frame the plating.",
                            },
                            {
                                title: "Materiality",
                                desc: "Stone tables, velvet seating.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative border-r border-b border-white/10 p-12 hover:bg-white/5 transition-colors duration-500">
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Maximize2 className="w-4 h-4 text-vertex-gold" />
                                </div>
                                <h3 className="font-display text-2xl mb-2 text-white/90">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-white/50 font-mono">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: VISUAL BREAK --- */}
            <section className="h-[80vh] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed grayscale hover:grayscale-0 transition-all duration-[2s]" />
                <div className="relative z-20 text-center mix-blend-difference">
                    <p className="font-serif italic text-3xl md:text-5xl text-white tracking-wide">
                        "Dining is the ultimate <br /> form of art."
                    </p>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="py-32 text-center reveal-section bg-[#050505] relative border-t border-white/10">
                <RevealText>
                    <h2 className="font-display text-5xl md:text-8xl mb-8 tracking-tighter text-white/90">
                        RESERVE YOUR <br /> EXPERIENCE
                    </h2>
                    <p className="text-white/50 mb-12 max-w-md mx-auto text-lg font-light">
                        A table at Vertex is not just a meal. It is a memory.
                        Secure your place in the legacy.
                    </p>

                    <button
                        onClick={handleStartJourney}
                        className="px-12 py-5 border border-vertex-gold text-vertex-gold font-display text-sm tracking-widest hover:bg-vertex-gold hover:text-black transition-all duration-300 uppercase">
                        Book A Table
                    </button>
                </RevealText>
            </section>
        </div>
    );
};

export default OurStory;
