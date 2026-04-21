'use client'
import { IoSearch } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { FaAngleDoubleUp, FaSignInAlt } from "react-icons/fa";
import { Info, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { FaNewspaper } from "react-icons/fa6";
import { FaMap, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaUser, FaCog, FaEnvelope, FaWater, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import ProgressLink from "./progresslink";
import { signOut, useSession } from "next-auth/react";
import ThemeChanger from "./themechanger";
import HeaderSearch from "./headersearch";
import Modal from "./loginmodal";
import LoginModalContent from "./loginClient";
import AuthModals from "./authmodals";

export default function three() {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [compact, setCompact] = useState(false);
    const [modalType, setModalType] = useState<"login" | "register" | null>(null);

    const isAdmin = session?.user?.role === "admin";

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
        <div className="flex justify-between  border-gray-200 z-50 border-b dark:border-gray-700 top-0 bg-white dark:bg-[#1A202C] transition ease-in-out  items-center  w-full gap-2 px-10 h-20">
            <ProgressLink href="/">
                <div className="h-8 md:h-10 lg:h-12 cursor-pointer relative">
                    {/* Light mode logo */}
                    <img
                        src="/images/logo3.png"
                        alt="Logo"
                        className="h-full w-auto object-contain block dark:hidden"
                    />
                    {/* Dark mode logo */}
                    <img
                        src="/images/logo-black.png"
                        alt="Logo Dark"
                        className="h-full w-auto object-contain hidden dark:block"
                    />
                </div>
            </ProgressLink>
            <div
                className={` hidden lg:flex items-center justify-center 
              fixed  left-1/2 -translate-x-1/2 z-40 
               backdrop-blur-md border border-black/15 rounded-xl shadow-sm
              transition-all duration-500 ease-in-out
              ${compact ? "w-10 h-10 rounded-full bg-white/70 dark:bg-gray-700/50 dark:border-gray-700/60 shadow-xl" : "w-95 md:w-120 px-4 xl:w-170 py-2 xl:px-6 top-5 bg-white/70 dark:bg-gray-800"}`}
            >

                {compact ? <FaAngleDoubleUp
                    className="cursor-pointer text-gray-700 dark:text-gray-200"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                /> : (<>
                    <ProgressLink href="/about" className="flex-1 flex justify-center cursor-pointer items-center gap-2 overflow-hidden">

                        <span
                            className={`whitespace-nowrap transition-all text-xs xl:text-sm text-[#0F766E] font-medium dark:text-white duration-500 ease-in-out ${compact ? "hidden" : "opacity-100"
                                }`}
                        >
                            What this is About
                        </span>
                    </ProgressLink>

                    <div className="mx-2 xl:mx-4 h-5 w-px bg-black/20 dark:bg-gray-700" />

                    {/* LAKES */}
                    <ProgressLink
                        href="/lake-categories"
                        className="flex-1 flex justify-center items-center gap-2 overflow-hidden"
                    >

                        <span
                            className={`whitespace-nowrap transition-all text-xs xl:text-sm text-[#0F766E] font-medium dark:text-white duration-500 ease-in-out ${compact ? "hidden" : "opacity-100"
                                }`}
                        >
                            Explore Small Lakes
                        </span>
                    </ProgressLink>

                    <div className="mx-2 xl:mx-4 h-5 w-px bg-black/20 dark:bg-gray-700" />

                    {/* COMMUNITY */}
                    <ProgressLink
                        href="/community"
                        className="flex-1 flex justify-center items-center gap-2 overflow-hidden"
                    >

                        <span
                            className={`whitespace-nowrap transition-all text-xs xl:text-sm text-[#0F766E] font-medium dark:text-white duration-500 ease-in-out ${compact ? "hidden" : "opacity-100"
                                }`}
                        >
                            Engage in Community
                        </span>
                    </ProgressLink></>)}


            </div>
            <div className="flex justify-end items-center gap-2 ">
                <HeaderSearch />

                <div className="relative" ref={menuRef}>

                    <div
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center justify-center rounded-full p-2 lg:p-3 bg-[#EBF4F6] dark:bg-gray-800 dark:shadow-md dark:border dark:border-gray-800 cursor-pointer"
                    >
                        <GiHamburgerMenu className="text-[#09637E] dark:text-white" />
                    </div>

                    <div
                        className={`absolute text-black/60 right-0 mt-3 w-58 bg-white dark:bg-gray-800/70 backdrop-blur-md dark:border-gray-800 dark:text-white border border-black/10 p-2 rounded-xl shadow-lg overflow-hidden z-50
    transition-all duration-300 ease-in-out
    ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
  `}
                    >
                        <div className="pb-3">
                            <ThemeChanger />
                        </div>


                        {!session ? null : (
                            <ProgressLink
                                href="/account"
                                className="flex  items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                            >
                                <FaUser className="text-[#09637e] dark:text-white" />
                                Hello,{" "}
                                {session?.user?.name
                                    ? session.user.name.split(" ")[0].charAt(0).toUpperCase() +
                                    session.user.name.split(" ")[0].slice(1)
                                    : ""}
                                !
                            </ProgressLink>
                        )}

                        <ProgressLink
                            href="/news"
                            className="flex  items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                        >
                            <FaNewspaper className="text-[#09637e] dark:text-white" />
                            News and Updates
                        </ProgressLink>



                        {isAdmin && (
                            <ProgressLink
                                href="https://golakelab.dev.uplb.edu.ph/wp-admin"
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                            >
                                <FaWater className="text-[#09637e] dark:text-white" />
                                <span className="truncate block max-w-37.5">
                                    Wordpress Admin
                                </span>
                            </ProgressLink>
                        )}

                        <ProgressLink
                            href="/lake-categories"
                            className="flex lg:hidden items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                        >
                            <FaWater className="text-[#09637e] dark:text-white" />
                            Lake Categories
                        </ProgressLink>
                        <ProgressLink
                            href="/community"
                            className="flex lg:hidden items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                        >
                            <RiUserCommunityFill className="text-[#09637e] dark:text-white" />
                            Community
                        </ProgressLink>

                        <a
                            href="#"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                        >
                            <FaCog className="text-[#09637e] dark:text-white" />
                            Settings
                        </a>

                        <ProgressLink
                            href="/contact-us"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                        >
                            <FaEnvelope className="text-[#09637e] dark:text-white" />
                            Contact Us
                        </ProgressLink>

                        <a
                            href="#"
                            className="flex lg:hidden items-center gap-2 px-4 py-2 text-sm hover:bg-black/5 transition"
                        >
                            <FaInfoCircle className="text-[#09637e] dark:text-white" />
                            About
                        </a>

                        {!session ? (
                            <button
                                onClick={() => setModalType("login")}
                                className="flex cursor-pointer items-center gap-2 w-full text-left px-4 py-2 text-sm text-green-700 dark:text-[#19b5e4] hover:bg-black/5 transition"
                            >
                                <FaSignInAlt />
                                Login
                            </button>

                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex cursor-pointer items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-black/5 transition"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        )}
                    </div>

                </div>

                <AuthModals modalType={modalType} setModalType={setModalType} />


            </div>

        </div>
    );
}