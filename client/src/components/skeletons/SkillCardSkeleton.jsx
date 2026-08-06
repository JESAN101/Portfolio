import Skeleton from "@/components/ui/Skeleton";

function SkillCardSkeleton({ count = 10, cols = "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" }) {
  return (
    <div className={`grid gap-8 ${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-8">
          <Skeleton className="mx-auto mb-5 h-12 w-12 rounded-xl" />
          <Skeleton className="mx-auto h-5 w-3/4 rounded-lg" />
          <Skeleton className="mx-auto mt-4 h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default SkillCardSkeleton;