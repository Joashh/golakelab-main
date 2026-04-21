
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Menu } from "lucide-react";
import HeroClient from "./component/HeroClient";
import LakeSearch from "./component/search";
import HomeServer from "./component/homeserver";


export default function Home() {


  return (
    <div
      className="min-h-screen flex flex-col  transition ease-in-out justify-center  w-full bg-[#ebf4f6] dark:bg-transparent">
     <HomeServer/>
    </div>
  );
}
