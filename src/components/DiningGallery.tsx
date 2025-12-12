import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel"; 
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    UtensilsCrossed,
} from "lucide-react";
import cocktail from "@/assets/cocktail.jpg";
import gourmetDish from "@/assets/gourmet-dish.jpg";
import winePour from "@/assets/wine-pour.jpg";
import pastry from "@/assets/pastry.jpg";

// Added dummy pricing/categories for a "Real App" feel
const items = [
    {
        src: cocktail,
        alt: "The Obsidian",
        category: "Signature Cocktail",
        price: "$24",
    },
    {
        src: gourmetDish,
        alt: "Wagyu A5 Tartare",
        category: "Main Course",
        price: "$120",
    },
    {
        src: winePour,
        alt: "Château Margaux",
        category: "Vintage Selection",
        price: "$450",
    },
    {
        src: pastry,
        alt: "Gold Leaf Éclair",
        category: "Patisserie",
        price: "$18",
    },
    {
        src: cocktail,
        alt: "Velvet Martini",
        category: "Lounge Bar",
        price: "$22",
    }, // Duplicate for scrolling length
];

interface DiningGalleryProps {
    onBookTable: () => void;
}

const DiningGallery = ({ onBookTable }: DiningGalleryProps) => {
    // 1. Initialize Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        dragFree: true, // Allows smooth "momentum" dragging
    });

    const [scrollProgress, setScrollProgress] = useState(0);

    // 2. Handle Scroll Progress Bar
    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("scroll", onScroll);
        emblaApi.on("reInit", onScroll);
    }, [emblaApi, onScroll]);

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    );
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    );

    return (
        <section
            id="dining"
            className="py-24 lg:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16">
                    <div className="relative">
                        {/* Decorative Background Number */}
                        <span className="absolute -top-20 -left-10 text-[10rem] font-display font-bold text-gray-50 opacity-50 select-none -z-10">
                            02
                        </span>

                        <div className="flex items-center gap-3 mb-4">
                            <UtensilsCrossed className="w-5 h-5 text-vertex-gold" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-vertex-gold">
                                Culinary Excellence
                            </span>
                        </div>

                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-vertex-black leading-[0.9]">
                            TASTE THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vertex-gold to-yellow-600">
                                EXTRAORDINARY
                            </span>
                        </h2>
                    </div>

                    {/* Header Controls (Desktop) */}
                    <div className="hidden lg:flex gap-4 items-center">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300 group">
                            <ChevronLeft
                                size={20}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300 group">
                            <ChevronRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                    </div>
                </div>

                {/* --- CAROUSEL SECTION --- */}
                <div className="relative">
                    {/* Embla Viewport */}
                    <div
                        className="overflow-hidden cursor-grab active:cursor-grabbing"
                        ref={emblaRef}>
                        <div className="flex touch-pan-y">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 px-4">
                                    <div className="group relative h-[500px] overflow-hidden bg-gray-100">
                                        {/* Image */}
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />

                                        {/* Dark Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
                                                <div>
                                                    <p className="text-vertex-gold text-xs font-bold tracking-widest uppercase mb-2">
                                                        {item.category}
                                                    </p>
                                                    <h3 className="font-display text-3xl">
                                                        {item.alt}
                                                    </h3>
                                                </div>
                                                <span className="font-serif italic text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    {item.price}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                <span className="text-xs tracking-widest uppercase">
                                                    View Details
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-vertex-gold" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-12 w-full h-[1px] bg-gray-200 relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-vertex-black transition-all duration-300 ease-out"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                </div>

                {/* --- FOOTER ACTIONS --- */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
                    <button
                        onClick={onBookTable}
                        className="px-10 py-4 bg-vertex-black text-white font-display text-sm tracking-widest hover:bg-vertex-gold transition-colors duration-300">
                        RESERVE A TABLE
                    </button>
                    <button className="px-10 py-4 border border-vertex-black text-vertex-black font-display text-sm tracking-widest hover:bg-gray-50 transition-colors duration-300">
                        DOWNLOAD MENU
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DiningGallery;
