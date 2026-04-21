'use client';

import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-4">
        <FiAlertTriangle className="text-gray-500 text-2xl" />
      </div>

      <h2 className="text-md font-semibold text-gray-800 mb-2">
        Something went wrong
      </h2>

      <p className="text-gray-500 mb-6 max-w-md text-sm">
        Failed to load data. Please check your connection or try again.
      </p>

      <button
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2 bg-current custom-primary text-white rounded-lg hover:bg-gray-700 transition shadow-sm"
      >
        <FiRefreshCw className="text-sm text-white" />
        <h1 className="text-white text-sm">Retry</h1>
      </button>

      {/* Optional: show error in dev */}
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-6 text-xs text-gray-400 max-w-md overflow-auto">
          {error.message}
        </pre>
      )}
    </div>
  );
}