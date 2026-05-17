import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PromiseSection from "@/components/PromiseSection";
import CollectionSection from "@/components/CollectionSection";
import StorySection from "@/components/StorySection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[hsl(30,8%,6%)] text-[hsl(36,25%,85%)] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <PromiseSection />
        <CollectionSection />
        <StorySection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
