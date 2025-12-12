import heroBuilding from "@/assets/hero-building.jpg";

interface HeroSectionProps {
    onBookRoom: () => void;
    onBookTable: () => void;
}

const HeroSection = ({ onBookRoom, onBookTable }: HeroSectionProps) => {
    return (
        <section id="home" className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Black with VERTEX */}
            <div className="lg:w-1/2 bg-primary flex flex-col justify-center items-center lg:items-start px-8 lg:px-16 py-24 lg:py-0 min-h-[60vh] lg:min-h-screen relative">
                <div className="max-w-lg">
                    <h1 className="font-display text-primary-foreground text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tight leading-none animate-fade-up">
                        VERTEX
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-16">
                        <p
                            className="text-muted-foreground text-sm leading-relaxed uppercase tracking-wide animate-fade-up"
                            style={{ animationDelay: "200ms" }}>
                            Whether you're in the mood for a hearty breakfast, a
                            light lunch, or a romantic dinner, our menu has
                            something for everyone.
                        </p>
                        <p
                            className="text-muted-foreground text-sm leading-relaxed uppercase tracking-wide animate-fade-up"
                            style={{ animationDelay: "400ms" }}>
                            At Hotel Vertex, we believe that great food should
                            be available to everyone, no matter the time of day.
                        </p>
                    </div>
                </div>

                {/* Floating Buttons - Mobile */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12 lg:hidden">
                    <button
                        onClick={onBookRoom}
                        className="px-8 py-3 border border-primary-foreground text-primary-foreground font-display text-sm tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                        BOOK A SUITE
                    </button>
                    <button
                        onClick={onBookTable}
                        className="px-8 py-3 border border-primary-foreground text-primary-foreground font-display text-sm tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                        RESERVE TABLE
                    </button>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-1/2 relative min-h-[40vh] lg:min-h-screen">
                <img
                    src={heroBuilding}
                    alt="VERTEX Hotel Modern Architecture"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Floating Buttons - Desktop */}
                <div className="hidden lg:flex absolute bottom-16 left-1/2 -translate-x-1/2 gap-4 z-10">
                    <button
                        onClick={onBookRoom}
                        className="px-8 py-3 border border-primary-foreground bg-transparent text-primary-foreground font-display text-sm tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300 backdrop-blur-sm">
                        BOOK A SUITE
                    </button>
                    <button
                        onClick={onBookTable}
                        className="px-8 py-3 border border-foreground bg-background text-foreground font-display text-sm tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
                        RESERVE TABLE
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
