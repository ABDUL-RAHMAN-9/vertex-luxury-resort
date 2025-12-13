import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Wifi,
    Wind,
    Coffee,
    Star,
    ArrowRight,
    Maximize2,
    Users,
    ChevronDown,
} from "lucide-react";

// --- Types ---
interface AccommodationsProps {
    onBookRoom: () => void;
}

interface Suite {
    id: number;
    name: string;
    tagline: string;
    price: string;
    size: string;
    guests: string;
    desc: string;
    features: string[];
    image: string;
}

// --- Helper: Scroll To Top ---
const ScrollToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
};

// --- Helper: Reveal Hook ---
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

// --- DATA: Suites ---
const suites: Suite[] = [
    {
        id: 1,
        name: "The Presidential Suite",
        tagline: "The Pinnacle of Privacy",
        price: "$1,200",
        size: "120m²",
        guests: "4 Guests",
        desc: "An expansive sanctuary occupying the entire top floor. Featuring a private dining room for in-suite chef service, a grand piano, and a wrap-around terrace offering panoramic views of the skyline.",
        features: [
            "Private Chef Access",
            "Grand Piano",
            "Wrap-around Terrace",
            "Marble Jacuzzi",
        ],
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Ocean Deluxe",
        tagline: "Serenity by the Sea",
        price: "$850",
        size: "85m²",
        guests: "2 Guests",
        desc: "Wake up to the rhythm of the waves. This suite features floor-to-ceiling glass walls that vanish to merge the indoors with the ocean breeze. Includes a freestanding soaking tub overlooking the horizon.",
        features: [
            "Ocean View",
            "Private Balcony",
            "Rain Shower",
            "King Size Bed",
        ],
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Spa Sanctuary",
        tagline: "Restoration First",
        price: "$600",
        size: "60m²",
        guests: "2 Guests",
        desc: "Designed for the ultimate detox. Located adjacent to our wellness center, this room includes in-room massage tables, an aromatherapy steam shower, and a curated menu of herbal teas.",
        features: [
            "In-room Massage",
            "Steam Shower",
            "Aromatherapy",
            "Sound Isolation",
        ],
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Skyline Bath",
        tagline: "Urban Solitude",
        price: "$550",
        size: "55m²",
        guests: "2 Guests",
        desc: "A moody, intimate space designed for the modern aesthete. The centerpiece is a hand-carved stone bathtub positioned against a window framing the city lights. Perfect for post-dinner decompression.",
        features: ["Stone Bathtub", "City View", "Smart Controls", "Minibar"],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    },
];

