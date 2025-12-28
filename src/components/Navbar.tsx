import { useState, useEffect } from "react";
import {
    Instagram,
    Twitter,
    Menu,
    X,
    Calendar,
    Phone,
    BookmarkCheck,
} from "lucide-react";
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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (window.scrollY < 100) {
                setActiveSection("");
                return;
            }

            const sections = [
                "our_story",
                "dining",
                "wellness",
                "accommodation",
                "footer",
            ];
            const currentSection = sections.find((id) => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (currentSection) setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");

        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: targetId } });
            return;
        }

        const element = document.getElementById(targetId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: "smooth",
            });
        }
        setMobileOpen(false);
    };

    const handleViewReservations = () => {
        setMobileOpen(false);
        navigate("/my-reservations");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    };

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    }, [mobileOpen]);

    const navLinks = [
        { name: "Story", href: "#our_story", id: "our_story" },
        { name: "Wellness", href: "#wellness", id: "wellness" },
        { name: "Dining", href: "#dining", id: "dining" },
        { name: "Suites", href: "#accommodation", id: "accommodation" },
        { name: "Contact", href: "#footer", id: "footer" },
    ];

    const dmSansStyle = { fontFamily: "'DM Sans', sans-serif" };

    return (
        <>
            <nav
                style={dmSansStyle}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                    scrolled
                        ? "bg-black/90 backdrop-blur-md py-4 border-white/10"
                        : "bg-transparent py-6 border-transparent"
                )}>
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* --- LEFT: Desktop Links --- */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) =>
                                        scrollToSection(e, link.href)
                                    }
                                    className="relative group pb-1">
                                    <span
                                        className={cn(
                                            "font-display text-[11px] tracking-[0.25em] uppercase transition-colors duration-300",
                                            activeSection === link.id
                                                ? "text-vertex-gold"
                                                : "text-white/70 group-hover:text-white"
                                        )}>
                                        {link.name}
                                    </span>
                                    <span
                                        className={cn(
                                            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-vertex-gold transition-all duration-300",
                                            activeSection === link.id
                                                ? "opacity-100"
                                                : "opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100"
                                        )}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* --- CENTER: Logo --- */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <Link
                                to="/"
                                onClick={(e) => scrollToSection(e, "#home")}>
                                <h1
                                    className={cn(
                                        "font-display text-xl md:text-2xl font-bold tracking-[0.4em] text-white transition-all",
                                        scrolled && "scale-90"
                                    )}>
                                    VERTEX
                                </h1>
                                {!scrolled && (
                                    <div className="h-[1px] w-8 bg-vertex-gold mx-auto mt-1" />
                                )}
                            </Link>
                        </div>

                        {/* --- RIGHT: Desktop Actions & Mobile Quick Access --- */}
                        <div className="flex items-center gap-4 md:gap-6">
                            {/* Desktop Socials */}
                            <div className="hidden lg:flex items-center gap-4 border-r border-white/10 pr-6">
                                {[Instagram, Twitter].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="text-white/40 hover:text-vertex-gold transition-colors">
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>

                            {/* Reservations Button (Desktop) / Icon (Mobile) */}
                            <button
                                onClick={handleViewReservations}
                                className={cn(
                                    "flex items-center gap-2 transition-all duration-300",
                                    "lg:px-6 lg:py-2 lg:border lg:border-white/20 lg:text-[11px] lg:tracking-widest lg:uppercase lg:hover:border-vertex-gold lg:hover:bg-vertex-gold lg:hover:text-black",
                                    "text-white/70 hover:text-vertex-gold" // Mobile Style
                                )}>
                                <Calendar className="w-5 h-5 lg:w-3.5 lg:h-3.5" />
                                <span className="hidden lg:block">
                                    Reservations
                                </span>
                            </button>

                            {/* Mobile Hamburger */}
                            <button
                                className="lg:hidden text-white transition-transform active:scale-90"
                                onClick={() => setMobileOpen(!mobileOpen)}>
                                {mobileOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-[#050505] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]",
                    mobileOpen ? "translate-y-0" : "-translate-y-full"
                )}>
                <div className="container mx-auto px-8 h-full flex flex-col justify-center">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-6 mb-16">
                        {navLinks.map((link, i) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={cn(
                                    "font-display text-4xl tracking-tighter transition-all duration-700 delay-[100ms]",
                                    mobileOpen
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-10 opacity-0",
                                    activeSection === link.id
                                        ? "text-vertex-gold"
                                        : "text-white"
                                )}
                                style={{
                                    transitionDelay: `${i * 70}ms`,
                                    ...dmSansStyle,
                                }}>
                                {link.name}
                            </a>
                        ))}

                        {/* Explicit Reservations Link for Mobile */}
                        <button
                            onClick={handleViewReservations}
                            className={cn(
                                "font-display text-4xl tracking-tighter text-left flex items-center gap-4 text-vertex-gold transition-all duration-700 delay-[400ms]",
                                mobileOpen
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                            )}
                            style={{ ...dmSansStyle }}>
                            <BookmarkCheck className="w-8 h-8" />
                            My Bookings
                        </button>
                    </div>

                    {/* Booking Quick Actions Grid */}
                    <div
                        className={cn(
                            "grid grid-cols-2 gap-4 transition-all duration-1000 delay-500",
                            mobileOpen
                                ? "translate-y-0 opacity-100"
                                : "translate-y-20 opacity-0"
                        )}>
                        <button
                            onClick={() => {
                                onBookRoom();
                                setMobileOpen(false);
                            }}
                            className="p-6 border border-white/5 bg-white/[0.03] flex flex-col items-center gap-3 active:bg-white/10">
                            <Calendar className="w-5 h-5 text-vertex-gold" />
                            <span
                                className="text-[9px] tracking-[0.2em] text-white uppercase font-bold"
                                style={dmSansStyle}>
                                Book Suite
                            </span>
                        </button>
                        <button
                            onClick={() => {
                                onBookTable();
                                setMobileOpen(false);
                            }}
                            className="p-6 border border-white/5 bg-white/[0.03] flex flex-col items-center gap-3 active:bg-white/10">
                            <Phone className="w-5 h-5 text-vertex-gold" />
                            <span
                                className="text-[9px] tracking-[0.2em] text-white uppercase font-bold"
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
