'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaUser, FaLock } from "react-icons/fa";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface RegisterModalProps {
  onClose: () => void;
  openRegister?: () => void; // optional
}

export default function RegisterModalContent({ onClose }: RegisterModalProps) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, name }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Registration successful! Logging in...");
      await signIn("credentials", { username, password, redirect: true });
    } else {
      alert("Registration failed: " + data.error);
    }
  };

  return (
    <div className="p-6 sm:p-10 w-full max-w-md mx-auto">

      {/* Header */}
      <div className="mb-6 text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Join the community to submit lakes, share discoveries, and access exclusive features.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Full Name
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-teal-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Email Address
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-teal-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@mail.com"
              className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Username
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-teal-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Password
          </label>

          <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-teal-500">
            <FaLock className="text-gray-400 mr-2" />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showPassword ? <LuEye /> : <LuEyeClosed />}
            </button>
          </div>

          <p className="text-[11px] text-gray-400">
            Use at least 6 characters for a stronger password.
          </p>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

      </form>

      {/* Footer */}
      <p className="text-xs text-center mt-6 text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <button
          onClick={onClose} // switches back to login
          className="text-teal-600 hover:underline font-medium"
        >
          Sign In
        </button>
      </p>

    </div>
  );
}