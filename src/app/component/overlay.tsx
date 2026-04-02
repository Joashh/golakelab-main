"use client";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Modal from "./loginmodal";
import LoginModalContent from "./loginClient";

export default function Overlay() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  if (session) return null;

  return (
    <div className="z-50 absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/90 dark:to-transparent flex items-end justify-center pb-8  rounded-b-2xl">
      <div className="flex flex-col items-center  text-center">
        <p className="text-gray-800  dark:text-gray-200 font-medium text-sm">
          Login to view full content
        </p>
        <button
          onClick={() => setIsOpen(true)} // open your modal
          className=" border-b-2 cursor-pointer border-teal-500 text-sm text-teal-600 dark:text-teal-400 font-semibold hover:border-teal-700 hover:text-teal-700 dark:hover:text-teal-200 transition"
        >
          Login or Join us
        </button>
      </div>

      {/* Modal Component */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <LoginModalContent onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}