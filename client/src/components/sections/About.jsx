import Container from "@/components/ui/Container";
import profile from "@/assets/images/profile.jpg";

function About() {
  return (
    <section
      id="about"
      className="bg-zinc-950 py-28 text-white"
    >
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full rounded-3xl border border-blue-500"></div>

            <img
              src={profile}
              alt="Bogati"
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
              I'm a Full Stack MERN Developer from Nepal. I enjoy building
              beautiful, fast and scalable web applications with modern
              technologies. My goal is to create products that are both visually
              appealing and technically strong.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-4xl font-black text-blue-500">15+</h3>
                <p className="mt-2 text-zinc-400">Projects Completed</p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-blue-500">2+</h3>
                <p className="mt-2 text-zinc-400">Years Learning</p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-blue-500">10+</h3>
                <p className="mt-2 text-zinc-400">Technologies</p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-blue-500">100%</h3>
                <p className="mt-2 text-zinc-400">Dedication</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;