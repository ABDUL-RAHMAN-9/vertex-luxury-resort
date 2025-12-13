import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    BedDouble,
    Clock,
    Users,
    CheckCircle2,
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
import { Button } from "@/components/ui/button";

interface Booking {
    id: string;
    type: "room" | "table";
    date: string;
    guests: string;
    roomOrTime: string;
}

const MyReservations = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("vertex_bookings");
        if (saved) setBookings(JSON.parse(saved));
    }, []);

    const handleClearAll = () => {
        localStorage.removeItem("vertex_bookings");
        setBookings([]);
    };

    return (
        <div className="bg-vertex-black min-h-screen text-white overflow-x-hidden selection:bg-vertex-gold selection:text-black">
            {/* --- NAVIGATION (MATCHES OUR STORY) --- */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference flex justify-between items-center">
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-sm font-display tracking-widest uppercase hover:text-vertex-gold transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Resort
                </Link>

                <div className="font-display font-bold text-xl tracking-widest">
                    VERTEX
                </div>
            </nav>

            {/* --- CONTENT --- */}
            <section className="pt-40 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-vertex-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
                        Your Stay
                    </p>
                    <h1 className="font-display text-4xl md:text-6xl">
                        Reservations
                    </h1>
                    <p className="text-white/50 mt-4 max-w-xl mx-auto">
                        A summary of all your confirmed room and table bookings.
                    </p>
                </div>

                {/* Empty State */}
                {bookings.length === 0 && (
                    <div className="text-center py-24 border border-white/10 rounded-2xl bg-white/5">
                        <p className="text-lg text-white/60">
                            No reservations found.
                        </p>
                        <p className="text-sm text-white/40 mt-2">
                            Your confirmed bookings will appear here.
                        </p>
                    </div>
                )}

                {/* Cards */}
                {bookings.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-vertex-gold/40 transition-all">
                                    {/* Top */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-xs tracking-widest uppercase text-white/40">
                                                Confirmation ID
                                            </p>
                                            <p className="font-mono text-vertex-gold text-sm mt-1">
                                                {booking.id}
                                            </p>
                                        </div>

                                        <span className="flex items-center gap-1 text-vertex-gold text-sm">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Confirmed
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-4 text-sm text-white/80">
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-vertex-gold" />
                                            {booking.guests} Guests
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {booking.type === "room" ? (
                                                <BedDouble className="w-5 h-5 text-vertex-gold" />
                                            ) : (
                                                <Clock className="w-5 h-5 text-vertex-gold" />
                                            )}
                                            {booking.roomOrTime}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-vertex-gold" />
                                            {booking.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Clear Action */}
                        {/* --- CLEAR RESERVATIONS (MATCHES STORY CTA) --- */}
                        <div className="mt-20 flex justify-center">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        className="
                px-12 py-5
                border border-vertex-gold
                text-vertex-gold
                font-display text-sm tracking-widest uppercase
                hover:bg-vertex-gold hover:text-black
                transition-all duration-300
                ">
                                        Clear Reservations
                                    </button>
                                </AlertDialogTrigger>

                                <AlertDialogContent className="bg-vertex-black border border-white/10">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="font-display">
                                            Clear all reservations?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-white/60">
                                            This action will permanently remove
                                            all booking records.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            onClick={handleClearAll}
                                            className="
                    px-6 py-2
                    border border-vertex-gold
                    text-vertex-gold
                    hover:bg-vertex-gold hover:text-black
                    font-display text-sm tracking-widest uppercase
                    transition-all duration-300
                    ">
                                            Confirm Clear
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default MyReservations;
