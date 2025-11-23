'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
 

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 gap-4">
      <h2 className="text-3xl font-bold text-red-400/60">Something went wrong!</h2>
      <p className="text-white/60 text-center max-w-md">
        {error.message}
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-white/10 text-white/60 rounded-md hover:bg-white/20 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-white/10 text-white/60 rounded-md hover:bg-white/20 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

