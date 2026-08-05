import Container from "@/components/ui/Container";

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8 text-zinc-400">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© 2026 Bogati. All rights reserved.</p>

          <p>Built with React • Vite • Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;