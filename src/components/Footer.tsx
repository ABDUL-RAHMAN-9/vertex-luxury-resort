import { Github, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-vertex-black text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6 lg:px-12">
                {/* --- TOP SECTION: Brand & Newsletter --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                    {/* Brand Identity */}
                    <div className="space-y-4 max-w-sm">
                        <h2 className="font-display text-4xl md:text-5xl tracking-tight text-white">
                            VERTEX
                        </h2>
                        <p className="text-white/60 font-light leading-relaxed">
                            Experience the pinnacle of luxury hospitality. Where
                            architectural brilliance meets unparalleled service.
                        </p>
                    </div>

                    {/* Newsletter */}
                    <div className="w-full lg:w-auto">
                        <h3 className="font-display text-sm tracking-widest uppercase mb-6 text-vertex-gold">
                            Join Our Newsletter
                        </h3>
                        <div className="flex items-center border-b border-white/30 pb-2 focus-within:border-vertex-gold transition-colors duration-300 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm py-2"
                            />
                            <button className="text-white hover:text-vertex-gold transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- MIDDLE SECTION: Links --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/10">
                    <div>
                        <h4 className="font-display text-sm font-bold tracking-widest uppercase mb-6">
                            Explore
                        </h4>
                        <ul className="space-y-4 text-sm text-white/60 font-light">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-vertex-gold transition-colors">
                                    Accommodations
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-vertex-gold transition-colors">
                                    Dining
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-vertex-gold transition-colors">
                                    Wellness & Spa
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-vertex-gold transition-colors">
                                    Events
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-sm font-bold tracking-widest uppercase mb-6">
                            Contact
                        </h4>
                        <ul className="space-y-4 text-sm text-white/60 font-light">
                            <li>123 Luxury Avenue</li>
                            <li>New York, NY 10001</li>
                            <li>+1 (555) 123-4567</li>
                            <li>concierge@vertex.com</li>
                        </ul>
                    </div>
                    {/* Socials */}
                    <div className="col-span-2 md:col-span-2 flex flex-col md:items-end">
                        <h4 className="font-display text-sm font-bold tracking-widest uppercase mb-6">
                            Follow Us
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM SECTION: Credits --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-xs text-white/40">
                    {/* Legal Links */}
                    <div className="flex gap-6">
                        <p>© {currentYear} VERTEX Resorts.</p>
                        <a
                            href="#"
                            className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>

                    {/* YOUR DEVELOPER CREDIT */}
                    <p className="flex items-center gap-1.5 font-light">
                        Designed & Developed by
                        <a
                            href="https://github.com/ABDUL-RAHMAN-9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative font-medium text-white transition-colors hover:text-vertex-gold flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            Abdul Rahman
                            {/* Underline Animation */}
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-vertex-gold transition-all duration-300 group-hover:w-full" />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
