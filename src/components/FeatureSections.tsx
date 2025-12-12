import { Star } from "lucide-react";
import spaBath from "@/assets/spa-bath.jpg";
import restaurantBar from "@/assets/restaurant-bar.jpg";

interface ReviewCardProps {
    name: string;
    rating: string;
    avatar: string;
}

const ReviewCard = ({ name, rating, avatar }: ReviewCardProps) => (
    <div className="glass-card px-4 py-3 flex items-center gap-3">
        <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
        />
        <div>
            <p className="text-primary-foreground text-sm font-medium">
                {name}
            </p>
            <div className="flex items-center gap-1">
                <span className="text-primary-foreground/70 text-xs">
                    give rating
                </span>
                <span className="text-vertex-gold font-medium text-sm">
                    {rating}
                </span>
            </div>
        </div>
    </div>
);

const FeatureSections = () => {
    return (
        <section className="py-24 lg:py-32 bg-secondary">
            <div className="container mx-auto px-6 lg:px-12 space-y-32">
                {/* Spa/Relax Section */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                    {/* Image with Review Card */}
                    <div className="lg:w-1/2 relative">
                        <img
                            src={spaBath}
                            alt="VERTEX Spa Experience"
                            className="w-full h-[400px] lg:h-[500px] object-cover"
                        />
                        <div className="absolute bottom-6 left-6">
                            <ReviewCard
                                name="Elena S."
                                rating="4.5"
                                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                            Restaurant-Hotel Complex
                        </p>
                        <p className="font-display text-xl md:text-2xl uppercase leading-relaxed">
                            Indulge in a taste of{" "}
                            <span className="font-serif italic font-normal lowercase">
                                luxury
                            </span>{" "}
                            with every bite at Hotel VERTEX. From the freshest
                            seafood to the most succulent steaks, every dish is
                            crafted with care to ensure that you enjoy a truly
                            memorable dining experience.
                        </p>
                        <p className="font-display text-lg uppercase">
                            Treat yourself to a taste of the good life and come
                            dine with us today!
                        </p>
                    </div>
                </div>

                {/* Bar/Dining Section */}
                <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 items-center">
                    {/* Image with Review Card */}
                    <div className="lg:w-1/2 relative">
                        <img
                            src={restaurantBar}
                            alt="VERTEX Restaurant Bar"
                            className="w-full h-[400px] lg:h-[500px] object-cover"
                        />
                        <div className="absolute bottom-6 right-6">
                            <ReviewCard
                                name="Alexander"
                                rating="5.0"
                                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                            Business Class Hotel
                        </p>
                        <p className="font-display text-xl md:text-2xl uppercase leading-relaxed">
                            The VERTEX Hotel features spacious and stylish
                            double{" "}
                            <span className="font-serif italic font-normal lowercase">
                                luxury
                            </span>{" "}
                            rooms with modern amenities for a comfortable stay.
                        </p>
                        <div className="flex gap-1 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-5 h-5 fill-vertex-gold text-vertex-gold"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSections;
