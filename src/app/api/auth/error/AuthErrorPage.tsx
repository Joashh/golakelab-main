'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  const getMessage = (err: string | null) => {
    if (!err) return "Something went wrong during login.";

    const decoded = decodeURIComponent(err);

    if (decoded.includes("not created with Google")) {
      return "This account uses email & password. Please sign in manually.";
    }

    if (decoded.includes("JWT token not returned")) {
      return "Authentication failed. Please try again or contact support.";
    }

    if (decoded.includes("AccessDenied")) {
      return "Access denied. You may not have permission to sign in this way.";
    }

    return decoded;
  };

  return (
    <div className="min-h-100 flex items-center justify-center px-6 ">
      
      <div className="w-full max-w-md  rounded-2xl p-6 text-center space-y-4  dark:border-gray-800">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
          <MdErrorOutline className="text-red-500" />
          Authentication Error
        </h1>

        {/* Message */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {getMessage(error)}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            <IoArrowBackOutline />
            Go back home
          </Link>

          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
          >
            Try logging in again
          </Link>
        </div>

      </div>
    </div>
  );
}