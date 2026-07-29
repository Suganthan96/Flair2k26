import Hero from "@/components/Hero";
import EventsHeader from "@/components/EventsHeader";
import EventPromoCards from "@/components/EventPromoCards";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <EventsHeader />
        <EventPromoCards />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
