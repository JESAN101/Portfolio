import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";

function Footer() {
  const { profile } = usePortfolio();

  return (
    <footer className="border-t border-border bg-surface py-8 text-muted">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {profile?.fullName || "Portfolio"}. All rights reserved.</p>

          <div className="flex gap-4">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="transition hover:text-foreground">
                Email
              </a>
            )}
            {profile?.socials?.github && (
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="transition hover:text-foreground">
                GitHub
              </a>
            )}
            {profile?.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-foreground">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;