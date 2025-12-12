import lobbyImage from "@/assets/lobby.jpg";

const AboutSection = () => {
    return (
        <section className="py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                    {/* Image */}
                    <div className="lg:w-5/12">
                        <div className="relative overflow-hidden">
                            <img
                                src={lobbyImage}
                                alt="VERTEX Hotel Lobby"
                                className="w-full h-[500px] lg:h-[700px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-7/12 space-y-8">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                            WELCOME TO THE EPITOME OF{" "}
                            <span className="font-serif italic font-normal">
                                Luxury
                            </span>{" "}
                            AND{" "}
                            <span className="font-serif italic font-normal">
                                Comfort
                            </span>
                        </h2>

                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p className="uppercase tracking-wide text-sm">
                                Our hotel rooms are elegantly designed with an
                                eye for detail, ensuring that you have
                                everything you need for a relaxing and
                                rejuvenating stay.
                            </p>
                            <p className="uppercase tracking-wide text-sm">
                                Each room is equipped with the latest amenities,
                                including plush bedding, high-speed Wi-Fi,
                                flat-screen TVs, and a coffee maker to help you
                                start your day right. Our spacious bathrooms
                                feature luxurious toiletries and towels, so you
                                can pamper yourself in complete privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
