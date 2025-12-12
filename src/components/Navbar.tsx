import { useState, useEffect } from "react";
import { Instagram, Facebook, Twitter, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
    onBookRoom: () => void;
    onBookTable: () => void;
}

const Navbar = ({ onBookRoom, onBookTable }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "HOME", href: "#home" },
        { name: "HOTEL", href: "#hotel" },
        { name: "DINING", href: "#dining" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
                    scrolled
                        ? "bg-background shadow-md py-4"
                        : "bg-transparent py-6"
                )}>
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* Left - Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "font-display text-sm tracking-widest transition-colors duration-300 hover:opacity-70",
                                        scrolled
                                            ? "text-foreground"
                                            : "text-primary-foreground"
                                    )}>
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Center - Logo */}
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <a href="#home" className="text-center">
                                <h1
                                    className={cn(
                                        "font-display text-xl md:text-2xl font-bold tracking-widest-xl transition-colors duration-300",
                                        scrolled
                                            ? "text-foreground"
                                            : "text-primary-foreground"
                                    )}>
                                    VERTEX
                                </h1>
                                <p
                                    className={cn(
                                        "text-[10px] tracking-[0.3em] uppercase transition-colors duration-300",
                                        scrolled
                                            ? "text-muted-foreground"
                                            : "text-primary-foreground/70"
                                    )}>
                                    Restaurant-Hotel Complex
                                </p>
                            </a>
                        </div>

                        {/* Right - Social Icons */}
                        <div className="hidden md:flex items-center gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className={cn(
                                        "transition-colors duration-300 hover:opacity-70",
                                        scrolled
                                            ? "text-foreground"
                                            : "text-primary-foreground"
                                    )}>
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={cn(
                                "md:hidden transition-colors duration-300",
                                scrolled
                                    ? "text-foreground"
                                    : "text-primary-foreground"
                            )}
                            onClick={() => setMobileOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[100] bg-primary transition-all duration-500",
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}>
                <button
                    className="absolute top-6 right-6 text-primary-foreground"
                    onClick={() => setMobileOpen(false)}>
                    <X size={32} />
                </button>

                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="font-display text-4xl text-primary-foreground tracking-widest hover:opacity-70 transition-opacity"
                            style={{ animationDelay: `${i * 100}ms` }}>
                            {link.name}
                        </a>
                    ))}
                    <div className="flex gap-6 mt-8">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-primary-foreground hover:opacity-70 transition-opacity">
                                <Icon size={28} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
