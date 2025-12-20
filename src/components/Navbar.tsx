import { useState, useEffect } from "react";
import { Instagram, Twitter, Menu, X, Calendar, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
    onBookRoom: () => void;
    onBookTable: () => void;
}

const Navbar = ({ onBookRoom, onBookTable }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    // 1. --- SCROLL & ACTIVE SECTION DETECTION ---
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["hotel", "dining", "wellness", "home"];
            const currentSection = sections.find((id) => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 2. --- SMOOTH SCROLL HANDLER (FOR SECTIONS) ---
    const scrollToSection = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");

        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: targetId } });
            return;
        }

        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
        setMobileOpen(false);
    };

    // 3. --- VIEW RESERVATIONS (FIXED SCROLL-TO-TOP BUG) ---
    const handleViewReservations = () => {
        navigate("/my-reservations");

        // Timeout ensures the scroll happens after the new page starts mounting
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }, 100);
    };

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    }, [mobileOpen]);

    const navLinks = [
        { name: "The Hotel", href: "#home", id: "home" },
        { name: "Dining", href: "#dining", id: "dining" },
        { name: "Wellness", href: "#wellness", id: "wellness" },
        { name: "Reservations", action: "reservations" },
        { name: "Contact", href: "#footer", id: "footer" },
    ];

    const dmSansStyle = { fontFamily: "'DM Sans', sans-serif" };

    return (
        <>
            <nav
                style={dmSansStyle}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
                    scrolled
                        ? "bg-black/80 backdrop-blur-md py-5 border-white/10"
                        : "bg-transparent py-6"
                )}>
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* --- LEFT: Navigation Links --- */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks
                                .filter((link) => link.name !== "Reservations")
                                .map((link) => {
                                    const isActive = activeSection === link.id;
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={(e) =>
                                                scrollToSection(e, link.href!)
                                            }
                                            className="relative group overflow-hidden pb-1">
                                            <span
                                                className={cn(
                                                    "font-display text-[12px] tracking-[0.25em] uppercase transition-colors duration-300 block",
                                                    isActive
                                                        ? "text-vertex-gold"
                                                        : "text-white/80 group-hover:text-white"
                                                )}>
                                                {link.name}
                                            </span>

                                            <span
                                                className={cn(
                                                    "absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-500 ease-out",
                                                    isActive
                                                        ? "translate-x-0 bg-vertex-gold"
                                                        : "bg-white -translate-x-full group-hover:translate-x-0"
                                                )}
                                            />
                                        </a>
                                    );
                                })}
                        </div>

                        {/* --- CENTER: Logo --- */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer">
                            <Link
                                to="/"
                                onClick={(e) => scrollToSection(e, "#home")}
                                className="text-center">
                                <h1
                                    className={cn(
                                        "font-display text-2xl md:text-2xl font-bold tracking-[0.4em] transition-all duration-500",
                                        scrolled
                                            ? "text-white scale-90"
                                            : "text-white"
                                    )}>
                                    VERTEX
                                </h1>
                                <div
                                    className={cn(
                                        "h-[1.5px] bg-vertex-gold transition-all duration-500 mx-auto",
                                        scrolled
                                            ? "w-0 opacity-0"
                                            : "w-12 opacity-100 mt-1"
                                    )}
                                />
                            </Link>
                        </div>

                        {/* --- RIGHT: Actions --- */}
                        <div className="hidden lg:flex items-center gap-6">
                            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                                {[Instagram, Twitter].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="text-white/50 hover:text-vertex-gold transition-colors duration-300">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>

                            <button
                                onClick={handleViewReservations}
                                className="flex items-center justify-center gap-3 px-6 py-2 border border-white/20 text-white font-display text-[12px] tracking-widest uppercase hover:border-vertex-gold hover:bg-vertex-gold hover:text-black transition-all duration-500">
                                <Calendar className="w-3.5 h-3.5" />
                                Reservations
                            </button>
                        </div>

                        {/* --- MOBILE: Hamburger --- */}
                        <button
                            className="lg:hidden text-white z-50 relative"
                            onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]",
                    mobileOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                )}>
                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <div className="flex flex-col gap-6 mb-12">
                        {navLinks.map((link, i) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    if (link.action === "reservations") {
                                        handleViewReservations();
                                    } else {
                                        scrollToSection(e, link.href!);
                                    }
                                    setMobileOpen(false);
                                }}
                                className={cn(
                                    "font-display text-4xl md:text-5xl text-white tracking-tighter hover:text-vertex-gold transition-all duration-300 transform translate-y-8 opacity-0 cursor-pointer",
                                    mobileOpen && "translate-y-0 opacity-100"
                                )}
                                style={{
                                    transitionDelay: `${100 + i * 100}ms`,
                                    ...dmSansStyle,
                                }}>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div
                        className={cn(
                            "grid grid-cols-2 gap-4 transform translate-y-8 opacity-0 transition-all duration-700 delay-500",
                            mobileOpen && "translate-y-0 opacity-100"
                        )}>
                        <button
                            onClick={() => {
                                onBookRoom();
                                setMobileOpen(false);
                            }}
                            className="p-8 border border-white/5 bg-white/[0.02] flex flex-col items-center gap-3 hover:bg-white/5 transition-colors">
                            <Calendar className="w-6 h-6 text-vertex-gold" />
                            <span
                                className="text-[10px] tracking-widest text-white uppercase"
                                style={dmSansStyle}>
                                Book Suite
                            </span>
                        </button>
                        <button
                            onClick={() => {
                                onBookTable();
                                setMobileOpen(false);
                            }}
                            className="p-8 border border-white/5 bg-white/[0.02] flex flex-col items-center gap-3 hover:bg-white/5 transition-colors">
                            <Phone className="w-6 h-6 text-vertex-gold" />
                            <span
                                className="text-[10px] tracking-widest text-white uppercase"
                                style={dmSansStyle}>
                                Book Table
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
