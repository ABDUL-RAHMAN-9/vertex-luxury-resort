import { useEffect, useRef, useState } from "react";
import { Star, ShieldCheck, Gem } from "lucide-react";
import lobbyImage from "@/assets/lobby.jpg";

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        // FIXED: Captured current ref value here
        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            // FIXED: Using the captured variable instead of sectionRef.current
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 lg:py-40 bg-vertex-offwhite overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                    <div className="lg:w-1/2 relative group">
                        <div
                            className={`absolute -inset-4 border border-vertex-black/10 transition-all duration-1000 ease-out z-0 hidden lg:block ${
                                isVisible
                                    ? "scale-100 opacity-100"
                                    : "scale-95 opacity-0"
                            }`}
                        />
                        <div className="relative overflow-hidden z-10">
                            <div
                                className={`absolute inset-0 bg-vertex-offwhite z-20 transition-transform duration-[1200ms] ease-in-out origin-top ${
                                    isVisible ? "scale-y-0" : "scale-y-100"
                                }`}
                            />
                            <img
                                src={lobbyImage}
                                alt="VERTEX Hotel Lobby"
                                className={`w-full h-[500px] lg:h-[800px] object-cover transition-transform duration-[2000ms] ease-out ${
                                    isVisible ? "scale-100" : "scale-110"
                                } group-hover:scale-105`}
                            />
                            <div
                                className={`absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 max-w-[200px] border border-white/20 shadow-2xl transition-all duration-1000 delay-700 ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                }`}>
                                <div className="flex gap-1 mb-2 text-vertex-gold">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <p className="font-display text-lg leading-tight text-vertex-black">
                                    Voted #1 Design Hotel 2024
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <span
                                className={`inline-block text-vertex-gold text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700 delay-300 ${
                                    isVisible
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-4"
                                }`}>
                                Since 2024
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-vertex-black">
                                <span
                                    className={`block transition-all duration-700 delay-400 ${
                                        isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}>
                                    THE EPITOME OF
                                </span>
                                <span
                                    className={`block font-serif italic font-normal text-vertex-gray mt-2 transition-all duration-700 delay-500 ${
                                        isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}>
                                    Timeless Luxury
                                </span>
                            </h2>
                        </div>
                        <div
                            className={`space-y-8 text-muted-foreground leading-relaxed text-base md:text-lg font-light transition-all duration-1000 delay-700 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}>
                            <p className="border-l-2 border-vertex-gold/30 pl-6">
                                We don't just offer rooms; we curate
                                sanctuaries. Designed by world-renowned
                                architects, Vertex merges industrial chic with
                                organic warmth, creating an atmosphere that is
                                both imposing and intimate.
                            </p>
                            <p>
                                Every suite is an observation deck to the city's
                                pulse, equipped with artisanal amenities,
                                acoustic isolation, and smart-environment
                                controls tailored to your rhythm.
                            </p>
                        </div>
                        <div
                            className={`grid grid-cols-2 gap-6 pt-4 transition-all duration-1000 delay-1000 ${
                                isVisible ? "opacity-100" : "opacity-0"
                            }`}>
                            <div className="flex items-start gap-3 group">
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                                    <Gem className="w-5 h-5 text-vertex-gold" />
                                </div>
                                <div>
                                    <h4 className="font-display text-sm font-bold text-vertex-black mb-1">
                                        World Class
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        Top 1% Global Rating
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                                    <ShieldCheck className="w-5 h-5 text-vertex-gold" />
                                </div>
                                <div>
                                    <h4 className="font-display text-sm font-bold text-vertex-black mb-1">
                                        Private Access
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        VIP Entry & Exit
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`pt-4 transition-all duration-1000 delay-[1200ms] ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}>
                            <a
                                href="#"
                                className="inline-block border-b border-vertex-black pb-1 text-sm tracking-widest uppercase hover:text-vertex-gold hover:border-vertex-gold transition-colors duration-300">
                                Discover Our Story
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
