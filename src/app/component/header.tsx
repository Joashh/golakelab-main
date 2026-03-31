'use client'
import { IoSearch } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Info, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { FaMap, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaUser, FaCog, FaEnvelope, FaWater, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import ProgressLink from "./progresslink";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [compact, setCompact] = useState(false);

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setCompact(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="flex justify-between  border-gray-200 z-50 top-0   items-center  w-full gap-2 px-10 h-20">
            <ProgressLink href="/">
                <div className="h-8 md:h-10 lg:h-12 cursor-pointer ">
                    <img
                        src="/images/logo3.png"
                        alt="Logo"
                        className="h-full w-auto object-contain"
                    />
                </div>
            </ProgressLink>
            <div
                className={` hidden lg:flex items-center justify-center 
              fixed  left-1/2 -translate-x-1/2 z-40 
              bg-white/70 backdrop-blur-md border border-black/15 rounded-xl shadow-sm
              transition-all duration-500 ease-in-out
              ${compact ? "w-70 py-3 px-2 top-2" : "w-95 md:w-120 px-4 xl:w-170 py-2 xl:px-6 top-5"}`}
            >
                {/* ABOUT */}
                <div className="flex-1 flex justify-center items-center gap-2 overflow-hidden">
                    <FaInfoCircle className={`text-[#0F766E] text-lg ${compact ? "block" : "hidden"}`} />
                    <span
                        className={`whitespace-nowrap transition-all text-xs xl:text-sm text-[#0F766E] duration-500 ease-in-out ${compact ? "hidden" : "opacity-100"
                            }`}
                    >
                        What this is About
                    </span>
                </div>

                <div className="mx-2 xl:mx-4 h-5 w-px bg-black/20" />

                {/* LAKES */}
                <ProgressLink
                    href="/lake-categories"
                    className="flex-1 flex justify-center items-center gap-2 overflow-hidden"
                >
                    <FaWater className={`text-[#0F766E] text-lg ${compact ? "block" : "hidden"}`} />
                    <span
                        className={`whitespace-nowrap transition-all text-xs xl:text-sm text-[#0F766E] duration-500 ease-in-out ${compact ? "hidden" : "opacity-100"
                            }`}
                    >
                        Explore Small Lakes
                    </span>
                </ProgressLink>

                <div className="mx-2 xl:mx-4 h-5 w-px bg-black/20" />

                {/* COMMUNITY */}
                <ProgressLink
                    href="/community"
                    className="flex-1 flex justify-center items-center gap-2 overflow-hidden"
                >
                    <RiUserCommunityFill className={`text-[#0F766E] text-lg ${compact ? "block" : "hidden"}`} />
                    <span
                        className={`whitespace-nowrap transition-all text-xs xl:text-sm text-[#0F766E] duration-500 ease-in-out ${compact ? "hidden" : "opacity-100"
                            }`}
                    >
                        Engage in Community
                    </span>
                </ProgressLink>
            </div>
            <div className="flex justify-end items-center gap-2 ">
                <div className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 lg:p-3 bg-[#EBF4F6] ">
                    <IoSearch className="text-[#09637E]" />
                </div>
                <div className="relative" ref={menuRef}>

                    <div
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center justify-center rounded-full p-2 lg:p-3 bg-[#EBF4F6] cursor-pointer"
                    >
                        <GiHamburgerMenu className="text-[#09637E]" />
                    </div>

                    {open && (
                        <div className="absolute text-black/60 right-0 mt-3 w-48 bg-white border border-black/10 p-3 rounded-xl shadow-lg overflow-hidden z-50">

                            {!session ? (null) : (<ProgressLink href="/account" className="flex items-center gap-2 px-4 py-2 text-sm  hover:bg-black/5 transition">
                                <FaUser className="text-current custom-primary" />
                                Hello, {session?.user?.name
                                    ? session.user.name.split(" ")[0].charAt(0).toUpperCase() +
                                    session.user.name.split(" ")[0].slice(1)
                                    : ""}!
                            </ProgressLink>)}


                            <ProgressLink href="/lake-categories" className="flex md:hidden items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition">
                                <FaWater className="text-current custom-primary" />
                                Lake Categories
                            </ProgressLink>
                            <ProgressLink href="/community" className="flex md:hidden items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition">
                                <RiUserCommunityFill className="text-current custom-primary" />
                                Community
                            </ProgressLink>




                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition">
                                <FaCog className="text-current custom-primary" />
                                Settings
                            </a>

                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition">
                                <FaEnvelope className="text-current custom-primary" />
                                Contact Us
                            </a>

                            <a href="#" className="flex md:hidden items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition">
                                <FaInfoCircle className="text-current custom-primary" />
                                About
                            </a>


                            {!session ? (<ProgressLink className="flex cursor-pointer items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#0F766E] hover:bg-black/5 transition" href="/login"> <FaSignInAlt /> Login</ProgressLink>) : (<button onClick={handleLogout} className="flex cursor-pointer items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-black/5 transition">
                                <FaSignOutAlt />
                                Logout
                            </button>)}


                        </div>
                    )}

                </div>



            </div>

        </div>
    );
}