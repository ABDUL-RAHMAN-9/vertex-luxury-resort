import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Flower2, Droplets, Wind, ChevronDown } from "lucide-react";

const Wellness = () => {
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

            // Update Navbar state
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBooking = () => {
        navigate("/");
        // Logic to scroll to booking section on home
    };

    const treatments = [
        {
            category: "Massage Therapies",
            items: [
                {
                    name: "The Vertex Signature Ritual",
                    duration: "90 min",
                    price: "$260",
                    desc: "A bespoke blend of Swedish, Deep Tissue, and Aromatherapy techniques designed to rebalance energy.",
                },
                {
                    name: "Himalayan Hot Stone Therapy",
                    duration: "75 min",
                    price: "$210",
                    desc: "Warm Himalayan salt stones release deep muscular stress while mineral-rich heat detoxifies.",
                },
                {
                    name: "Tranquility Sleep Massage",
                    duration: "60 min",
                    price: "$190",
                    desc: "A slow, rhythmic treatment using lavender and chamomile oils to calm the nervous system.",
                },
            ],
        },
        {
            category: "Facial Treatments",
            items: [
                {
                    name: "24K Gold Radiance Facial",
                    duration: "75 min",
                    price: "$380",
                    desc: "A red-carpet facial infused with pure gold leaf to boost collagen and deliver a luminous glow.",
                },
                {
                    name: "Deep Hydration Marine Facial",
                    duration: "60 min",
                    price: "$180",
                    desc: "A moisture-rich treatment powered by hyaluronic acid and marine botanicals.",
                },
            ],
        },
        {
            category: "Body Rituals",
            items: [
                {
                    name: "Detox Seaweed Wrap",
                    duration: "75 min",
                    price: "$240",
                    desc: "A thermal wrap infused with nutrient-dense seaweed extracts to detoxify and firm the skin.",
                },
                {
                    name: "Coconut Milk & Sugar Polish",
                    duration: "60 min",
                    price: "$170",
                    desc: "A full-body exfoliation using organic sugar crystals and warm coconut milk.",
                },
            ],
        },
        {
            category: "Holistic Experiences",
            items: [
                {
                    name: "Sound Bath Therapy",
                    duration: "45 min",
                    price: "$140",
                    desc: "Immersive vibrational healing using crystal singing bowls to calm the mind.",
                },
                {
                    name: "Reiki Energy Healing",
                    duration: "60 min",
                    price: "$160",
                    desc: "A gentle technique that promotes emotional clarity and energetic alignment.",
                },
            ],
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white selection:bg-vertex-gold selection:text-black">
            {/* --- PROGRESS BAR (Left Side) --- */}
            <div className="fixed left-0 top-0 h-full w-[2px] bg-white/5 z-[60] hidden lg:block">
                <div
                    className="w-full bg-vertex-gold transition-all duration-100 ease-out"
                    style={{ height: `${scrollProgress * 100}%` }}
                />
            </div>

            {/* --- SMART GLASSY NAVIGATION --- */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? "py-4 bg-black/70 backdrop-blur-md border-b border-white/10"
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
                        <span className="hidden sm:inline">Back to Resort</span>
                    </Link>

                    <div
                        className={`font-display font-bold text-xl md:text-2xl tracking-[0.3em] transition-all duration-300 ${
                            isScrolled
                                ? "text-white"
                                : "text-white mix-blend-difference"
                        }`}>
                        SANCTUARY
                    </div>

                    <button
                        onClick={handleBooking}
                        className={`text-[10px] tracking-[0.2em] uppercase border border-vertex-gold/50 px-4 py-2 transition-all duration-500 hover:bg-vertex-gold hover:text-black ${
                            isScrolled
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-4 pointer-events-none"
                        }`}>
                        Book Spa
                    </button>
                </div>
            </nav>

            {/* --- HERO --- */}
            <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?q=80&w=1170&auto=format&fit=crop')] bg-cover bg-center"
                    style={{ backgroundAttachment: "fixed" }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

                <div className="relative z-10 text-center space-y-6 px-4">
                    <span className="block text-vertex-gold text-xs font-bold tracking-[0.4em] uppercase animate-fade-in">
                        Reconnect
                    </span>

                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white animate-fade-up">
                        SANCTUARY
                    </h1>

                    <p className="max-w-lg mx-auto text-white/70 font-light text-lg animate-fade-up">
                        A refuge for the senses. Immerse yourself in ancient
                        healing rituals reimagined for the modern soul.
                    </p>
                </div>

                <div className="absolute bottom-10 animate-bounce duration-[2000ms] opacity-40 text-white">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </header>

            {/* --- PHILOSOPHY GRID --- */}
            <section className="py-28 bg-black text-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        {
                            icon: Droplets,
                            title: "Hydrotherapy",
                            text: "Thermal pools designed to restore balance.",
                        },
                        {
                            icon: Flower2,
                            title: "Organic Oils",
                            text: "Sourced from sustainable botanicals.",
                        },
                        {
                            icon: Wind,
                            title: "Oxygen Rooms",
                            text: "Purified air environments for deep rest.",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center space-y-6 group">
                            <div className="p-6 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-vertex-gold transition-all duration-500">
                                <feature.icon className="w-6 h-6 text-neutral-400 group-hover:text-vertex-gold transition-colors" />
                            </div>
                            <h3 className="text-lg tracking-widest font-display text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- TREATMENT MENU --- */}
            <section className="py-28 relative overflow-hidden bg-black">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vertex-gold/40 to-transparent" />

                <div className="container mx-auto px-6 lg:px-24">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                            TREATMENT MENU
                        </h2>
                        <p className="text-white/50 italic font-serif tracking-wide">
                            Curated for your well-being
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                        {treatments.map((category, idx) => (
                            <div key={idx} className="space-y-8">
                                <h3 className="font-display text-xl tracking-widest text-vertex-gold border-b border-white/10 pb-4 uppercase">
                                    {category.category}
                                </h3>

                                <div className="space-y-10">
                                    {category.items.map((item, i) => (
                                        <div key={i} className="group">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <h4 className="font-display text-lg text-white group-hover:text-vertex-gold transition-colors">
                                                    {item.name}
                                                </h4>
                                                <div className="flex-1 mx-4 border-b border-dotted border-white/20" />
                                                <span className="font-display text-lg text-white">
                                                    {item.price}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-white/50 font-light italic max-w-sm">
                                                    {item.desc}
                                                </p>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                                                    {item.duration}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-32 bg-black text-center text-white border-t border-white/10">
                <h2 className="font-display text-4xl md:text-6xl mb-12 tracking-tight">
                    READY TO RELAX?
                </h2>
                <button
                    onClick={handleBooking}
                    className="px-12 py-5 border border-vertex-gold text-vertex-gold font-display text-sm tracking-widest hover:bg-vertex-gold hover:text-black transition-all duration-300 uppercase">
                    Book An Appointment
                </button>
            </section>
        </div>
    );
};

export default Wellness;
