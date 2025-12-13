import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// --- Components ---
import BookingModal from "./components/BookingModal";

// --- Pages ---
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OurStory from "./pages/OurStory";
import Wellness from "./pages/Wellness";
import DiningMenu from "./pages/DiningMenu";
import MyReservations from "./pages/MyReservations";
import Accommodations from "./pages/Accommodations";

const queryClient = new QueryClient();

const App = () => {
    // --- STATE: Manage Booking Modal Globally ---
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingType, setBookingType] = useState<"room" | "table">("room");

    const handleBookRoom = () => {
        setBookingType("room");
        setIsBookingOpen(true);
    };

    const handleBookTable = () => {
        setBookingType("table");
        setIsBookingOpen(true);
    };

    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Index
                                        onBookRoom={handleBookRoom}
                                        onBookTable={handleBookTable}
                                    />
                                }
                            />
                            <Route path="/story" element={<OurStory />} />
                            <Route path="/wellness" element={<Wellness />} />
                            <Route
                                path="/dining-menu"
                                element={<DiningMenu />}
                            />
                            <Route
                                path="/my-reservations"
                                element={<MyReservations />}
                            />

                            <Route
                                path="/accommodations"
                                element={
                                    <Accommodations
                                        onBookRoom={handleBookRoom}
                                    />
                                }
                            />

                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        {/* --- GLOBAL MODAL --- */}
                        {/* This ensures the modal works from ANY page (Index or Accommodations) */}
                        <BookingModal
                            open={isBookingOpen} // CHANGED: 'isOpen' -> 'open'
                            onClose={() => setIsBookingOpen(false)}
                            type={bookingType}
                        />
                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider>
        </HelmetProvider>
    );
};

export default App;
