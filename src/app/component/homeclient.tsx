'use client';

import { useEffect, useState } from "react";
import LoginModalContent from "./loginClient";

export default function HomeClient({ error }: { error?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <>
      {/* SHOW ERROR */}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {decodeURIComponent(error)}
        </p>
      )}

      {/* SHOW MODAL */}
      {open && (
        <LoginModalContent onClose={() => setOpen(false)} />
      )}
    </>
  );
}