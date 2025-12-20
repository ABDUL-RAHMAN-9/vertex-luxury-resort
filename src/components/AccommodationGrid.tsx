import { ArrowUpRight, Maximize, Users, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom"; // IMPORT ADDED

// Images (Keeping your existing imports)
import bedroom from "@/assets/bedroom.jpg";
import amenities from "@/assets/amenities.jpg";
import bathroomMirror from "@/assets/bathroom-mirror.jpg";
import bathtubView from "@/assets/bathtub-view.jpg";

interface AccommodationGridProps {
    onBookRoom: () => void;
}

// Data Structure for the Rooms
const rooms = [
    {
        id: 1,
        name: "Presidential Suite",
        image: bedroom,
        price: "$1,200",
        size: "120m²",
        guests: "2-4 Guests",
        gridClass: "md:col-span-1 md:row-span-2 h-[500px] md:h-full",
    },
    {
        id: 2,
        name: "Ocean Deluxe",
        image: amenities,
        price: "$850",
        size: "85m²",
        guests: "2 Guests",
        gridClass: "md:col-span-1 md:row-span-2 h-[500px] md:h-full",
    },
    {
        id: 3,
        name: "Spa Sanctuary",
        image: bathroomMirror,
        price: "$600",
        size: "60m²",
        guests: "2 Guests",
        gridClass: "md:col-span-1 md:row-span-1 h-[300px]",
    },
    {
        id: 4,
        name: "Skyline Bath",
        image: bathtubView,
        price: "$550",
        size: "55m²",
        guests: "2 Guests",
        gridClass: "md:col-span-1 md:row-span-1 h-[300px]",
    },
];

const AccommodationGrid = ({ onBookRoom }: AccommodationGridProps) => {
    const navigate = useNavigate(); // HOOK ADDED

    // NAVIGATION HANDLER
    const handleViewAll = () => {
        navigate("/accommodations");
        window.scrollTo(0, 0);
    };

    return (
        <section
            id="accommodation"
            className="py-24 lg:py-32 bg-vertex-black text-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                {/* --- HEADER --- */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16 relative z-10">
                    <div className="relative">
                        {/* Background Number */}
                        <span className="absolute -top-20 -left-10 text-[10rem] font-display font-bold text-white/5 opacity-50 select-none -z-10">
                            03
                        </span>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-12 bg-vertex-gold" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-vertex-gold">
                                Accommodations
                            </span>
                        </div>

                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9]">
                            REST & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vertex-gold to-yellow-600">
                                REJUVENATION
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-md text-white/60 font-light leading-relaxed border-l border-white/10 pl-6">
                        <p>
                            Each room is an architectural masterpiece, designed
                            to blur the lines between indoor luxury and the
                            outdoor horizon. Experience the epitome of comfort
                            with our award-winning sleep systems.
                        </p>
                    </div>
                </div>

                {/* --- BENTO GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className={`group relative overflow-hidden rounded-sm cursor-pointer ${room.gridClass}`}
                            onClick={onBookRoom}>
                            {/* Image with Zoom Effect */}
                            <div className="absolute inset-0 bg-gray-900">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-full object-cover opacity-80 transition-transform duration-[2000ms] ease-out group-hover:scale-110 group-hover:opacity-100"
                                />
                            </div>

                            {/* Hover Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Content Content */}
                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                {/* Top Right Icon (Appears on Hover) */}
                                <div className="absolute top-6 right-6 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black p-3 rounded-full">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>

                                {/* Room Info */}
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-vertex-gold text-xs font-bold tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        Starting from {room.price}/night
                                    </p>

                                    <h3 className="font-display text-3xl md:text-4xl mb-3 text-white group-hover:text-white/90 transition-colors">
                                        {room.name}
                                    </h3>

                                    {/* Amenities Row (Slides up) */}
                                    <div className="flex items-center gap-6 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 border-t border-white/20 pt-4">
                                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
                                            <Maximize className="w-4 h-4 text-vertex-gold" />
                                            {room.size}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
                                            <Users className="w-4 h-4 text-vertex-gold" />
                                            {room.guests}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
                                            <Wifi className="w-4 h-4 text-vertex-gold" />
                                            Free Wifi
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- FOOTER CTA (UPDATED) --- */}
                <div className="flex justify-center mt-16">
                    <button
                        // UPDATED CLICK HANDLER
                        onClick={handleViewAll}
                        className="group flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-vertex-gold hover:text-white transition-colors duration-300">
                        View All Accommodations
                        <span className="block h-[1px] w-12 bg-vertex-gold group-hover:w-20 transition-all duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AccommodationGrid;
