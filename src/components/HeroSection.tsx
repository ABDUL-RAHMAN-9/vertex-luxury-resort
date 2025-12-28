import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBuilding from "@/assets/admiralty-embankment-night.jpg";

interface HeroSectionProps {
    onBookRoom: () => void;
    onBookTable: () => void;
}

const HeroSection = ({ onBookRoom, onBookTable }: HeroSectionProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section
            id="home"
            className="relative w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-[#050505]">
            {/* --- BACKGROUND IMAGE (Mobile Background / Desktop Side) --- */}
            {/* On mobile, this fills the screen. On desktop, it takes the right 45% */}
            <div className="absolute inset-0 lg:relative lg:w-[45%] lg:order-2 h-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 lg:bg-black/10 z-10" />
                <img
                    src={heroBuilding}
                    alt="VERTEX Hotel Modern Architecture"
                    className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out scale-110 ${
                        loaded ? "scale-100 opacity-100" : "scale-125 opacity-0"
                    }`}
                />
                {/* Mobile-only gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent lg:hidden z-20" />
            </div>

            {/* --- CONTENT SIDE --- */}
            <div className="relative z-30 lg:w-[55%] lg:order-1 h-full flex flex-col justify-end lg:justify-center px-6 md:px-12 lg:px-24 pb-20 lg:py-0 bg-transparent lg:bg-[#050505]">
                {/* Animated Decor Line */}
                <div
                    className={`w-16 h-[1px] bg-vertex-gold mb-6 md:mb-8 transition-all duration-1000 delay-300 ${
                        loaded
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-10"
                    }`}
                />

                {/* Main Title - Responsive sizing */}
                <div className="overflow-hidden">
                    <h1
                        className={`font-display text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] leading-[0.85] font-bold tracking-tighter text-white transition-all duration-1000 ease-out ${
                            loaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-[100%] opacity-0"
                        }`}>
                        VERTEX
                    </h1>
                </div>

                <div className="overflow-hidden mb-8 md:mb-12">
                    <h2
                        className={`font-serif italic text-xl md:text-3xl text-vertex-gold/90 mt-2 transition-all duration-1000 delay-200 ease-out ${
                            loaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-[100%] opacity-0"
                        }`}>
                        The Pinnacle of Luxury
                    </h2>
                </div>

                {/* Text Content Grid - Simplified for Mobile */}
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl transition-all duration-1000 delay-500 ${
                        loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-light tracking-wide border-l border-vertex-gold/30 pl-4">
                        Experience an atmosphere where architectural brilliance
                        meets unparalleled service. Curated for the discerning.
                    </p>
                    <p className="hidden md:block text-white/70 text-sm md:text-base leading-relaxed font-light tracking-wide border-l border-white/10 pl-4">
                        From award-winning culinary arts to suites that redefine
                        comfort, VERTEX is an escape into refined elegance.
                    </p>
                </div>

                {/* CTA Buttons - Premium Glass Style */}
                <div
                    className={`flex flex-col sm:flex-row gap-4 md:gap-6 mt-10 md:mt-16 transition-all duration-1000 delay-700 ${
                        loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <button
                        onClick={onBookRoom}
                        className="group relative px-8 py-4 bg-white text-black font-display font-bold tracking-widest text-[10px] md:text-xs overflow-hidden transition-all duration-300 hover:bg-vertex-gold">
                        <span className="relative flex items-center justify-center gap-2">
                            BOOK A SUITE{" "}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </button>

                    <button
                        onClick={onBookTable}
                        className="group relative px-8 py-4 border border-white/20 text-white font-display font-bold tracking-widest text-[10px] md:text-xs backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-vertex-gold">
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-500">
                            RESERVE TABLE
                        </span>
                    </button>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-6 md:left-24 animate-bounce hidden md:flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/30">
                    <div className="w-px h-8 bg-white/20" />
                    Scroll
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
