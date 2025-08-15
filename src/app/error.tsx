"use client";

import LottieHandler from "@/components/LottieHandler";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="flex items-center justify-center flex-col min-h-[calc(100vh-64px)] px-4 pb-16">
      <div className="w-full max-w-md">
        <LottieHandler type="error" message={error.message} />

        <div className="flex items-center justify-around mt-7 mx-auto">
          <button
            onClick={reset}
            className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-1.5 px-4 rounded-full "
          >
            Try Again
          </button>

          <Link
            href="/"
            className="text-base font-bold py-1.5 px-2 bg-cyan-300 rounded-full text-black "
          >
            Go Back &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
