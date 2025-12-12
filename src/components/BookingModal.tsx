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
    // --- State Management ---
    const [step, setStep] = useState<"form" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [date, setDate] = useState<Date>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Controls calendar visibility
    const [guests, setGuests] = useState<string>("2");
    const [time, setTime] = useState<string>(""); // For Dining
    const [roomType, setRoomType] = useState<string>(""); // For Hotel

    // Reset state when modal opens/closes
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

    // 1. Fix for Calendar Closing
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsCalendarOpen(false); // Closes the popover automatically
    };

    // 2. Simulate "Real App" Processing
    const handleConfirm = () => {
        if (!date) return; // Validation handled by disabled button

        setIsLoading(true);

        // Fake API delay
        setTimeout(() => {
            setIsLoading(false);
            setStep("success");
        }, 1500);
    };

    // --- Data Options ---
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
            <DialogContent className="bg-vertex-black border-vertex-gold/20 text-white max-w-md p-0 overflow-hidden shadow-2xl">
                {/* --- HEADER --- */}
                <DialogHeader className="px-6 pt-8 pb-2">
                    <DialogTitle className="font-display text-2xl tracking-widest text-center flex flex-col items-center gap-2">
                        {step === "form" && (
                            <>
                                <span className="text-vertex-gold text-xs font-bold uppercase tracking-[0.3em]">
                                    Vertex{" "}
                                    {type === "room" ? "Resort" : "Dining"}
                                </span>
                                {type === "room"
                                    ? "BOOK A SUITE"
                                    : "RESERVE A TABLE"}
                            </>
                        )}
                    </DialogTitle>
                </DialogHeader>

                {/* --- BODY CONTENT --- */}
                <div className="px-6 pb-8">
                    {/* VIEW 1: THE FORM */}
                    {step === "form" && (
                        <div className="space-y-5 animate-fade-in">
                            {/* Conditional Field: Room Type OR Time Slot */}
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
                                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white focus:ring-vertex-gold">
                                        <SelectValue
                                            placeholder={
                                                type === "room"
                                                    ? "Choose Room Category"
                                                    : "Select Dinner Time"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-vertex-black border-white/20 text-white">
                                        {type === "room"
                                            ? roomTypes.map((r) => (
                                                  <SelectItem
                                                      key={r}
                                                      value={r}
                                                      className="focus:bg-vertex-gold/20">
                                                      {r}
                                                  </SelectItem>
                                              ))
                                            : timeSlots.map((t) => (
                                                  <SelectItem
                                                      key={t}
                                                      value={t}
                                                      className="focus:bg-vertex-gold/20">
                                                      {t}
                                                  </SelectItem>
                                              ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date Picker (With Auto-Close Fix) */}
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
                                                "w-full justify-start text-left font-normal bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-white",
                                                !date && "text-white/40"
                                            )}>
                                            {date
                                                ? format(date, "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0 bg-vertex-black border-white/20 text-white"
                                        align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateSelect} // Calls the new handler
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
                                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white focus:ring-vertex-gold">
                                        <SelectValue placeholder="Select guests" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-vertex-black border-white/20 text-white">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <SelectItem
                                                key={num}
                                                value={String(num)}
                                                className="focus:bg-vertex-gold/20">
                                                {num}{" "}
                                                {num === 1 ? "Guest" : "Guests"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Confirm Button with Loader */}
                            <Button
                                onClick={handleConfirm}
                                disabled={
                                    !date ||
                                    isLoading ||
                                    (type === "room" ? !roomType : !time)
                                }
                                className="w-full bg-vertex-gold text-black hover:bg-vertex-gold/90 font-display tracking-widest mt-4 py-6">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        PROCESSING REQUEST
                                    </>
                                ) : (
                                    "CONFIRM RESERVATION"
                                )}
                            </Button>
                        </div>
                    )}

                    {/* VIEW 2: SUCCESS STATE */}
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

                            <div className="bg-white/5 rounded-lg p-4 w-full mt-4 border border-white/10">
                                <div className="flex justify-between text-xs uppercase tracking-widest text-white/50 mb-1">
                                    <span>Confirmation ID</span>
                                </div>
                                <div className="text-lg font-mono text-white tracking-widest">
                                    #VTX-{Math.floor(Math.random() * 10000)}
                                </div>
                            </div>

                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="w-full mt-4 border-white/20 text-black hover:bg-white/10">
                                CLOSE WINDOW
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
