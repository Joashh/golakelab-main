'use client'
import { BookOpen, ArrowRight, Users, Sparkles, MessageSquare, ArrowUp, ArrowDown, Share2, Bookmark, Plus, TrendingUp, Clock, Award } from 'lucide-react';
import { SegmentedNav } from './SegmentedNav';
import { motion } from 'motion/react';
import NewsSection from './NewsSection';


export default function HomeHeroSection() {

    return (
    <> 
    
    <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-emerald-600 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
            <img
                src="images/Balinsasayao_Twin_Lakes.JPG"
                alt="Lake aerial view"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-600/50 via-blue-600/40 to-emerald-600/50" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                    <Sparkles className="size-4" />
                    <span className="text-sm">Knowledge Hub for Small Lake Conservation</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                    GoLake Lab
                </h1>
                <p className="text-xl sm:text-2xl mb-3 text-sky-100 max-w-3xl mx-auto">
                    Governance Leadership, Advocacy for Knowledge Enhancement
                </p>
                <p className="text-lg mb-8 text-sky-100 max-w-2xl mx-auto">
                    Laboratory for Small Lakes
                </p>
                <p className="text-lg text-sky-50 max-w-3xl mx-auto leading-relaxed">
                    A centralized knowledge-sharing portal dedicated to advancing research,
                    governance, and sustainability of small lakes in the Philippines.
                </p>
            </motion.div>
        </div>
    </section>
    </>
    );
}