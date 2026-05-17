import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PromiseSection from "@/components/PromiseSection";
import CollectionSection from "@/components/CollectionSection";
import CTAStrip from "@/components/CTAStrip";
import StorySection from "@/components/StorySection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#2B003B", color: "#F8F4EC" }}>
      <Navbar />
      <main>
        <HeroSection />
        <PromiseSection />
        <CollectionSection />
        <CTAStrip />
        <StorySection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
