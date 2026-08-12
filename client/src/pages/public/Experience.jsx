import Experience from "@/components/sections/Experience";
import Seo from "@/components/seo/Seo";

export default function ExperiencePage() {
  return (
    <div className="pt-20">
      <Seo
        title="Experience"
        description="My professional experience — the roles, companies and technologies I've worked with."
      />
      <Experience />
    </div>
  );
}
