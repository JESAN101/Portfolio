import Skills from "@/components/sections/Skills";
import Seo from "@/components/seo/Seo";

export default function SkillsPage() {
  return (
    <div className="pt-20">
      <Seo
        title="Skills"
        description="A look at my technical skills, tools and technologies across frontend, backend and more."
      />
      <Skills />
    </div>
  );
}
