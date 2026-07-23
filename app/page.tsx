import Hero from "@/components/Hero";
import EventPromoCards from "@/components/EventPromoCards";
import Speakers from "@/components/Speakers";
import Sponsors from "@/components/Sponsors";
import Team from "@/components/Team";
import RegisterCTA from "@/components/RegisterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <EventPromoCards />
        <Speakers />
        <Sponsors />
        <Team />
        <RegisterCTA />
      </main>
      <Footer />
    </>
  );
}
