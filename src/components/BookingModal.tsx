import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    CalendarIcon,
    Users,
    Clock,
    BedDouble,
    CheckCircle2,
    Loader2,
    Utensils,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    type: "room" | "table";
}

const BookingModal = ({ open, onClose, type }: BookingModalProps) => {
    const navigate = useNavigate();

    // --- State Management ---
    const [step, setStep] = useState<"form" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);

    const [date, setDate] = useState<Date>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [guests, setGuests] = useState<string>("2");
    const [time, setTime] = useState<string>("");
    const [roomType, setRoomType] = useState<string>("");

    useEffect(() => {
        if (open) {
            setStep("form");
            setIsLoading(false);
            setDate(undefined);
            setGuests("2");
            setTime("");
            setRoomType("");
        }
    }, [open]);

    // --- Handlers ---
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsCalendarOpen(false);
    };

    const handleConfirm = () => {
        if (!date) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setStep("success");

            // --- Save Booking ---
            const bookingData = {
                id: `VTX-${Math.floor(Math.random() * 10000)}`,
                type,
                date: format(date, "MMM do, yyyy"),
                guests,
                roomOrTime: type === "room" ? roomType : time,
            };

            const existing = localStorage.getItem("vertex_bookings");
            const bookings = existing ? JSON.parse(existing) : [];
            bookings.push(bookingData);
            localStorage.setItem("vertex_bookings", JSON.stringify(bookings));
        }, 1500);
    };

    const timeSlots = [
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
    ];
    const roomTypes = [
        "Ocean Deluxe",
        "Spa Sanctuary",
        "Skyline Bath",
        "Presidential Suite",
    ];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-vertex-black border-vertex-gold/20 text-white max-w-md p-6 rounded-xl overflow-hidden shadow-2xl">
                {/* --- HEADER --- */}
                <DialogHeader className="pb-4">
                    <DialogTitle className="font-display text-2xl tracking-widest text-center flex flex-col items-center gap-1">
                        {step === "form" && (
                            <>
                                <span className="text-vertex-gold text-xs font-bold uppercase tracking-[0.3em]">
                                    Vertex{" "}
                                    {type === "room" ? "Resort" : "Dining"}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    {type === "room" ? (
                                        <BedDouble className="w-4 h-4 text-vertex-gold" />
                                    ) : (
                                        <Utensils className="w-4 h-4 text-vertex-gold" />
                                    )}
                                    <span>
                                        {type === "room"
                                            ? "Book a Suite"
                                            : "Reserve a Table"}
                                    </span>
                                </div>
                                <div className="w-16 h-[2px] bg-vertex-gold mt-2 rounded" />
                            </>
                        )}
                    </DialogTitle>
                </DialogHeader>

                {/* --- BODY CONTENT --- */}
                <div className="space-y-5">
                    {step === "form" && (
                        <div className="animate-fade-in space-y-5">
                            {/* Room / Time Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                    {type === "room" ? (
                                        <BedDouble className="w-3 h-3 text-vertex-gold" />
                                    ) : (
                                        <Clock className="w-3 h-3 text-vertex-gold" />
                                    )}
                                    {type === "room"
                                        ? "Select Suite"
                                        : "Preferred Time"}
                                </label>
                                <Select
                                    value={type === "room" ? roomType : time}
                                    onValueChange={
                                        type === "room" ? setRoomType : setTime
                                    }>
                                    <SelectTrigger className="w-full bg-white/5 border border-white/10 text-white rounded-md focus:ring-vertex-gold">
                                        <SelectValue
                                            placeholder={
                                                type === "room"
                                                    ? "Choose Room Category"
                                                    : "Select Dinner Time"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-vertex-black border-white/20 text-white rounded-md">
                                        {type === "room"
                                            ? roomTypes.map((r) => (
                                                  <SelectItem
                                                      key={r}
                                                      value={r}
                                                      className="focus:bg-vertex-gold/20 rounded-md">
                                                      {r}
                                                  </SelectItem>
                                              ))
                                            : timeSlots.map((t) => (
                                                  <SelectItem
                                                      key={t}
                                                      value={t}
                                                      className="focus:bg-vertex-gold/20 rounded-md">
                                                      {t}
                                                  </SelectItem>
                                              ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date Picker */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                    <CalendarIcon className="w-3 h-3 text-vertex-gold" />
                                    Select Date
                                </label>
                                <Popover
                                    open={isCalendarOpen}
                                    onOpenChange={setIsCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-white rounded-md",
                                                !date && "text-white/40"
                                            )}>
                                            {date
                                                ? format(date, "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0 bg-vertex-black border-white/20 text-white rounded-md"
                                        align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateSelect}
                                            initialFocus
                                            className="pointer-events-auto"
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Guest Count */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                    <Users className="w-3 h-3 text-vertex-gold" />
                                    Number of Guests
                                </label>
                                <Select
                                    value={guests}
                                    onValueChange={setGuests}>
                                    <SelectTrigger className="w-full bg-white/5 border border-white/10 text-white rounded-md focus:ring-vertex-gold">
                                        <SelectValue placeholder="Select guests" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-vertex-black border-white/20 text-white rounded-md">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <SelectItem
                                                key={num}
                                                value={String(num)}
                                                className="focus:bg-vertex-gold/20 rounded-md">
                                                {num}{" "}
                                                {num === 1 ? "Guest" : "Guests"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Confirm Button */}
                            <Button
                                onClick={handleConfirm}
                                disabled={
                                    !date ||
                                    isLoading ||
                                    (type === "room" ? !roomType : !time)
                                }
                                className="w-full bg-vertex-gold text-black hover:bg-vertex-gold/90 font-display tracking-wider mt-6 py-5 rounded-lg transition-all">
                                {isLoading ? (
                                    <Loader2 className="animate-spin mr-2 w-4 h-4 inline-block" />
                                ) : (
                                    "Confirm Reservation"
                                )}
                            </Button>

                            {/* View Reservations */}
                            <Button
                                onClick={() => navigate("/my-reservations")}
                                variant="outline"
                                className="w-full mt-3 text-black border border-white/30 rounded-lg hover:bg-white/10 transition-all">
                                View My Reservations
                            </Button>
                        </div>
                    )}

                    {/* --- SUCCESS STATE --- */}
                    {step === "success" && (
                        <div className="flex flex-col items-center justify-center py-6 space-y-4 animate-fade-in text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>

                            <h3 className="font-display text-2xl text-white">
                                Request Received
                            </h3>

                            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                                Thank you for choosing Vertex. <br />
                                We have received your request for{" "}
                                <span className="text-vertex-gold font-bold">
                                    {guests} Guests
                                </span>{" "}
                                on{" "}
                                <span className="text-vertex-gold font-bold">
                                    {date && format(date, "MMM do")}
                                </span>
                                .
                            </p>

                            <div className="bg-white/5 rounded-xl p-5 w-full mt-4 border border-white/10 shadow-sm flex items-center justify-between">
                                <div className="text-lg font-mono text-white tracking-widest">
                                    #VTX-{Math.floor(Math.random() * 10000)}
                                </div>
                                <button className="text-vertex-gold hover:text-vertex-gold/80 text-sm">
                                    Copy
                                </button>
                            </div>

                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="w-full mt-4 border-white/20 text-black hover:bg-white/10 transition-all">
                                Close Window
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
