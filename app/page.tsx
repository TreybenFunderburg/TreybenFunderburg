import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Portfolio } from "@/sections/Portfolio";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { HashScroll } from "@/components/HashScroll";

export default function Home() {
  return (
    <>
      <HashScroll />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
    </>
  );
}
