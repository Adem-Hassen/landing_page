import "./LandingPage.css";
import "./styles/Responsive.css";
import { lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import NavBar from "./components/shared/NavBar";
import HeroSection from "./components/sections/HeroSection";

// Hash links (e.g. the navbar CTA to #join-us) clicked before the chunk holding their target has arrived.
let earlyHash = "";
const rememberHash = () => {
  earlyHash = window.location.hash;
};
window.addEventListener("hashchange", rememberHash);
const takeEarlyHash = () => {
  window.removeEventListener("hashchange", rememberHash);
  return earlyHash;
};

const BelowFold = lazy(() => import("./BelowFold"));

export default function LandingPage() {
  // The hero uses the lightweight `m` components; sections below the fold bring the full `motion` in their chunk.
  return (
    <LazyMotion features={domAnimation}>
      <div className="gradient-bg">
        <div className="app-content">
          <NavBar />
          <HeroSection />
          <Suspense fallback={<div style={{ minHeight: "100vh" }} aria-hidden="true" />}>
            <BelowFold takeEarlyHash={takeEarlyHash} />
          </Suspense>
        </div>
      </div>
    </LazyMotion>
  );
}
