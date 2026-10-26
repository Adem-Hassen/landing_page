import "./LandingPage.css";
import "./styles/Responsive.css";
import { useCallback, useState } from "react";
import NavBar from "./components/shared/NavBar";
import HeroSection from "./components/sections/HeroSection";
import ProblemsSection from "./components/sections/ProblemsSection";
import JourneyTimeline from "./components/sections/JourneyTimeline";
import SolutionsSection from "./components/sections/SolutionsSection";
import CourseContentSection from "./components/sections/CourseContentSection";
import TargetAudienceSection from "./components/sections/TargetAudienceSection";
import ResultsSection from "./components/sections/ResultsSection";

import OfferSection from "./components/sections/OfferSection";
import FAQSection from "./components/sections/FAQSection";
import Footer from "./components/sections/Footer";
import { TEACHERS } from "./data/teachers";

export default function LandingPage() {
  // Tutor shown in ResultsSection; follows the SolutionsSection accordion.
  const [tutorId, setTutorId] = useState(TEACHERS[0].id);

  const handleActiveChange = useCallback((id: string) => {
    setTutorId(id || TEACHERS[0].id);
  }, []);

  const handleShowResults = useCallback((id: string) => {
    setTutorId(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("results")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <div className="gradient-bg">
      <div className="app-content">
        <NavBar />
        <HeroSection />
        <ProblemsSection />
        <JourneyTimeline />
        <SolutionsSection onActiveChange={handleActiveChange} onShowResults={handleShowResults} />
        <ResultsSection selectedId={tutorId} onSelect={setTutorId} />
        <CourseContentSection />
        <TargetAudienceSection />
        <OfferSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
}
