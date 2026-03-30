
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Menu } from "lucide-react";
import HeroClient from "./component/HeroClient";

export default function Home() {


  return (
    <div className="min-h-screen flex flex-col justify-center pb-40 w-full" style={{ backgroundColor: '#ebf4f6', color: '#09637e' }}>

   
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 w-full">


        <div className="mb-4 px-4 py-1 rounded-full text-xs font-medium border"
          style={{ borderColor: '#7ab2b2', color: '#09637e' }}>
          Knowledge Portal for Lake Research
        </div>


        <HeroClient text="Governance Leadership, Advocacy for Knowledge Enhancement Laboratory for Small Lakes"/>
          
       


        <p className="max-w-3xl mb-10 text-sm md:text-base leading-relaxed"
          style={{ color: '#09637e' }}>
          Welcome to the knowledge sharing portal website — a centralized hub dedicated to advancing research, policy, and collaboration for sustainable lake management.
        </p>


        <div
          className="w-full max-w-lg flex rounded-2xl overflow-hidden shadow-sm border backdrop-blur-sm"
          style={{ borderColor: '#7ab2b2', backgroundColor: '#ffffff' }}
        >
          <input
            type="text"
            placeholder="Search lakes, locations, or topics..."
            className="w-full px-5 py-3 outline-none text-sm"
          />
          <button
            className="px-6 text-white font-medium hover:opacity-90 transition"
            style={{ backgroundColor: '#0F766E' }}
          >
            Search
          </button>
        </div>

      </section>


    </div>
  );
}
