import About from "@/components/sections/About";
import Seo from "@/components/seo/Seo";

export default function AboutPage() {
  return (
    <div className="pt-24">
      <Seo
        title="About"
        description="Learn more about my background, skills, and what I do as a full-stack developer."
      />
      <About />
    </div>
  );
}
