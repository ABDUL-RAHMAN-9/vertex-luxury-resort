import bedroom from "@/assets/bedroom.jpg";
import amenities from "@/assets/amenities.jpg";
import bathroomMirror from "@/assets/bathroom-mirror.jpg";
import bathtubView from "@/assets/bathtub-view.jpg";

interface AccommodationGridProps {
    onBookRoom: () => void;
}

const AccommodationGrid = ({ onBookRoom }: AccommodationGridProps) => {
    return (
        <section id="hotel" className="py-24 lg:py-32 bg-primary">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-primary-foreground">
                            HOTEL
                        </h2>
                        <p className="text-muted-foreground text-sm uppercase tracking-wide max-w-md">
                            Book your stay with us now and experience the
                            epitome of comfort and luxury at our hotel. We
                            guarantee you'll be thrilled with your decision.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onBookRoom}
                            className="px-6 py-3 border border-primary-foreground text-primary-foreground font-display text-sm tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                            BOOK A ROOM
                        </button>
                        <button className="px-6 py-3 border border-primary-foreground text-primary-foreground font-display text-sm tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                            VIEW ROOMS
                        </button>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Large - Master Bedroom (spans 2 rows on md+) */}
                    <div className="md:row-span-2">
                        <img
                            src={amenities}
                            alt="Premium Amenities"
                            className="w-full h-64 md:h-full object-cover"
                        />
                    </div>

                    {/* Center - Large Bedroom */}
                    <div className="md:row-span-2">
                        <img
                            src={bedroom}
                            alt="Master Bedroom"
                            className="w-full h-64 md:h-full object-cover"
                        />
                    </div>

                    {/* Top Right - Bathroom */}
                    <div>
                        <img
                            src={bathroomMirror}
                            alt="Modern Bathroom"
                            className="w-full h-64 object-cover"
                        />
                    </div>

                    {/* Bottom Right - Bathtub */}
                    <div>
                        <img
                            src={bathtubView}
                            alt="Bathtub with View"
                            className="w-full h-64 object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccommodationGrid;
