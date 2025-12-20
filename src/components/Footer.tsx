import React from "react";
import {
    Github,
    Instagram,
    Linkedin,
    Twitter,
    ArrowRight,
    ArrowUp,
} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        const homeSection = document.getElementById("home");
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer
            id="footer"
            className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between overflow-hidden selection:bg-vertex-gold selection:text-black">
            {/* --- TOP SECTION: Brand Identity & Back to Top --- */}
            <div className="container mx-auto px-6 lg:px-12 pt-20">
                <div className="border-b border-white/10 pb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                        {/* Massive Logo */}
                        <h2 className="text-[18vw] lg:text-[14vw] leading-[0.8] font-bold tracking-tighter text-white uppercase opacity-90">
                            VERTEX<span className="text-vertex-gold">.</span>
                        </h2>

                        {/* Redesigned Back to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-4 pb-2 md:pb-4 self-start md:self-auto">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 group-hover:text-vertex-gold transition-colors duration-300">
                                Back to Top
                            </span>
                            <div className="p-4 border border-white/10 rounded-full bg-white/5 group-hover:border-vertex-gold group-hover:bg-vertex-gold group-hover:text-black transition-all duration-300 transform group-hover:-translate-y-2">
                                <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                        </button>
                    </div>

                    <p className="max-w-xl text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                        Experience the pinnacle of modern sanctuary. Where
                        architectural brilliance meets the art of living.
                    </p>
                </div>
            </div>

            {/* --- MIDDLE SECTION: Grid --- */}
            <div className="container mx-auto px-6 lg:px-12 py-16 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24">
                    {/* Navigation */}
                    <div className="space-y-8">
                        <h4 className="text-vertex-gold text-xs uppercase tracking-[0.3em] font-bold">
                            Explore
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Accommodations",
                                "Dining",
                                "Wellness & Spa",
                                "Events",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-lg font-light text-white/60 hover:text-vertex-gold transition-all duration-300 hover:pl-2">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h4 className="text-vertex-gold text-xs uppercase tracking-[0.3em] font-bold">
                            Contact
                        </h4>
                        <div className="space-y-4 text-white/60 font-light text-lg">
                            <p>123 Luxury Avenue, New York, NY 10001</p>
                            <p>+1 (555) 123-4567</p>
                            <p>office@vertex-sanctuary.com</p>
                        </div>
                    </div>

                    {/* Connect & Newsletter */}
                    <div className="space-y-8">
                        <h4 className="text-vertex-gold text-xs uppercase tracking-[0.3em] font-bold">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                        <div className="pt-4">
                            <div className="flex items-center border-b border-white/30 pb-2 focus-within:border-vertex-gold transition-colors duration-300">
                                <input
                                    type="email"
                                    placeholder="Join our newsletter"
                                    className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm py-2"
                                />
                                <button className="text-white hover:text-vertex-gold transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM SECTION: Legal & Credit --- */}
            <div className="border-t border-white/10 py-10">
                <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-white/40">
                    <div className="flex gap-8">
                        <p>© {currentYear} VERTEX RESORTS</p>
                        <a
                            href="#"
                            className="hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors">
                            Terms
                        </a>
                    </div>

                    {/* YOUR ORIGINAL CREDIT STYLE */}
                    <p className="flex items-center gap-1.5 font-light normal-case tracking-normal text-sm">
                        Designed & Developed by
                        <a
                            href="https://github.com/ABDUL-RAHMAN-9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative font-medium text-white transition-colors hover:text-vertex-gold flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            Abdul Rahman
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-vertex-gold transition-all duration-300 group-hover:w-full" />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
