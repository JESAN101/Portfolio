import Skeleton from "@/components/ui/Skeleton";
import Container from "@/components/ui/Container";

function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 text-foreground">
      <div className="absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

      <Container>
        <div className="grid min-h-[90vh] items-center gap-20 lg:grid-cols-2">
          <div className="space-y-6">
            <Skeleton className="h-10 w-48 rounded-full" />
            <Skeleton className="h-24 w-3/4 rounded-2xl" />
            <Skeleton className="h-10 w-72 rounded-2xl" />
            <Skeleton className="h-24 w-full max-w-xl rounded-2xl" />
            <div className="flex gap-5">
              <Skeleton className="h-14 w-40 rounded-xl" />
              <Skeleton className="h-14 w-44 rounded-xl" />
            </div>
            <div className="flex gap-5 pt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-14 rounded-full" />
              ))}
            </div>
          </div>
          <Skeleton className="hidden h-[460px] w-[460px] rounded-full lg:block" />
        </div>
      </Container>
    </section>
  );
}

export default HeroSkeleton;