// --- SUB-COMPONENT: Suite Item (Fixes the Hook Violation) ---
const SuiteItem = ({
    suite,
    index,
    onBookRoom,
}: {
    suite: Suite;
    index: number;
    onBookRoom: () => void;
}) => {
    // Calling Hook HERE is safe because this is a component, not a loop inside the parent
    const { ref, isVisible } = useReveal();
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center transition-all duration-1000 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
            }`}>
            {/* Image Side */}
            <div
                className={`w-full lg:w-3/5 h-[500px] md:h-[600px] relative overflow-hidden group ${
                    isEven ? "lg:order-1" : "lg:order-2"
                }`}>
                <div className="absolute inset-0 bg-vertex-gold/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                    src={suite.image}
                    alt={suite.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-6 py-3 border border-white/10 flex items-center gap-4">
                    <span className="text-white font-display text-xl">
                        {suite.price}
                    </span>
                    <span className="text-white/40 text-xs uppercase tracking-widest">
                        Per Night
                    </span>
                </div>
            </div>

            {/* Text Side */}
            <div
                className={`w-full lg:w-2/5 space-y-8 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                }`}>
                <div>
                    <span className="text-vertex-gold text-xs font-bold tracking-[0.3em] uppercase block mb-3">
                        {suite.tagline}
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                        {suite.name}
                    </h2>
                    <div className="w-12 h-[1px] bg-white/20 mb-6" />
                    <p className="text-white/60 font-light leading-relaxed text-lg">
                        {suite.desc}
                    </p>
                </div>

                {/* Amenities Grid */}
                <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-white/10">
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                        <Maximize2 className="w-4 h-4 text-vertex-gold" />{" "}
                        {suite.size}
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                        <Users className="w-4 h-4 text-vertex-gold" />{" "}
                        {suite.guests}
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                        <Wifi className="w-4 h-4 text-vertex-gold" /> High-Speed
                        Wifi
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                        <Wind className="w-4 h-4 text-vertex-gold" /> AC /
                        Climate
                    </div>
                </div>

                {/* Unique Features */}
                <div className="flex flex-wrap gap-3">
                    {suite.features.map((feat) => (
                        <span
                            key={feat}
                            className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-white/50 hover:border-vertex-gold hover:text-vertex-gold transition-colors cursor-default">
                            {feat}
                        </span>
                    ))}
                </div>

                <button
                    onClick={onBookRoom}
                    className="group flex items-center gap-3 bg-white text-black px-8 py-4 font-display text-sm tracking-widest uppercase hover:bg-vertex-gold transition-colors duration-300">
                    Book This Suite
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const Accommodations = ({ onBookRoom }: AccommodationsProps) => {
    return (
        <div className="bg-[#050505] min-h-screen text-[#Eaeaea] font-sans selection:bg-vertex-gold selection:text-black">
            <ScrollToTop />

            {/* --- NAV --- */}
            <nav
                className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference flex justify-between items-center animate-fade-in opacity-0"
                style={{ animationFillMode: "forwards" }}>
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-sm font-display tracking-widest uppercase hover:text-vertex-gold transition-colors text-white">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Resort
                </Link>
                <div className="font-display font-bold text-xl tracking-widest text-white">
                    VERTEX
                </div>
            </nav>

            {/* --- HERO --- */}
            <header className="relative h-[80vh] flex flex-col justify-center px-6 md:px-24 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover animate-slow-zoom"
                        alt="Luxury Suite"
                    />
                </div>

                <div className="relative z-20 max-w-4xl pt-20">
                    <p className="text-vertex-gold text-xs font-bold tracking-[0.4em] uppercase animate-fade-in mb-6">
                        The Residences
                    </p>
                    <h1
                        className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-white animate-fade-up opacity-0"
                        style={{
                            animationDelay: "200ms",
                            animationFillMode: "forwards",
                        }}>
                        EXTEND THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                            EVENING.
                        </span>
                    </h1>
                    <p
                        className="mt-8 text-white/60 text-lg md:text-xl font-light max-w-2xl animate-fade-up opacity-0"
                        style={{
                            animationDelay: "400ms",
                            animationFillMode: "forwards",
                        }}>
                        When the final course is served and the wine is
                        finished, retreat to your private sanctuary. Designed
                        for deep rest and sensory restoration.
                    </p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-white">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </header>

            {/* --- SUITES LIST (Using Sub-Component) --- */}
            <section className="py-24 space-y-32">
                {suites.map((suite, index) => (
                    <SuiteItem
                        key={suite.id}
                        suite={suite}
                        index={index}
                        onBookRoom={onBookRoom}
                    />
                ))}
            </section>

            {/* --- AMENITIES OVERVIEW --- */}
            <section className="py-24 bg-[#080808] border-t border-white/5">
                <div className="container mx-auto px-6 text-center mb-16">
                    <h3 className="font-display text-3xl text-white mb-4">
                        INCLUDED PRIVILEGES
                    </h3>
                    <p className="text-white/40 font-light">
                        Every stay includes access to our signature services.
                    </p>
                </div>
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Coffee, label: "Gourmet Breakfast" },
                        { icon: Star, label: "24h Concierge" },
                        { icon: Wind, label: "Spa Access" },
                        { icon: Wifi, label: "Private Lounge" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-4 p-8 border border-white/5 hover:border-vertex-gold/50 transition-colors duration-300 group">
                            <item.icon className="w-6 h-6 text-white/30 group-hover:text-vertex-gold transition-colors" />
                            <span className="text-sm font-bold tracking-widest uppercase text-white/60 group-hover:text-white">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA FOOTER --- */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
                {/* 1. Atmospheric Background (Parallax feel) */}
                <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale contrast-125" />

                {/* 2. Gradient Overlay for fade-out effect */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

                {/* 3. Content */}
                <div className="relative z-20 text-center px-6">
                    {/* Small Label */}
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-vertex-gold" />
                        <span className="text-vertex-gold text-xs font-bold tracking-[0.4em] uppercase animate-pulse">
                            The Final Step
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h2 className="font-display text-5xl md:text-8xl lg:text-9xl text-white tracking-tighter mb-8 mix-blend-overlay">
                        CLAIM YOUR <br />
                        <span className="text-white/80 italic font-serif tracking-normal">
                            Sanctuary.
                        </span>
                    </h2>

                    <p className="text-white/60 font-light text-lg max-w-lg mx-auto mb-12 leading-relaxed">
                        The finest rooms are often reserved before the evening
                        begins. Secure your unparalleled experience now.
                    </p>

                    {/* Luxury Button */}
                    <button
                        onClick={onBookRoom}
                        className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black overflow-hidden transition-all duration-500 hover:bg-vertex-gold hover:text-black hover:scale-105">
                        {/* Button Text */}
                        <span className="relative z-10 font-display font-bold tracking-widest text-sm uppercase">
                            Check Availability
                        </span>

                        {/* Icon */}
                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Accommodations;
