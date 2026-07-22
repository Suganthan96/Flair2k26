import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Schedule from "@/components/Schedule";
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
        <About />
        <Events />
        <Schedule />
        <Speakers />
        <Sponsors />
        <Team />
        <RegisterCTA />
      </main>
      <Footer />
    </>
  );
}
