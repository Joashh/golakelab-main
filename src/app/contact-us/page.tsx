'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ContactUs() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [roles, setRoles] = useState<string[]>([]);
  const [fetchingRoles, setFetchingRoles] = useState(false);

  const isAdmin = roles.includes("administrator");

  useEffect(() => {
    const fetchRoles = async () => {
      if (!session?.accessToken) return;

      setFetchingRoles(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/users/me`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRoles(data.roles || []);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      } finally {
        setFetchingRoles(false);
      }
    };

    fetchRoles();
  }, [session]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Current User Info</h1>

      {loading && <p>Loading session...</p>}
      {!loading && !session && <p>User is not logged in.</p>}

      {!loading && session && (
        <div>
          <p><strong>Name:</strong> {session.user?.name}</p>
          <p><strong>Email:</strong> {session.user?.email}</p>
          <p><strong>Roles:</strong> {roles.join(", ") || "N/A"}</p>
          <p><strong>Access Token:</strong> {session.accessToken}</p>

          {fetchingRoles && <p>Fetching roles...</p>}

          {isAdmin && !fetchingRoles && (
            <a
              href="https://golakelab.dev.uplb.edu.ph/wp-admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
            >
              WordPress Admin
            </a>
          )}
        </div>
      )}
    </div>
  );
}