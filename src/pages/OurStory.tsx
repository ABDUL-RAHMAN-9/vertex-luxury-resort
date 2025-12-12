import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Clock,
    PenTool,
    Award,
    Quote,
    ChevronDown,
} from "lucide-react";
import { set } from "date-fns";
// --- Helper: Scroll To Top ---
const ScrollToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
};

const OurStory = () => {
    const navigate = useNavigate();

    const handleStartJourney = () => {
        navigate("/"); // go to home page and then smoothly scroll to footer
        setTimeout(() => {
            const footer = document.getElementById("footer");
            if (footer) {
                footer.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    const [visibleSections, setVisibleSections] = useState<Set<string>>(
        new Set()
    );
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) =>
                            new Set(prev).add(entry.target.id)
                        );
                    }
                });
            },
            { threshold: 0.15 }
        );

        const sections = document.querySelectorAll(".reveal-section");
        sections.forEach((el) => observer.current?.observe(el));

        return () => observer.current?.disconnect();
    }, []);

    const isVisible = (id: string) => visibleSections.has(id);

    return (
        <div className="bg-vertex-black min-h-screen text-white overflow-x-hidden selection:bg-vertex-gold selection:text-black">
            <ScrollToTop />

            {/* --- NAVIGATION --- */}
            <nav
                className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference flex justify-between items-center animate-fade-in opacity-0"
                style={{ animationFillMode: "forwards" }}>
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-sm font-display tracking-widest uppercase hover:text-vertex-gold transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Resort
                </Link>
                <div className="font-display font-bold text-xl tracking-widest">
                    VERTEX
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 fixed-bg"
                    style={{ backgroundAttachment: "fixed" }}
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-vertex-black" />

                <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
                    {/* Fixed Blink: Added opacity-0 class so it hides until animation starts */}
                    <p
                        className="text-vertex-gold text-xs font-bold tracking-[0.4em] uppercase animate-fade-in opacity-0"
                        style={{ animationFillMode: "forwards" }}>
                        Est. 2025
                    </p>

                    <h1
                        className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-none font-bold tracking-tighter animate-fade-up opacity-0 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
                        style={{
                            animationDelay: "200ms",
                            animationFillMode: "forwards",
                        }}>
                        THE GENESIS
                    </h1>

                    <p
                        className="max-w-xl mx-auto text-white/80 font-light text-lg md:text-xl leading-relaxed animate-fade-up opacity-0"
                        style={{
                            animationDelay: "500ms",
                            animationFillMode: "forwards",
                        }}>
                        Where architectural Brutalism meets the warmth of
                        organic luxury. This is the story of how Vertex
                        redefined the skyline.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 animate-bounce duration-[2000ms] opacity-50">
                    <ChevronDown className="w-6 h-6 text-white" />
                </div>
            </header>

            {/* --- CHAPTER 1: THE VISION --- */}
            <section
                id="vision"
                className="py-32 container mx-auto px-6 reveal-section">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Image Side */}
                    <div
                        className={`md:w-1/2 transition-all duration-1000 ease-out ${
                            isVisible("vision")
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-20"
                        }`}>
                        <div className="relative group overflow-hidden">
                            <div className="absolute inset-0 bg-vertex-gold/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop"
                                alt="Architectural Sketch"
                                className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                            />
                            {/* Floating Quote Card */}
                            <div className="absolute -bottom-6 -right-6 bg-vertex-gold p-8 max-w-xs shadow-2xl hidden md:block z-20 transition-transform duration-500 hover:-translate-y-2">
                                <Quote className="w-8 h-8 text-black mb-4 opacity-50" />
                                <p className="text-black font-serif italic text-lg leading-relaxed">
                                    "We wanted to build something that felt like
                                    it had always been there, yet looked like
                                    nothing else."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div
                        className={`md:w-1/2 space-y-8 transition-all duration-1000 delay-300 ease-out ${
                            isVisible("vision")
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-20"
                        }`}>
                        <h2 className="font-display text-4xl md:text-6xl text-white">
                            CHAPTER I: <br />
                            <span className="text-white/30">THE SKETCH</span>
                        </h2>
                        <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg border-l border-white/10 pl-8">
                            <p>
                                It began with a single line on a napkin in a
                                cafe in Zurich. Our lead architect, Adrian
                                Vertex, envisioned a structure that didn't just
                                house people, but elevated their state of mind.
                            </p>
                            <p>
                                The challenge was impossible: create a monolith
                                of concrete and glass that felt warm, inviting,
                                and intimate.
                            </p>
                            <p>
                                Three years of construction. 12,000 tons of raw
                                concrete. One singular vision. The result is a
                                building that breathes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CHAPTER 2: THE PHILOSOPHY (Faster Grid) --- */}
            <section
                id="philosophy"
                className="py-32 bg-white/5 reveal-section relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-vertex-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-vertex-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">
                            Our Core Values
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl">
                            DESIGNED FOR SENSES
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: PenTool,
                                title: "Architectural Integrity",
                                text: "Every curve and corner serves a purpose. We believe beauty lies in functionality.",
                            },
                            {
                                icon: Clock,
                                title: "Timeless Silence",
                                text: "Our walls are engineered for absolute acoustics. In a noisy world, silence is the ultimate luxury.",
                            },
                            {
                                icon: Award,
                                title: "Uncompromising Service",
                                text: "We don't use scripts. Our staff is trained to anticipate needs before you even realize them.",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                // UPDATED: Changed duration-500 to duration-300 for snappier hover
                                className={`p-10 border border-white/10 bg-vertex-black/50 backdrop-blur-sm 
                                hover:border-vertex-gold hover:bg-white/10 hover:-translate-y-2
                                transition-all duration-300 group cursor-default
                                ${
                                    isVisible("philosophy")
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                }`}
                                style={{ transitionDelay: `${idx * 150}ms` }}>
                                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-vertex-gold group-hover:text-black transition-colors duration-300">
                                    <item.icon className="w-6 h-6 text-vertex-gold group-hover:text-black transition-colors duration-300" />
                                </div>
                                <h3 className="font-display text-xl mb-4 tracking-wide text-white group-hover:text-vertex-gold transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- IMAGE BREAK --- */}
            <section className="h-[70vh] relative reveal-section overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
                    style={{ backgroundAttachment: "fixed" }}
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <h2
                        className={`font-serif italic text-4xl md:text-6xl text-white text-center px-4 leading-tight transition-all duration-1000 delay-300
                        ${
                            isVisible("philosophy")
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-90"
                        }`}>
                        "Luxury is the absence <br /> of necessary things."
                    </h2>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="py-32 text-center reveal-section bg-vertex-black relative">
                <div
                    className={`transition-all duration-1000 ${
                        isVisible("philosophy")
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <h2 className="font-display text-5xl md:text-8xl mb-8 tracking-tighter text-white/90">
                        BE PART OF <br /> THE LEGACY
                    </h2>
                    <p className="text-white/50 mb-12 max-w-md mx-auto text-lg font-light">
                        The next chapter is yours to write. Experience the
                        Vertex legacy firsthand.
                    </p>

                    <button
                        onClick={handleStartJourney}
                        className="px-12 py-5 border border-vertex-gold text-vertex-gold font-display text-sm tracking-widest hover:bg-vertex-gold hover:text-black transition-all duration-300 uppercase">
                        Start Your Journey
                    </button>
                </div>
            </section>
        </div>
    );
};

export default OurStory;
