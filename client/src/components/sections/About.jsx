import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { Link } from "react-router-dom";
import profilePlaceholder from "@/assets/images/Profile_placeholder.webp";
import logo from "@/assets/logo/JB_logo_1.png";

import { FaFolderOpen, FaCode, FaBriefcase } from "react-icons/fa";

import Skeleton from "@/components/ui/Skeleton";

function About() {
  const { profile, projects, skills, experience, loading } = usePortfolio();

  if (loading) {
    return (
      <section id="about" className="bg-background py-28 text-foreground md:py-36">
        <Container>
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <Skeleton className="h-[520px] w-full rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-20 w-3/4 rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
              <div className="grid grid-cols-4 gap-6 border-t border-foreground/10 pt-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const stats = [
    { value: `${projects?.length || 0}+`, label: "Projects", icon: <FaFolderOpen size={16} />, to: "/projects" },
    { value: `${skills?.length || 0}+`, label: "Technologies", icon: <FaCode size={16} />, to: "/skills" },
    { value: `${experience?.length || 0}+`, label: "Experience", icon: <FaBriefcase size={16} />, to: "/experience" },
  ];

  const imageSrc = profile?.aboutImage || profile?.profileImage || profilePlaceholder;
  const imageAlt = imageSrc === profilePlaceholder ? "Profile placeholder" : profile?.fullName || "Profile";

  return (
    <section id="about" className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      {/* ambient accents */}
      <div className="pointer-events-none absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

      <Container className="relative">
        <div className="grid items-start gap-20 lg:grid-cols-2">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:mt-20">
            {/* offset blue glow behind the card */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gradient-to-br from-primary/30 to-secondary/25 blur-3xl" />

            {/* corner accents: top-right + bottom-left only */}
            <div className="absolute -top-[3px] -right-[3px] h-[55%] w-[55%] rounded-tr-[30px] border-r-[3px] border-t-[3px] border-primary" />
            <div className="absolute -bottom-[3px] -left-[3px] h-[55%] w-[55%] rounded-bl-[30px] border-b-[3px] border-l-[3px] border-primary" />

            {/* glassmorphism portrait card */}
            <div className="relative rounded-[30px] border border-white/60 bg-white/30 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="relative overflow-hidden rounded-[24px]">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-[480px] w-full object-cover transition-transform duration-700 ease-out hover:scale-105 lg:h-[540px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent" />
              </div>
            </div>

            {/* logo straddling the right border */}
            <img
              src={logo}
              alt="Logo"
              className="absolute -right-8 top-100/105 h-16 w-16 -translate-y-1/2 select-none object-contain lg:-right-10 lg:h-20 lg:w-20"
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-primary/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                About Me
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl">
              Passionate Developer
              <br />
              Building Modern{" "}
              <span className="relative inline-block text-primary">
                Web Apps
                <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
              </span>
              <span className="text-primary">.</span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-muted [text-align:justify] [text-justify:inter-word]">
              {profile?.about}
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-x-8 gap-y-8 border-t border-foreground/10 pt-10">
              {stats.map((stat) => (
                <Link
                  to={stat.to}
                  key={stat.label}
                  className="group relative pb-3"
                >
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full" />
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-gradient-to-br from-primary/10 to-secondary/10 text-primary shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                    {stat.icon}
                  </div>
                  <h3 className="mt-3 text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent sm:text-4xl">
                    {stat.value}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted transition-colors group-hover:text-primary/70">
                    {stat.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;