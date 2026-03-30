import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full border-t border-black/10 bg-white px-6 md:px-10 py-10">
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">

                {/* Brand Section */}
                <div className="flex-1">
                    <h1 className="font-bold text-xl mb-3 text-[#0F766E]">
                        Small Lake Governance
                    </h1>
                    <p className="text-black/60 text-sm max-w-sm">
                        An open access platform providing relevant information about small lakes in the Philippines.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-5 text-black/60">
                        <a href="#" className="hover:text-blue-600 transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-sky-500 transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-black transition">
                            <FaGithub />
                        </a>
                        <a href="#" className="hover:text-blue-700 transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex-1 text-[#0F766E] grid grid-cols-2 md:grid-cols-3 gap-8">

                    <div>
                        <h2 className="font-semibold mb-3">Features</h2>
                        <div className="flex flex-col gap-2 text-sm text-black/60">
                            <a href="#" className="hover:text-black transition">Lake Categories</a>
                            <a href="#" className="hover:text-black transition">Community</a>
                            <a href="#" className="hover:text-black transition">About</a>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3">Learn More</h2>
                        <div className="flex flex-col gap-2 text-sm text-black/60">
                            <a href="#" className="hover:text-black transition">Documentation</a>
                            <a href="#" className="hover:text-black transition">Guides</a>
                            <a href="#" className="hover:text-black transition">API</a>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3">Support</h2>
                        <div className="flex flex-col gap-2 text-sm text-black/60">
                            <a href="#" className="hover:text-black transition">Help Center</a>
                            <a href="#" className="hover:text-black transition">Contact</a>
                            <a href="#" className="hover:text-black transition">Privacy Policy</a>
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-sm text-black/50 gap-3">
                <p>© {new Date().getFullYear()} Small Lake Governance. All rights reserved.</p>
                <p>Built with care for environmental awareness 🌱</p>
            </div>

        </footer>
    );
}