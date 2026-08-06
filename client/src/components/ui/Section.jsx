import Container from "./Container";

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export default Section;
