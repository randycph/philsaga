import { uiCopy } from "./data/ui";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TigerValues } from "./components/TigerValues";
import { TrustStrip } from "./components/TrustStrip";
import { CompanyIntro } from "./components/CompanyIntro";
import { VisionMission } from "./components/VisionMission";
import { Sdmp } from "./components/Sdmp";
import { CommunityPrograms } from "./components/CommunityPrograms";
import { VideoSection } from "./components/VideoSection";
import { Footer } from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();

  return (
    <div className="min-h-dvh bg-background font-sans text-base leading-[1.7] text-foreground selection:bg-primary selection:text-background [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-primary [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-4 [&_button]:focus-visible:outline-primary">
      <a
        href={uiCopy.main}
        className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-lg bg-primary px-5 py-3 text-background focus:translate-y-0"
      >
        {uiCopy.skipToContent}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <CompanyIntro />
        <VisionMission />
        <TigerValues />
        <Sdmp />
        <CommunityPrograms />
        <VideoSection />
      </main>
      <Footer />
    </div>
  );
}
