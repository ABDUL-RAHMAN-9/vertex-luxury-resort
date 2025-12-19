import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
    const [step, setStep] = useState<"form" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [guests, setGuests] = useState("");
    const [date, setDate] = useState<Date>();
    const [selection, setSelection] = useState("");

    useEffect(() => {
        if (open) {
            setStep("form");
            setIsLoading(false);
            setName("");
            setGuests("");
            setDate(undefined);
            setSelection("");
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Handles the Enter key and prevents page reload

        // Manual check for Date and Selects since native HTML validation is tricky for custom components
        if (!date || !selection || !guests) {
            alert("Please fill in all selection fields.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setStep("success");

            const bookingData = {
                id: `VTX-${Math.floor(Math.random() * 10000)}`,
                type,
                name,
                guests,
                date: format(date, "dd/MM/yyyy"),
                detail: selection,
            };

            const existing = localStorage.getItem("vertex_bookings");
            const bookings = existing ? JSON.parse(existing) : [];
            bookings.push(bookingData);
            localStorage.setItem("vertex_bookings", JSON.stringify(bookings));
        }, 1500);
    };

    const options =
        type === "room"
            ? [
                  "Ocean Deluxe",
                  "Spa Sanctuary",
                  "Skyline Bath",
                  "Presidential Suite",
              ]
            : ["18:00", "19:00", "20:00", "21:00", "22:00"];

    const inputClasses =
        "w-full bg-transparent border-b border-white/20 rounded-none px-0 py-1 focus:border-white transition-colors outline-none text-white text-lg placeholder:text-white/20";
    const labelClasses =
        "text-[10px] uppercase tracking-[0.1em] text-white/40 mt-1 block mb-2";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            {/* Added w-[92vw] and max-w-2xl for mobile margin, and reduced padding for a shorter look */}
            <DialogContent className="w-[92vw] sm:max-w-2xl bg-[#0a0a0a] border border-white/10 p-0 overflow-hidden shadow-2xl rounded-sm">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-white/50 hover:text-white z-50">
                    <X className="w-6 h-6" />
                </button>

                <div className="p-6 md:p-10">
                    {step === "form" ? (
                        <form
                            onSubmit={handleSubmit}
                            className="animate-in fade-in duration-500">
                            {/* Title Styling */}
                            <h2 className="text-3xl md:text-4xl tracking-tight text-white mb-12 uppercase">
                                BOOK A TABLE
                            </h2>

                            {/* 2x2 Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                {/* 1. Name */}
                                <div className="flex flex-col">
                                    <input
                                        required
                                        type="text"
                                        placeholder="YOUR NAME"
                                        className={inputClasses}
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <label className={labelClasses}>
                                        Who should book a {type} for?
                                    </label>
                                </div>

                                {/* 2. Guests */}
                                <div className="flex flex-col">
                                    <Select
                                        required
                                        value={guests}
                                        onValueChange={setGuests}>
                                        <SelectTrigger className="border-0 border-b border-white/20 rounded-none bg-transparent px-0 text-lg h-auto py-1 focus:ring-0 text-white shadow-none">
                                            <SelectValue placeholder="NUMBER OF PEOPLE" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#111] border-white/10 text-white">
                                            {[2, 4, 6, 8, 10].map((n) => (
                                                <SelectItem
                                                    key={n}
                                                    value={n.toString()}
                                                    className="text-white focus:bg-white/10 cursor-pointer">
                                                    {n} People
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <label className={labelClasses}>
                                        Guests count
                                    </label>
                                </div>

                                {/* 3. Selection (Suite/Time) */}
                                <div className="flex flex-col">
                                    <Select
                                        required
                                        value={selection}
                                        onValueChange={setSelection}>
                                        <SelectTrigger className="border-0 border-b border-white/20 rounded-none bg-transparent px-0 text-lg h-auto py-1 focus:ring-0 text-white uppercase shadow-none">
                                            <SelectValue
                                                placeholder={
                                                    type === "room"
                                                        ? "SELECT SUITE"
                                                        : "SELECT TIME"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#111] border-white/10 text-white">
                                            {options.map((opt) => (
                                                <SelectItem
                                                    key={opt}
                                                    value={opt}
                                                    className="text-white focus:bg-white/10 cursor-pointer">
                                                    {opt}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <label className={labelClasses}>
                                        {type === "room"
                                            ? "Suite Preference"
                                            : "Preferred Time"}
                                    </label>
                                </div>

                                {/* 4. Date (Auto-closes on selection) */}
                                <div className="flex flex-col">
                                    <Popover
                                        open={isCalendarOpen}
                                        onOpenChange={setIsCalendarOpen}>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className={cn(
                                                    inputClasses,
                                                    "text-left",
                                                    !date && "text-white/20"
                                                )}>
                                                {date
                                                    ? format(date, "dd/MM/yyyy")
                                                    : "TODAY"}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="bg-black border-white/20 p-0 text-white"
                                            align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(d) => {
                                                    setDate(d);
                                                    setIsCalendarOpen(false); // Closes calendar immediately
                                                }}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                className="bg-black text-white"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <label className={labelClasses}>
                                        What date to book?
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-20 mb-4 flex justify-center">
                                <Button
                                    type="submit"
                                    className="w-full max-w-md h-12 md:h-14 rounded-full border border-white/30 bg-transparent hover:bg-white hover:text-black text-white text-[15px] tracking-[0.3em] transition-all duration-500 uppercase font-normal">
                                    {isLoading ? (
                                        <Loader2 className="animate-spin w-5 h-5" />
                                    ) : (
                                        "Make a Reservation"
                                    )}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        /* Success View */
                        <div className="flex flex-col items-center justify-center py-6 animate-in fade-in zoom-in-95 duration-500 text-center">
                            <CheckCircle2 className="w-14 h-14 text-white font-thin mb-4" />
                            <h3 className="text-xl font-light tracking-widest text-white uppercase mb-2">
                                Confirmed
                            </h3>
                            <p className="text-white/50 max-w-xs mb-8 text-[10px] tracking-[0.2em] uppercase">
                                Your reservation has been sent to our concierge
                                team.
                            </p>
                            <Button
                                onClick={onClose}
                                className="px-10 rounded-full border border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-[0.2em]">
                                Close
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
