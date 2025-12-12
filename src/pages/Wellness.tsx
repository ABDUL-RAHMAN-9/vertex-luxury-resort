import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Flower2, Droplets, Wind, ChevronDown } from "lucide-react";

const ScrollToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
};

const Wellness = () => {
    const treatments = [
        {
            category: "Massage Therapies",
            items: [
                {
                    name: "The Vertex Signature Ritual",
                    duration: "90 min",
                    price: "$260",
                    desc: "A bespoke blend of Swedish, Deep Tissue, and Aromatherapy techniques designed to rebalance energy and relieve full-body tension.",
                },
                {
                    name: "Himalayan Hot Stone Therapy",
                    duration: "75 min",
                    price: "$210",
                    desc: "Warm Himalayan salt stones release deep muscular stress while mineral-rich heat detoxifies and restores the body.",
                },
                {
                    name: "Tranquility Sleep Massage",
                    duration: "60 min",
                    price: "$190",
                    desc: "A slow, rhythmic treatment using lavender and chamomile oils to calm the nervous system and induce deep rest.",
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
                    desc: "A red-carpet facial infused with pure gold leaf to boost collagen, brighten skin tone, and deliver a luminous glow.",
                },
                {
                    name: "Deep Hydration Marine Facial",
                    duration: "60 min",
                    price: "$180",
                    desc: "A moisture-rich treatment powered by hyaluronic acid and marine botanicals to restore elasticity and plumpness.",
                },
                {
                    name: "Crystal Rejuvenation Facial",
                    duration: "90 min",
                    price: "$320",
                    desc: "A chakra-balancing facial using rose quartz and amethyst tools to lift, sculpt, and soothe the skin.",
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
                    desc: "A thermal wrap infused with nutrient-dense seaweed extracts to detoxify, smooth, and firm the skin.",
                },
                {
                    name: "Coconut Milk & Sugar Polish",
                    duration: "60 min",
                    price: "$170",
                    desc: "A full-body exfoliation using organic sugar crystals and warm coconut milk to brighten and soften the skin.",
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
                    desc: "Immersive vibrational healing using crystal singing bowls to calm the mind and balance inner energy.",
                },
                {
                    name: "Reiki Energy Healing",
                    duration: "60 min",
                    price: "$160",
                    desc: "A gentle hands-on technique that promotes emotional clarity, stress relief, and energetic alignment.",
                },
            ],
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white selection:bg-vertex-gold selection:text-black">
            <ScrollToTop />

            {/* --- NAV --- */}
            <nav
                className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center text-white animate-fade-in opacity-0"
                style={{ animationFillMode: "forwards" }}>
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-sm font-display tracking-widest uppercase hover:text-vertex-gold transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Resort
                </Link>
                <div className="font-display font-bold text-xl tracking-widest">
                    SPA & WELLNESS
                </div>
            </nav>

            {/* --- HERO --- */}
            <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?q=80&w=1170&auto=format&fit=crop')] bg-cover bg-center"
                    style={{ backgroundAttachment: "fixed" }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

                <div className="relative z-10 text-center space-y-6 px-4">
                    <span
                        className="block text-vertex-gold text-xs font-bold tracking-[0.4em] uppercase animate-fade-in opacity-0"
                        style={{
                            animationFillMode: "forwards",
                            animationDelay: "100ms",
                        }}>
                        Reconnect
                    </span>

                    <h1
                        className="font-display text-6xl md:text-8xl font-bold tracking-tight text-white animate-fade-up opacity-0"
                        style={{
                            animationFillMode: "forwards",
                            animationDelay: "300ms",
                        }}>
                        SANCTUARY
                    </h1>

                    <p
                        className="max-w-lg mx-auto text-white/70 font-light text-lg animate-fade-up opacity-0"
                        style={{
                            animationFillMode: "forwards",
                            animationDelay: "500ms",
                        }}>
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
                            <div className="p-5 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-vertex-gold transition-all duration-300">
                                <feature.icon className="w-6 h-6 text-neutral-400" />
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

            {/* --- TREATMENT MENU (Black Theme) --- */}
            <section className="py-28 relative overflow-hidden bg-black">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vertex-gold/40 to-transparent" />

                <div className="container mx-auto px-6 lg:px-24">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                            TREATMENT MENU
                        </h2>
                        <p className="text-white/50 italic font-serif">
                            Curated for your well-being
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {treatments.map((category, idx) => (
                            <div key={idx} className="space-y-8">
                                <h3 className="font-display text-xl tracking-widest text-vertex-gold border-b border-white/10 pb-4">
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
                                                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
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
                <h2 className="font-display text-4xl mb-8">READY TO RELAX?</h2>

                <Link to="/">
                    <button className="px-10 py-4 border border-white text-white font-display text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                        BOOK AN APPOINTMENT
                    </button>
                </Link>
            </section>
        </div>
    );
};

export default Wellness;
