import Projects from "@/components/sections/Projects";
import Seo from "@/components/seo/Seo";

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <Seo
        title="Projects"
        description="Browse my projects — web, mobile and desktop applications built with modern technologies."
      />
      <Projects />
    </div>
  );
}
