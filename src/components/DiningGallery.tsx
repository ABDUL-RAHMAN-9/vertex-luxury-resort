import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cocktail from "@/assets/cocktail.jpg";
import gourmetDish from "@/assets/gourmet-dish.jpg";
import winePour from "@/assets/wine-pour.jpg";
import pastry from "@/assets/pastry.jpg";

interface DiningGalleryProps {
    onBookTable: () => void;
}

const DiningGallery = ({ onBookTable }: DiningGalleryProps) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const images = [
        { src: cocktail, alt: "Signature Cocktail" },
        { src: gourmetDish, alt: "Gourmet Dish" },
        { src: winePour, alt: "Fine Wine" },
        { src: pastry, alt: "Artisan Pastry" },
    ];

    const scroll = (direction: "left" | "right") => {
        const container = document.getElementById("dining-gallery");
        if (container) {
            const scrollAmount = 300;
            const newPosition =
                direction === "left"
                    ? Math.max(0, scrollPosition - scrollAmount)
                    : scrollPosition + scrollAmount;

            container.scrollTo({ left: newPosition, behavior: "smooth" });
            setScrollPosition(newPosition);
        }
    };

    return (
        <section id="dining" className="py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight">
                            RESTAURANT
                        </h2>
                        <p className="text-muted-foreground text-sm uppercase tracking-wide max-w-xs">
                            Relax and unwind with our delicious offerings,
                            available any time of day.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onBookTable}
                            className="px-6 py-3 border border-foreground text-foreground font-display text-sm tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
                            BOOK A TABLE
                        </button>
                        <button className="px-6 py-3 border border-foreground text-foreground font-display text-sm tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
                            VIEW THE MENU
                        </button>
                    </div>
                </div>

                {/* Gallery */}
                <div
                    id="dining-gallery"
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-8"
                    onScroll={(e) =>
                        setScrollPosition((e.target as HTMLElement).scrollLeft)
                    }>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-64 md:w-72 lg:w-80">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-80 lg:h-96 object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center gap-6 mt-8">
                    <button
                        onClick={() => scroll("left")}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DiningGallery;
