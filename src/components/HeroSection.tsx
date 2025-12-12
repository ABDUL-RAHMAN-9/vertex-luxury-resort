import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";

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
            className="relative w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-vertex-black">
            {/* --- LEFT SIDE: Content --- */}
            <div className="lg:w-[55%] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 relative z-20 bg-primary text-primary-foreground">
                {/* Animated Decor Line */}
                <div
                    className={`w-20 h-[1px] bg-vertex-gold mb-8 transition-all duration-1000 delay-300 ${
                        loaded ? "w-20 opacity-100" : "w-0 opacity-0"
                    }`}
                />

                {/* Main Title */}
                <div className="overflow-hidden">
                    <h1
                        className={`font-display text-[5rem] md:text-[7rem] lg:text-[9rem] leading-[0.9] font-bold tracking-normal transition-transform duration-1000 ease-out ${
                            loaded ? "translate-y-0" : "translate-y-[110%]"
                        }`}>
                        VERTEX
                    </h1>
                </div>

                <div className="overflow-hidden mb-12">
                    <h2
                        className={`font-serif italic text-2xl md:text-3xl text-vertex-gray mt-2 transition-transform duration-1000 delay-100 ease-out ${
                            loaded ? "translate-y-0" : "translate-y-[110%]"
                        }`}>
                        The Pinnacle of Luxury
                    </h2>
                </div>

                {/* Text Content Grid */}
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl transition-all duration-1000 delay-300 ${
                        loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <p className="text-vertex-offwhite/80 text-sm md:text-base leading-relaxed font-light tracking-wide border-l border-white/10 pl-4">
                        Experience an atmosphere where architectural brilliance
                        meets unparalleled service. Every detail is curated for
                        the discerning traveler.
                    </p>
                    <p className="text-vertex-offwhite/80 text-sm md:text-base leading-relaxed font-light tracking-wide border-l border-white/10 pl-4">
                        From award-winning culinary arts to suites that redefine
                        comfort, VERTEX offers an escape into a world of refined
                        elegance.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div
                    className={`flex flex-col sm:flex-row gap-5 mt-16 transition-all duration-1000 delay-500 ${
                        loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <button
                        onClick={onBookRoom}
                        className="group relative px-8 py-4 bg-white text-black font-display font-medium tracking-widest text-sm overflow-hidden hover:text-white transition-colors duration-300">
                        <span className="absolute inset-0 bg-vertex-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                        <span className="relative flex items-center gap-2">
                            BOOK A SUITE <ArrowRight className="w-4 h-4" />
                        </span>
                    </button>

                    <button
                        onClick={onBookTable}
                        className="group relative px-8 py-4 border border-white/30 text-white font-display font-medium tracking-widest text-sm overflow-hidden hover:border-white transition-colors duration-300">
                        <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                        <span className="relative flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                            RESERVE TABLE
                        </span>
                    </button>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-6 md:left-24 animate-bounce duration-[2000ms] text-white/50 hidden md:flex items-center gap-2 text-xs tracking-widest uppercase">
                    <ChevronDown className="w-4 h-4" /> Scroll to explore
                </div>
            </div>

            {/* --- RIGHT SIDE: Image --- */}
            <div className="lg:w-[45%] relative h-[40vh] lg:h-full overflow-hidden group">
                {/* Overlay for mood */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />

                <img
                    src={heroBuilding}
                    alt="VERTEX Hotel Modern Architecture"
                    className="absolute inset-0 w-full h-full object-cover animate-ken-burns transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                />
            </div>
        </section>
    );
};

export default HeroSection;
