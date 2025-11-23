'use client';

import Link from 'next/link';

export default function PokemonError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 gap-4">
      <h2 className="text-3xl font-bold text-red-400">Failed to load Pokemon</h2>
      <p className="text-white/60 text-center max-w-md">
        {error.message || 'An unexpected error occurred while loading Pokemon details'}
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

