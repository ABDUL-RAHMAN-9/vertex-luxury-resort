import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    Users,
    CheckCircle2,
    Clock,
    BedDouble,
    Trash2,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Booking {
    id: string;
    type: "room" | "table";
    name: string;
    date: string;
    guests: string;
    detail: string;
}

const MyReservations = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll for dynamic Nav effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("vertex_bookings");
        if (saved) setBookings(JSON.parse(saved));
    }, []);

    const handleClearAll = () => {
        localStorage.removeItem("vertex_bookings");
        setBookings([]);
    };

    const dmSansStyle = { fontFamily: "'DM Sans', sans-serif" };

    return (
        <div
            style={dmSansStyle}
            className="bg-[#0a0a0a] min-h-screen text-white selection:bg-vertex-gold selection:text-black">
            {/* --- DYNAMIC NAVIGATION --- */}
            <nav
                className={cn(
                    "fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center transition-all duration-500",
                    isScrolled
                        ? "bg-black/60 backdrop-blur-md border-b border-white/5 py-6"
                        : "bg-transparent border-b border-transparent py-6"
                )}>
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-sm tracking-widest uppercase text-white hover:text-vertex-gold transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Resort
                </Link>

                <div className="font-bold text-xl tracking-[0.3em] uppercase">
                    VERTEX
                </div>
            </nav>

            {/* --- CONTENT --- */}
            <main className="pt-48 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
                {/* Header (Bottom-to-Top Animation) */}
                <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
                    <p className="text-vertex-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
                        Exclusive Access
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase mb-6">
                        My Reservations
                    </h1>
                    <div className="w-12 h-[1px] bg-vertex-gold/50 mx-auto" />
                </div>

                {/* Empty State with Invitation Text */}
                {bookings.length === 0 && (
                    <div className="py-32 border-t border-white/10 flex flex-col items-center justify-center text-center animate-in fade-in duration-1000">
                        <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-6">
                            No active reservations found
                        </p>

                        <p className="text-white/50 text-sm max-w-xs leading-relaxed mb-10 px-6">
                            Your journey into the extraordinary is just a
                            reservation away. Experience the pinnacle of refined
                            luxury at Vertex.
                        </p>

                        <Link
                            to="/"
                            className="text-[10px] text-vertex-gold border-b border-vertex-gold/30 pb-1 hover:text-white hover:border-white transition-all uppercase tracking-[0.3em]">
                            Explore Collections
                        </Link>
                    </div>
                )}

                {/* Card Grid */}
                {bookings.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="group relative bg-[#0e0e0e] border border-white/10 p-8 rounded-sm hover:border-vertex-gold/40 transition-all duration-500 overflow-hidden">
                                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-vertex-gold" />
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold">
                                            {booking.type === "room"
                                                ? "Suite"
                                                : "Table"}
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-mono text-vertex-gold/60">
                                        REF: {booking.id}
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold tracking-tight uppercase text-white group-hover:text-vertex-gold transition-colors duration-500">
                                        {booking.name}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="space-y-2">
                                            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">
                                                Scheduled Date
                                            </p>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Calendar className="w-4 h-4 text-vertex-gold/80" />
                                                {booking.date}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">
                                                Party Size
                                            </p>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Users className="w-4 h-4 text-vertex-gold/80" />
                                                {booking.guests} Guests
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-4">
                                            Detail
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-white/90 bg-white/[0.03] px-5 py-4 rounded-sm border border-white/[0.05]">
                                            {booking.type === "room" ? (
                                                <BedDouble className="w-4 h-4 text-vertex-gold" />
                                            ) : (
                                                <Clock className="w-4 h-4 text-vertex-gold" />
                                            )}
                                            {booking.detail}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer Purge Action */}
                {bookings.length > 0 && (
                    <div className="mt-24 flex justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700 fill-mode-both">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button className="group flex items-center gap-3 text-[10px] tracking-[0.5em] uppercase text-white/20 hover:text-red-500 transition-all font-semibold">
                                    <Trash2 className="w-4 h-4" />
                                    Clear Records
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="bg-[#0a0a0a] border border-white/10 rounded-sm p-10">
                                <AlertDialogHeader>
                                    <AlertDialogTitle
                                        className="text-xl font-bold text-white uppercase tracking-tight"
                                        style={dmSansStyle}>
                                        Confirm Purge
                                    </AlertDialogTitle>
                                    <AlertDialogDescription
                                        className="text-white/40 text-sm py-4"
                                        style={dmSansStyle}>
                                        Are you sure you want to remove all
                                        reservation data?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="mt-8 flex gap-4">
                                    <AlertDialogCancel
                                        className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white uppercase text-[10px] tracking-widest rounded-none h-12 px-8"
                                        style={dmSansStyle}>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleClearAll}
                                        className="bg-vertex-gold text-black hover:bg-white transition-all uppercase text-[10px] tracking-widest font-bold rounded-none h-12 px-10"
                                        style={dmSansStyle}>
                                        Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyReservations;
