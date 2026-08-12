import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Seo, { buildPersonStructuredData } from "@/components/seo/Seo";
import { usePortfolio } from "@/context/PortfolioContext";

function Home() {
  const { profile } = usePortfolio();

  return (
    <>
      <Seo
        title="Full-Stack Developer"
        description={
          profile?.shortBio ||
          profile?.about ||
          "Full Stack Developer portfolio showcasing projects, skills, experience and certifications."
        }
        structuredData={buildPersonStructuredData(profile)}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience compact />
      <Contact />
    </>
  );
}

export default Home;
