import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeatureSections from "@/components/FeatureSections";
import DiningGallery from "@/components/DiningGallery";
import AccommodationGrid from "@/components/AccommodationGrid";
import Footer from "@/components/Footer";

// 1. Define the props that App.tsx is trying to pass
interface IndexProps {
    onBookRoom: () => void;
    onBookTable: () => void;
}

// 2. Accept these props in the component
const Index = ({ onBookRoom, onBookTable }: IndexProps) => {
    return (
        <>
            {/* 3. Pass the props down to the components */}
            <Navbar onBookRoom={onBookRoom} onBookTable={onBookTable} />

            <main>
                <HeroSection
                    onBookRoom={onBookRoom}
                    onBookTable={onBookTable}
                />
                <AboutSection />
                <FeatureSections />
                <DiningGallery onBookTable={onBookTable} />
                <AccommodationGrid onBookRoom={onBookRoom} />
            </main>

            <Footer />

            {/* REMOVED: <BookingModal /> (It is now in App.tsx) */}
        </>
    );
};

export default Index;
