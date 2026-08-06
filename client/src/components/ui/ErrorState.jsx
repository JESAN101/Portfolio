import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

function ErrorState({ message = "Something went wrong while loading data.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 py-16 text-center">
      <FaExclamationTriangle className="h-10 w-10 text-amber-400" />
      <p className="mt-4 max-w-sm text-sm text-zinc-400">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <FaRedo className="h-3.5 w-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
