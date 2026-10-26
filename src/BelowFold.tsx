import { useCallback, useEffect, useState } from "react";
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

// Everything after the hero; loaded as its own chunk so the hero renders first.
export default function BelowFold({ takeEarlyHash }: { takeEarlyHash: () => string }) {
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

  useEffect(() => {
    const id = decodeURIComponent(takeEarlyHash().slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [takeEarlyHash]);

  // Lets CSS pause continuous animations in sections that are off-screen.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    document.querySelectorAll(".app-content > section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ProblemsSection />
      <JourneyTimeline />
      <SolutionsSection onActiveChange={handleActiveChange} onShowResults={handleShowResults} />
      <ResultsSection selectedId={tutorId} onSelect={setTutorId} />
      <CourseContentSection />
      <TargetAudienceSection />
      <OfferSection />
      <FAQSection />
      <Footer />
    </>
  );
}
