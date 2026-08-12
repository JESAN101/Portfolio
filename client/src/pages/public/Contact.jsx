import Contact from "@/components/sections/Contact";
import Seo from "@/components/seo/Seo";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Seo
        title="Contact"
        description="Get in touch — I'm always open to discussing new projects, collaborations or opportunities."
      />
      <Contact />
    </div>
  );
}
