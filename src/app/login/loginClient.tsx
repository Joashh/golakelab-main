'use client'
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export default function LoginClient() {
    const images = ["/images/7.jpg", "/images/8.png", "/images/9.png"]; // add your images here
    const [current, setCurrent] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Auto change image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.ok) {
            window.location.href = "/";
        } else {
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center bg-white dark:bg-gray-900 py-20" >

            {/* CENTER CARD */}
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT - CAROUSEL */}
                <div className="hidden md:block relative">

                    {/* Images */}
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                                }`}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-end p-6 pb-10 z-10">
                        <div className="text-white">
                            <h2 className="text-xl font-bold">Welcome Back</h2>
                            <p className="text-sm opacity-90">
                                Explore and manage your system
                            </p>
                        </div>
                    </div>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2.5 h-2.5 rounded-full ${i === current ? "bg-white" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                </div>

                {/* RIGHT - LOGIN */}
                <div className="flex items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-sm">

                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                            Sign In
                        </h2>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Enter your credentials
                        </p>

                        <form onSubmit={handleLogin} className="space-y-4">

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Username
                                </label>
                                <input value={username} className="p-2 border-gray-200 bg-white dark:bg-gray-900 shadow border rounded-md w-full px-3"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        value={password}
                                        className="p-2 border-gray-200 shadow border rounded-md w-full px-3 pr-10"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                                    >
                                        {showPassword ? <LuEye /> : <LuEyeClosed />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-600">
                                    <input type="checkbox" className="accent-teal-600" />
                                    Remember me
                                </label>

                                <a href="#" className="text-teal-600 hover:underline">
                                    Forgot?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-medium overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {/* Loading bar */}
                                {loading && (
                                    <span className="absolute left-0 top-0 h-full bg-teal-400 animate-[loading_1s_linear_infinite]" />
                                )}

                                {/* Button text */}
                                <span className="relative z-10">
                                    {loading ? "Signing in..." : "Sign In"}
                                </span>
                            </button>
                        </form>

                        <p className="text-sm text-center text-gray-500 mt-6">
                            Don’t have an account?{" "}
                            <a href="#" className="text-teal-600 hover:underline">
                                Sign up
                            </a>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}