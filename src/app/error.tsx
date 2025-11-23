'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 gap-4">
      <h2 className="text-3xl font-bold text-red-400">Something went wrong!</h2>
      <p className="text-white/60 text-center max-w-md">
        {error.message || 'An unexpected error occurred'}
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
          Go home
        </Link>
      </div>
    </div>
  );
}

