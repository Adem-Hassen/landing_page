import "./LandingPage.css";
import "./styles/Responsive.css";
import { useState } from "react";
import FloatingIcons from "./components/sections/FloatingIcons";
import NavBar from "./components/shared/NavBar";
import HeroSection from "./components/sections/HeroSection";
import ProblemsSection from "./components/sections/ProblemsSection";
import JourneyTimeline from "./components/sections/JourneyTimeline";
import SolutionsSection from "./components/sections/SolutionsSection";
import CourseContentSection from "./components/sections/CourseContentSection";
import TargetAudienceSection from "./components/sections/TargetAudienceSection";

import OfferSection from "./components/sections/OfferSection";
import FAQSection from "./components/sections/FAQSection";
import Footer from "./components/sections/Footer";

export default function LandingPage() {
  const [showIcons] = useState(true);
  const [isScrolling] = useState(false);

  return (
    <div className="gradient-bg">
      {/* ===== FLOATING BACKGROUND ICONS ===== */}
      <FloatingIcons showIcons={showIcons} isScrolling={isScrolling} />

      <div className="app-content">
        <NavBar />
        <HeroSection />
        <ProblemsSection />
        <JourneyTimeline />
        <SolutionsSection />
        <CourseContentSection />
        <TargetAudienceSection />
        <OfferSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
}