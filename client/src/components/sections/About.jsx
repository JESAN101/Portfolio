import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import profileFallback from "@/assets/images/profile.jpg";
import Skeleton from "@/components/ui/Skeleton";

function About() {
  const { profile, projects, skills, experience, certificates, loading } = usePortfolio();

  if (loading) {
    return (
      <section id="about" className="bg-zinc-950 py-28 text-white">
        <Container>
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <Skeleton className="h-[520px] w-full rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-36 rounded-full" />
              <Skeleton className="h-20 w-3/4 rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const stats = [
    { value: `${projects?.length || 0}+`, label: "Projects Completed" },
    { value: `${skills?.length || 0}+`, label: "Technologies" },
    { value: `${experience?.length || 0}+`, label: "Experience Entries" },
    { value: `${certificates?.length || 0}+`, label: "Certificates" },
  ];

  return (
    <section id="about" className="bg-zinc-950 py-28 text-white">
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full rounded-3xl border border-blue-500" />
            <img
              src={profile?.profileImage || profileFallback}
              alt={profile?.fullName || "Profile"}
              className="relative h-[520px] w-full rounded-3xl object-cover"
            />
          </div>

          <div>
            <span className="rounded-full border border-blue-500 px-4 py-2 text-sm text-blue-400">
              About Me
            </span>

            <h2 className="mt-6 text-5xl font-black">
              Passionate Developer
              <br />
              Building Modern
              <span className="text-blue-500"> Web Apps.</span>
            </h2>

            <p className="mt-8 text-lg leading-9 text-zinc-400">
              {profile?.about}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <h3 className="text-4xl font-black text-blue-500">{stat.value}</h3>
                  <p className="mt-2 text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
