import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Containers from "@/components/Containers";
import Fleet from "@/components/Fleet";
import Fahrzeitrechner from "@/components/Fahrzeitrechner";
import Locations from "@/components/Locations";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Journey />
      <Stats />
      <Services />
      <Containers />
      <Fleet />
      <Fahrzeitrechner />
      <Locations />
      <About />
      <Contact />
    </main>
  );
}
