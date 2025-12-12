import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X, Users } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    type: "room" | "table";
}

const BookingModal = ({ open, onClose, type }: BookingModalProps) => {
    const [date, setDate] = useState<Date>();
    const [guests, setGuests] = useState<string>("2");
    const { toast } = useToast();

    const handleConfirm = () => {
        if (!date) {
            toast({
                title: "Please select a date",
                description:
                    "A date is required to complete your booking request.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Request Sent",
            description: `Your ${
                type === "room" ? "suite" : "table"
            } booking for ${format(date, "PPP")} at VERTEX has been submitted.`,
        });
        onClose();
        setDate(undefined);
        setGuests("2");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-background border-border max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl tracking-widest">
                        {type === "room" ? "BOOK A SUITE" : "RESERVE A TABLE"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Select Date
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal border-border",
                                        !date && "text-muted-foreground"
                                    )}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0 bg-background border-border"
                                align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    className="pointer-events-auto"
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Number of Guests */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Number of Guests
                        </label>
                        <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger className="w-full border-border">
                                <Users className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                        {num} {num === 1 ? "Guest" : "Guests"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Confirm Button */}
                    <Button
                        onClick={handleConfirm}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-widest">
                        CONFIRM REQUEST
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
