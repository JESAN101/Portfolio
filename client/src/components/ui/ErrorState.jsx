import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

function ErrorState({ message = "Something went wrong while loading data.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
      <FaExclamationTriangle className="h-10 w-10 text-amber-400" />
      <p className="mt-4 max-w-sm text-sm text-muted">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          <FaRedo className="h-3.5 w-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;