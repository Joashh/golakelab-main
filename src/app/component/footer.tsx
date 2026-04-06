import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer
            className="w-full px-6 md:px-10 py-10 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A202C]"
            
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">

                {/* Brand */}
                <div className="flex-1">
                    <h1
                        className="font-bold text-xl mb-3 text-[#09637e] dark:text-white"
                        
                    >
                        GoLake Lab
                    </h1>

                    <p className="text-sm opacity-70 max-w-sm">
                        An open access platform providing relevant information
                        about small lakes in the Philippines.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-5 opacity-70">
                        <a href="#" className="hover:opacity-100 transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:opacity-100 transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:opacity-100 transition">
                            <FaGithub />
                        </a>
                        <a href="#" className="hover:opacity-100 transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div
                    className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 "
                    
                >

                    <div>
                        <h2 className="font-semibold mb-3  text-[#09637e] dark:text-white">Features</h2>
                        <div className="flex flex-col gap-2 text-sm opacity-70 dark:text-white/70">
                            <a href="/lake-categories" className="hover:opacity-100 transition">Lake Categories</a>
                            <a href="/community" className="hover:opacity-100 transition">Community</a>
                            <a href="/about" className="hover:opacity-100 transition">About</a>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3  text-[#09637e] dark:text-white">Learn More</h2>
                        <div className="flex flex-col gap-2 text-sm opacity-70 dark:text-white/70">
                            <a href="#" className="hover:opacity-100 transition">Documentation</a>
                            <a href="#" className="hover:opacity-100 transition">Guides</a>
                            <a href="#" className="hover:opacity-100 transition">API</a>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3  text-[#09637e] dark:text-white">Support</h2>
                        <div className="flex flex-col gap-2 text-sm opacity-70 dark:text-white/70">
                            <a href="#" className="hover:opacity-100 transition">Help Center</a>
                            <a href="#" className="hover:opacity-100 transition">Contact</a>
                            <a href="#" className="hover:opacity-100 transition">Privacy Policy</a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom */}
            <div
                className="max-w-7xl mx-auto mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-sm gap-3 opacity-70"
                style={{ borderColor: "rgba(0,0,0,0.1)" }}
            >
                <p>© {new Date().getFullYear()} Small Lake Governance. All rights reserved.</p>
                <p>Built with care for environmental awareness 🌱</p>
            </div>
        </footer>
    );
}