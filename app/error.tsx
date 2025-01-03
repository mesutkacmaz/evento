"use client"; // Error components must be Client Components

import Title from "@/components/Title";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="py-24 text-center">
      {/* <H1 className="mb-5">Something went wrong!</H1> */}
      <Title className="mb-2">{error.message}</Title>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          reset
        }
      >
        Try again
      </button>
    </main>
  );
}
