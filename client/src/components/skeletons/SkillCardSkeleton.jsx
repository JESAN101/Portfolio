import Skeleton from "@/components/ui/Skeleton";

function SkillCardSkeleton({ count = 12, cols = "sm:grid-cols-2" }) {
  return (
    <div className={`grid gap-x-10 gap-y-12 ${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={j} className="flex min-h-[230px] flex-col items-center rounded-2xl border border-border bg-card p-4">
              <Skeleton className="mt-3 h-14 w-14 rounded-full" />
              <Skeleton className="mx-auto mt-4 h-4 w-3/4 rounded-lg" />
              <div className="flex-1" />
              <Skeleton className="h-1.5 w-full rounded-full" />
              <Skeleton className="mt-4 h-7 w-24 rounded-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SkillCardSkeleton;