'use client'
import { IoSearch } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaUser, FaCog, FaEnvelope, FaWater, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import ProgressLink from "./progresslink";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

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
        <div className="grid sticky z-50 top-0 bg-white shadow-md items-center grid-cols-2 md:grid-cols-3 w-full gap-2 px-10 h-20">
            <ProgressLink href="/">
                <div className="h-8 md:h-9 lg:h-10 cursor-pointer">
                    <img
                        src="/images/logo2.jpg"
                        alt="Logo"
                        className="h-full w-auto object-contain"
                    />
                </div>
            </ProgressLink>
            <div className="hidden text-xs bg-white lg:text-sm md:flex items-center justify-center py-2 px-6 border border-black/15 custom-primary rounded-xl shadow-md">

                <div className="w-37 text-center truncate">
                    <a href="" className="whitespace-nowrap ">
                       What this is About
                    </a>
                </div>

                <div className="mx-4 h-5 w-px bg-black/20" />

                <div className="w-37 text-center truncate">
                    <ProgressLink href="/lake-categories" className="whitespace-nowrap">
                        Explore our Small Lakes
                    </ProgressLink>
                </div>

                <div className="mx-4 h-5 w-px bg-black/20 truncate" />

                <div className="w-37 text-center">
                    <ProgressLink href="/community" className="whitespace-nowrap ">
                        Engage in our Community
                    </ProgressLink>
                </div>

            </div>

            <div className="flex justify-end items-center gap-2 ">
                <div className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 lg:p-3 bg-current custom-primary">
                    <IoSearch className="text-white" />
                </div>
                <div className="relative" ref={menuRef}>

                    <div
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center justify-center rounded-full p-2 lg:p-3 bg-current custom-primary cursor-pointer"
                    >
                        <GiHamburgerMenu className="text-white" />
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