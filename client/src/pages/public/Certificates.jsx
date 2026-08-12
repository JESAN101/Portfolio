import Certificates from "@/components/sections/Certificates";
import Seo from "@/components/seo/Seo";

export default function CertificatesPage() {
  return (
    <div className="pt-20">
      <Seo
        title="Certificates"
        description="Certifications and credentials I've earned from courses, programs and exams."
      />
      <Certificates />
    </div>
  );
}
