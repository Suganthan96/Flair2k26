import Hero from "@/components/Hero";
import EventPromoCards from "@/components/EventPromoCards";
import Sponsors from "@/components/Sponsors";
import Team from "@/components/Team";
import RegisterCTA from "@/components/RegisterCTA";
import Footer from "@/components/Footer";
import SectionBackground from "@/components/SectionBackground";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <SectionBackground />
      </div>
      <main className="relative z-10 flex-1">
        <Hero />
        <EventPromoCards />
        <Sponsors />
        <Team />
        <RegisterCTA />
      </main>
      <Footer />
    </>
  );
}
