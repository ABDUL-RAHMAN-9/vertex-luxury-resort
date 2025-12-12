import { useState, useEffect } from "react";
import {
    Instagram,
    Facebook,
    Twitter,
    Menu,
    X,
    Calendar,
    Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
    onBookRoom: () => void;
    onBookTable: () => void;
}

const Navbar = ({ onBookRoom, onBookTable }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileOpen]);

    const navLinks = [
        { name: "The Hotel", href: "#hotel" },
        { name: "Dining", href: "#dining" },
        { name: "Wellness", href: "#wellness" },
        { name: "Contact", href: "#footer" }, 
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
                    scrolled
                        ? "bg-vertex-black/80 backdrop-blur-md py-4 border-white/10"
                        : "bg-transparent py-6"
                )}>
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* --- LEFT: Navigation Links (Desktop) --- */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="relative group overflow-hidden">
                                    <span
                                        className={cn(
                                            "font-display text-xs tracking-[0.2em] uppercase transition-colors duration-300 block",
                                            scrolled
                                                ? "text-white group-hover:text-vertex-gold"
                                                : "text-white/90 group-hover:text-white"
                                        )}>
                                        {link.name}
                                    </span>
                                    {/* Hover Underline Animation */}
                                    <span
                                        className={cn(
                                            "absolute bottom-0 left-0 w-full h-[1px] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300",
                                            scrolled
                                                ? "bg-vertex-gold"
                                                : "bg-white"
                                        )}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* --- CENTER: Logo --- */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer">
                            <a href="#home" className="text-center">
                                <h1
                                    className={cn(
                                        "font-display text-2xl md:text-3xl font-bold tracking-widest-xl transition-all duration-500",
                                        scrolled
                                            ? "text-white scale-90"
                                            : "text-white"
                                    )}>
                                    VERTEX
                                </h1>
                                <div
                                    className={cn(
                                        "h-[1px] bg-vertex-gold transition-all duration-500 mx-auto",
                                        scrolled
                                            ? "w-0 opacity-0"
                                            : "w-12 opacity-100 mt-1"
                                    )}
                                />
                            </a>
                        </div>

                        {/* --- RIGHT: Actions (Desktop) --- */}
                        <div className="hidden lg:flex items-center gap-6">
                            {/* Socials */}
                            <div className="flex items-center gap-4 border-r border-white/20 pr-6">
                                {[Instagram, Twitter].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className={cn(
                                            "transition-colors duration-300 hover:text-vertex-gold",
                                            scrolled
                                                ? "text-white/70"
                                                : "text-white/70"
                                        )}>
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>

                            {/* Book Button */}
                            <button
                                onClick={onBookRoom}
                                className={cn(
                                    "px-6 py-2 border font-display text-xs tracking-widest uppercase transition-all duration-300 hover:bg-vertex-gold hover:text-black hover:border-vertex-gold",
                                    scrolled
                                        ? "border-white/30 text-white"
                                        : "border-white/50 text-white"
                                )}>
                                Reserve
                            </button>
                        </div>

                        {/* --- MOBILE: Hamburger Menu --- */}
                        <button
                            className={cn(
                                "lg:hidden transition-colors duration-300 z-50 relative",
                                mobileOpen
                                    ? "text-white"
                                    : scrolled
                                    ? "text-white"
                                    : "text-white"
                            )}
                            onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-vertex-black transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]",
                    mobileOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                )}>
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none" />

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    {/* Navigation List */}
                    <div className="flex flex-col gap-6 mb-12">
                        {navLinks.map((link, i) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "font-display text-4xl md:text-5xl text-white tracking-tight hover:text-vertex-gold transition-all duration-500 transform translate-y-8 opacity-0",
                                    mobileOpen && "translate-y-0 opacity-100"
                                )}
                                style={{
                                    transitionDelay: `${100 + i * 100}ms`,
                                }}>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Action Buttons (Mobile) */}
                    <div
                        className={cn(
                            "grid grid-cols-2 gap-4 transition-all duration-700 delay-500 transform translate-y-8 opacity-0",
                            mobileOpen && "translate-y-0 opacity-100"
                        )}>
                        <button
                            onClick={() => {
                                onBookRoom();
                                setMobileOpen(false);
                            }}
                            className="flex flex-col items-center justify-center gap-2 p-6 border border-white/20 hover:bg-white/10 transition-colors">
                            <Calendar className="w-6 h-6 text-vertex-gold" />
                            <span className="font-display text-sm tracking-widest text-white uppercase">
                                Book Suite
                            </span>
                        </button>

                        <button
                            onClick={() => {
                                onBookTable();
                                setMobileOpen(false);
                            }}
                            className="flex flex-col items-center justify-center gap-2 p-6 border border-white/20 hover:bg-white/10 transition-colors">
                            <Phone className="w-6 h-6 text-vertex-gold" />
                            <span className="font-display text-sm tracking-widest text-white uppercase">
                                Book Table
                            </span>
                        </button>
                    </div>

                    {/* Socials (Mobile) */}
                    <div className="absolute bottom-10 left-0 w-full flex justify-center gap-8">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-white/50 hover:text-vertex-gold transition-colors">
                                <Icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
