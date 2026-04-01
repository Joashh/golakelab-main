
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Menu } from "lucide-react";
import HeroClient from "./component/HeroClient";

export default function Home() {


  return (
    <div
      className="min-h-screen flex flex-col transition ease-in-out justify-center pb-40 w-full bg-[#ebf4f6] dark:bg-transparent">


      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 w-full">


        <div className="mb-4 px-4 py-1 rounded-full text-xs font-medium border text-[#09637e] dark:text-white ">
          Knowledge Portal for Lake Research
        </div>


        <HeroClient text="Governance Leadership, Advocacy for Knowledge Enhancement Laboratory for Small Lakes" />




        <p className="max-w-3xl mb-10 text-sm md:text-base leading-relaxed dark:text-white/50">
          Welcome to the knowledge sharing portal website — a centralized hub dedicated to advancing research, policy, and collaboration for sustainable lake management.
        </p>


        <div
          className="w-full max-w-lg flex rounded-2xl overflow-hidden shadow-sm border backdrop-blur-sm"
          style={{  backgroundColor: 'var(--background)' }}
        >
          <input
            type="text"
            placeholder="Search lakes, locations, or topics..."
            className="w-full px-5 py-3 outline-none text-sm text-[#09637e] dark:text-white"
          />
          <button
            className="px-6  font-medium hover:opacity-90 transition bg-[#09637e] dark:bg-white dark:text-[#09637e] text-white cursor-pointer "
          >
            Search
          </button>
        </div>

      </section>


    </div>
  );
}
