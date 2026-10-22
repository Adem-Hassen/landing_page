import "./LandingPage.css";
import "./styles/Responsive.css";
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
  return (
    <div className="gradient-bg">
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