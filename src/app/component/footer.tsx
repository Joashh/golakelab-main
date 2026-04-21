import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Eye } from 'lucide-react';
import SmileySurvey from "./smileysurvey";
export default function Footer() {

    return (
        <>
         
            <footer
                className="w-full px-6 md:px-10 py-10 border-t border-gray-200 dark:border-gray-700  bg-linear-to-br from-slate-900 to-slate-800 text-white mt-auto dark:bg-[#1A202C]"

            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* About Section */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">GoLAKE Lab</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                An open access platform providing relevant information about small lakes in the Philippines.
                            </p>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Features</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                                        Lake Categories
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                                        About
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Learn More */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Learn More</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                                        Guides
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Contact</h3>
                            <div className="space-y-2 text-sm text-slate-300">
                                <p className="font-semibold text-white">
                                    College of Public Affairs and Development
                                </p>
                                <p className="leading-relaxed">
                                    University of the Philippines Los Baños<br />
                                    Batong Malake, Los Baños<br />
                                    4031 Laguna, Philippines
                                </p>
                                <p className="pt-2">
                                    <a href="tel:+63495360319" className="hover:text-sky-400 transition-colors block">
                                        (+63 49) 536-0319 / 536-4267
                                    </a>
                                </p>
                                <p>
                                    <a href="mailto:cpaf.uplb@up.edu.ph" className="hover:text-sky-400 transition-colors block">
                                        cpaf.uplb@up.edu.ph
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href="https://cpaf.uplb.edu.ph/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-sky-400 transition-colors block"
                                    >
                                        cpaf.uplb.edu.ph
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-slate-400">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Left Side - Visitor Counter */}
                            <div className="flex items-center gap-2">
                                <Eye className="size-4" />
                                <span>Visitors: 0</span>
                            </div>

                            {/* Right Side - Copyright and Message */}
                            <div className="text-center md:text-right">
                                <p>© 2026 Small Lake Governance. All rights reserved.</p>
                                <p className="mt-1">
                                    Built with care for environmental awareness 🌱
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            
        </>
    );
}