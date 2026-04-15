'use client'
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FiUsers, FiDatabase, FiBarChart2, FiMonitor } from 'react-icons/fi';
import { FiLayout, FiUpload, FiPieChart, FiChevronDown } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "next/navigation";

import { IoArrowBackOutline } from "react-icons/io5";

interface LoginModalProps {
    onClose: () => void;
    openRegister?: () => void; // make optional
}

export default function LoginModalContent({ onClose, openRegister }: LoginModalProps) {
    const images = ["/images/7.jpg", "/images/8.png", "/images/9.png"];
    const [current, setCurrent] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const params = useSearchParams();
    const error = params.get("error");


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
            onClose();
            router.refresh();
        } else {
            if (res?.error === "CredentialsSignin") {
                alert("Invalid credentials or this account uses Google login.");
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    };

    const getErrorMessage = (error: string | null) => {
        if (!error) return null;

        if (error.includes("not created with Google")) {
            return "This account uses email & password. Please sign in manually.";
        }

        if (error.includes("Invalid")) {
            return "Invalid credentials.";
        }

        return "Something went wrong. Please try again.";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
            <div className="absolute top-5 left-5 z-40 text-white/70 cursor-pointer" onClick={onClose}><IoArrowBackOutline className="h-7 w-7" /> </div>
            {/* LEFT - Carousel (optional) */}
            <div className="hidden md:block relative shadow-md">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 pb-10 z-10 space-y-6">

                    <div className="flex flex-col gap-2 text-white ">
                        <h1 className="font-extrabold text-4xl">
                            About Us
                        </h1>
                        <h1 className="text-xs text-justify">
                            The Governance Leadership, Advocacy for Knowledge Enhancement Laboratory (Go LAKE Lab)is transforming small lake management by creating a dedicated platform within UPLB.
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {/* Quick Create */}
                        <div className="bg-black/50 text-white rounded-xl p-4 flex items-center gap-3  ">
                            <FiLayout className="text-blue-400 text-2xl w-1/3" />
                            <div>
                                <h3 className="text-sm font-semibold">Centralized Repository</h3>
                                <p className="text-xs opacity-80">Consolidate hydrological, ecological, governance, and socio-economic datasets for easy access and analysis.</p>
                            </div>
                        </div>

                        {/* Collaboration */}
                        <div className="bg-black/50 rounded-xl text-white  p-4 flex items-center gap-3  ">
                            <FiUsers className="text-purple-400 text-2xl w-1/3" />
                            <div>
                                <h3 className="text-sm font-semibold">Capacity Building</h3>
                                <p className="text-xs opacity-80">Train planners, policymakers, LGUs, and researchers to conduct lake studies and utilize decision support systems (DSS).</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT - Login Form */}
            <div className="p-6 sm:p-10 sm:py-8 flex items-center justify-center ">

                <div className="w-full max-w-sm">



                    <div className="text-gray-700 text-center py-6 dark:text-gray-400">
                        {error && (
                            <p className="text-red-500 text-xs text-center mb-2">
                                {getErrorMessage(decodeURIComponent(error))}
                            </p>
                        )}
                        <h2 className="text-2xl pb-3 font-bold text-gray-800 dark:text-white  text-center">
                            Sign In
                        </h2>
                        <p className="text-xs opacity-90">Explore more data, unlock contents, and join to our growing community</p>

                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="flex flex-col relative mb-4">
                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Username</label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    className="pl-10 pr-3 py-3 w-full text-xs rounded-md border border-gray-200 shadow-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col relative mb-4">
                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="pl-10 pr-10 py-3 w-full text-xs rounded-md border border-gray-200 shadow-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                                >
                                    {showPassword ? <LuEye /> : <LuEyeClosed />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full dark:bg-teal-900 bg-teal-600 cursor-pointer text-xs text-white py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                        <button onClick={() => signIn("google", { callbackUrl: "/" })}
                            type="button"

                            className="w-full cursor-pointer flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-xs py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition shadow-sm"
                        >
                            <img
                                src="/google.png"
                                alt="Google"
                                className="w-4 h-4"
                            />
                            Login with Google (Beta)
                        </button>
                    </form>
                    <p className="text-xs text-center text-gray-500 mt-6">
                        Don't have an account?{" "}

                        <button onClick={openRegister}
                            className="text-teal-600 hover:underline">
                            Sign up
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
}

