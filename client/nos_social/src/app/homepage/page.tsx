'use client';
import AboutSection from "@/components/AboutSection";
import HeaderHomepage from "@/components/HeaderHomepage";
import HeroSection from "@/components/HeroSection";

function Homepage() {
    return (
        <main>
            <HeaderHomepage />
            <HeroSection />
            <AboutSection />
        </main>
    )
}
export default Homepage;