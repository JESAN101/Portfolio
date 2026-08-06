import Skeleton from "@/components/ui/Skeleton";

function CertificateCardSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-border bg-card p-8">
          <Skeleton className="mb-8 h-20 w-20 rounded-2xl" />
          <Skeleton className="h-7 w-2/3 rounded-xl" />
          <Skeleton className="mt-3 h-5 w-1/3 rounded-lg" />
          <Skeleton className="mt-8 h-11 w-36 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default CertificateCardSkeleton;