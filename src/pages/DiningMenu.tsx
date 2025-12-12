import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Droplets, Flower2, Wind } from "lucide-react";

// Scroll to top
const ScrollToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
};

const DiningMenu = () => {
    const drinks = [
        {
            category: "Signature Cocktails",
            items: [
                {
                    name: "The Vertex Old Fashioned",
                    price: "$22",
                    ingredients:
                        "Barrel-aged bourbon, orange oil, smoked demerara, Luxardo cherry",
                },
                {
                    name: "Golden Hour",
                    price: "$19",
                    ingredients:
                        "Vodka, Chambord, hand-pressed pineapple, prosecco foam",
                },
                {
                    name: "Midnight Bloom",
                    price: "$18",
                    ingredients:
                        "Lavender syrup, botanical gin, citrus mist, edible florals",
                },
                {
                    name: "Electric Citrus",
                    price: "$20",
                    ingredients:
                        "Tequila blanco, yuzu, blue curaçao, Himalayan salt air",
                },
            ],
        },

        {
            category: "Classics Reinvented",
            items: [
                {
                    name: "Smoked Negroni",
                    price: "$21",
                    ingredients:
                        "Smoked gin, vermouth rosso, Italian bitters, orange peel",
                },
                {
                    name: "Crystal Mojito",
                    price: "$17",
                    ingredients:
                        "Clarified mint syrup, white rum, lime essence, sparkling mineral water",
                },
                {
                    name: "Velvet Espresso Martini",
                    price: "$18",
                    ingredients:
                        "Premium vodka, ristretto espresso, cocoa liqueur, vanilla cloud",
                },
            ],
        },

        {
            category: "Non-Alcoholic Elixirs",
            items: [
                {
                    name: "Cucumber Zen",
                    price: "$12",
                    ingredients:
                        "Cucumber juice, lime, aloe syrup, sparkling botanicals",
                },
                {
                    name: "Tropical Dawn",
                    price: "$11",
                    ingredients:
                        "Passionfruit, mango nectar, kombucha, ginger mist",
                },
                {
                    name: "Berry & Bloom Fizz",
                    price: "$12",
                    ingredients:
                        "Wild berry reduction, hibiscus, soda, mint leaf",
                },
            ],
        },

        {
            category: "Wines & Spirits",
            items: [
                {
                    name: "Bordeaux Reserve 2017",
                    price: "$450",
                    ingredients: "Grand Cru — Bordeaux, France",
                },
                {
                    name: "Opus One 2018",
                    price: "$290",
                    ingredients: "Iconic Napa Valley red blend — USA",
                },
                {
                    name: "Brunello di Montalcino",
                    price: "$150",
                    ingredients: "Sangiovese — Tuscany, Italy",
                },
                {
                    name: "Louis Roederer Cristal",
                    price: "$380",
                    ingredients: "Champagne — France",
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
                    THE BAR
                </div>
            </nav>

            {/* --- HERO (exact styling from Wellness) --- */}
            <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1651117860176-154f143e0a49?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
                    style={{ backgroundAttachment: "fixed" }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

                <div className="relative z-10 text-center space-y-6 px-4">
                    <span
                        className="block text-vertex-gold text-xs font-bold tracking-[0.4em] uppercase animate-fade-in opacity-0"
                        style={{
                            animationFillMode: "forwards",
                            animationDelay: "120ms",
                        }}>
                        Nightlife
                    </span>

                    <h1
                        className="font-display text-6xl md:text-8xl font-bold tracking-tight text-white animate-fade-up opacity-0"
                        style={{
                            animationFillMode: "forwards",
                            animationDelay: "320ms",
                        }}>
                        ALCHEMY
                    </h1>

                    <p
                        className="max-w-lg mx-auto text-white/70 font-light text-lg animate-fade-up opacity-0"
                        style={{
                            animationFillMode: "forwards",
                            animationDelay: "520ms",
                        }}>
                        Hand-crafted elixirs curated for unforgettable evenings.
                    </p>
                </div>

                <div className="absolute bottom-10 animate-bounce duration-[2000ms] opacity-40 text-white">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </header>

            {/* --- DINING PHILOSOPHY GRID --- */}
            <section className="py-28 bg-black text-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        {
                            icon: Droplets,
                            title: "Signature Cocktails",
                            text: "Hand-crafted blends infused with rare botanicals.",
                        },
                        {
                            icon: Flower2,
                            title: "Seasonal Ingredients",
                            text: "Fresh flavors sourced from elite local farms.",
                        },
                        {
                            icon: Wind,
                            title: "Fine Dining Ambience",
                            text: "A curated atmosphere for memorable evenings.",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center space-y-6 group">
                            <div className="p-5 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-vertex-gold transition-all duration-300">
                                <feature.icon className="w-6 h-6 text-neutral-400 group-hover:text-vertex-gold transition-all duration-300" />
                            </div>

                            <h3 className="text-lg tracking-widest font-display text-white group-hover:text-vertex-gold transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- MENU LIST (exact same layout as Wellness Treatment) --- */}
            <section className="py-28 relative overflow-hidden bg-black">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vertex-gold/40 to-transparent" />

                <div className="container mx-auto px-6 lg:px-24">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                            DRINKS MENU
                        </h2>
                        <p className="text-white/50 italic font-serif">
                            Curated for discerning tastes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {drinks.map((category, idx) => (
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
                                                    {item.ingredients}
                                                </p>
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
                <h2 className="font-display text-4xl mb-8">RESERVE A TABLE</h2>

                <Link to="/">
                    <button className="px-10 py-4 border border-white text-white font-display text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                        BOOK NOW
                    </button>
                </Link>
            </section>
        </div>
    );
};

export default DiningMenu;
