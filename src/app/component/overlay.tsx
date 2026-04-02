"use client";
import { useSession, signIn } from "next-auth/react";

export default function Overlay() {
  const { data: session } = useSession();

  if (session) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/90 dark:to-transparent  flex items-end justify-center pb-8 z-10 rounded-b-2xl">

      <div className="flex flex-col items-center gap-2  text-center">
        <p className="text-white font-medium ">
          Login to view full content
        </p>
          <button
            onClick={() => signIn()}
            className=" border-b cursor-pointer text-sm transition text-[#09637e] dark:text-[#14addb]"
          >
            Login or Join us!
          </button>

       
      </div>

    </div>
  );
}