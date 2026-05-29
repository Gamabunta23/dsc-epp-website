import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Containers from "@/components/Containers";
import Fleet from "@/components/Fleet";
import Fahrzeitrechner from "@/components/Fahrzeitrechner";
import Locations from "@/components/Locations";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Containers />
        <Fleet />
        <Fahrzeitrechner />
        <Locations />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
