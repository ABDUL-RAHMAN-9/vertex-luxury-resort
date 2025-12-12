import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeatureSections from "@/components/FeatureSections";
import DiningGallery from "@/components/DiningGallery";
import AccommodationGrid from "@/components/AccommodationGrid";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const Index = () => {
    const [bookingModal, setBookingModal] = useState<{
        open: boolean;
        type: "room" | "table";
    }>({
        open: false,
        type: "room",
    });

    const openBookRoom = () => setBookingModal({ open: true, type: "room" });
    const openBookTable = () => setBookingModal({ open: true, type: "table" });
    const closeModal = () => setBookingModal({ ...bookingModal, open: false });

    return (
        <>
            <Navbar onBookRoom={openBookRoom} onBookTable={openBookTable} />

            <main>
                <HeroSection
                    onBookRoom={openBookRoom}
                    onBookTable={openBookTable}
                />
                <AboutSection />
                <FeatureSections />
                <DiningGallery onBookTable={openBookTable} />
                <AccommodationGrid onBookRoom={openBookRoom} />
            </main>

            <Footer />

            <BookingModal
                open={bookingModal.open}
                onClose={closeModal}
                type={bookingModal.type}
            />
        </>
    );
};

export default Index;
