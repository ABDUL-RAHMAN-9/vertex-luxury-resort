import { useEffect, useRef, useState } from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import spaBath from "@/assets/spa-bath.jpg";
import restaurantBar from "@/assets/restaurant-bar.jpg";

// --- Sub-Component: Enhanced Review Card ---
interface ReviewCardProps {
    name: string;
    date: string;
    rating: number; // Changed to number for star loop
    comment: string;
    avatar: string;
    position: "left" | "right";
}

const ReviewCard = ({
    name,
    date,
    rating,
    comment,
    avatar,
    position,
}: ReviewCardProps) => (
    <div
        className={`absolute bottom-8 ${
            position === "left"
                ? "left-6 md:left-[-2rem]"
                : "right-6 md:right-[-2rem]"
        } 
        w-[90%] md:w-[320px] bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-2xl 
        transform transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 z-20`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
            <div className="relative">
                <img
                    src={avatar}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover border border-white/30"
                />
                <div className="absolute -bottom-1 -right-1 bg-vertex-gold rounded-full p-[2px]">
                    <CheckCircle className="w-2.5 h-2.5 text-black" />
                </div>
            </div>
            <div>
                <p className="text-white font-display text-sm tracking-wide">
                    {name}
                </p>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">
                    {date}
                </p>
            </div>
            <div className="ml-auto">
                <Quote className="w-4 h-4 text-vertex-gold/50" />
            </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${
                        i < rating
                            ? "fill-vertex-gold text-vertex-gold"
                            : "text-gray-500"
                    }`}
                />
            ))}
        </div>

        {/* Comment */}
        <p className="text-white/80 text-xs font-light italic leading-relaxed">
            "{comment}"
        </p>
    </div>
);

// --- Main Component ---
const FeatureSections = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <section
            id="wellness"
            ref={sectionRef}
            className="py-24 lg:py-40 bg-vertex-black text-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 space-y-32 lg:space-y-40">
                {/* --- FEATURE 1: SPA & WELLNESS (Left Image) --- */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center group">
                    {/* Image Side */}
                    <div
                        className={`lg:w-1/2 relative transition-all duration-1000 delay-200 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        }`}>
                        {/* Image Container with Reveal */}
                        <div className="relative overflow-hidden h-[450px] lg:h-[600px] w-full">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src={spaBath}
                                alt="VERTEX Spa Experience"
                                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                            />
                        </div>

                        {/* Floating Review Card */}
                        <ReviewCard
                            name="Hannah S."
                            date="Stayed Oct 2025"
                            rating={5}
                            comment="The spa services are world-class. I've never felt more rejuvenated."
                            avatar="https://images.unsplash.com/photo-1545912453-865b693e5561?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
                            position="left"
                        />
                    </div>

                    {/* Text Side */}
                    <div
                        className={`lg:w-1/2 space-y-8 transition-all duration-1000 delay-300 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10"
                        }`}>
                        <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-vertex-gold" />
                            <p className="text-vertex-gold text-xs uppercase tracking-[0.3em] font-bold">
                                Wellness Sanctuary
                            </p>
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                            INDULGE IN <br />
                            <span className="font-serif italic font-normal text-white/50 group-hover:text-white transition-colors duration-500">
                                Absolute Serenity
                            </span>
                        </h2>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md font-light border-l border-white/10 pl-6">
                            Escape the city's rhythm and find your own. Our
                            wellness center offers treatments inspired by
                            ancient rituals, paired with modern hydrotherapy
                            technology.
                        </p>

                        <Link to="/wellness">
                            <button className="text-xs font-bold tracking-widest uppercase border-b border-white/30 pb-2 hover:text-vertex-gold hover:border-vertex-gold transition-all duration-300">
                                Explore Treatments
                            </button>
                        </Link>
                    </div>
                </div>

                {/* --- FEATURE 2: BAR & NIGHTLIFE (Right Image) --- */}
                <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 items-center group">
                    {/* Image Side */}
                    <div
                        className={`lg:w-1/2 relative transition-all duration-1000 delay-400 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10"
                        }`}>
                        <div className="relative overflow-hidden h-[450px] lg:h-[600px] w-full">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src={restaurantBar}
                                alt="VERTEX Restaurant Bar"
                                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                            />
                        </div>

                        <ReviewCard
                            name="Percy W."
                            date="Dined Nov 2025"
                            rating={5}
                            comment="The cocktail menu is an absolute masterpiece. The atmosphere is electric."
                            avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            position="right"
                        />
                    </div>

                    {/* Text Side */}
                    <div
                        className={`lg:w-1/2 space-y-8 transition-all duration-1000 delay-500 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        }`}>
                        <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-vertex-gold" />
                            <p className="text-vertex-gold text-xs uppercase tracking-[0.3em] font-bold">
                                Social & Nightlife
                            </p>
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                            A TASTE OF THE <br />
                            <span className="font-serif italic font-normal text-white/50 group-hover:text-white transition-colors duration-500">
                                High Life
                            </span>
                        </h2>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md font-light border-l border-white/10 pl-6">
                            From the freshest seafood to the most succulent
                            steaks, every dish is crafted with care. By night,
                            our lounge transforms into the city's most exclusive
                            social destination.
                        </p>

                        <Link to="/dining-menu">
                            <button className="text-xs font-bold tracking-widest uppercase border-b border-white/30 pb-2 hover:text-vertex-gold hover:border-vertex-gold transition-all duration-300">
                                View Cocktail Menu
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSections;
