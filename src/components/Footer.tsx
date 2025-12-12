const Footer = () => {
    return (
        <footer className="py-8 bg-primary">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        © 2024 VERTEX Complex. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="text-muted-foreground text-sm hover:text-primary-foreground transition-colors">
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground text-sm hover:text-primary-foreground transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
