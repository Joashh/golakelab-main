'use client';
import { useState, useEffect } from 'react';
import { FiFileText, FiUnlock, FiShare2, FiDownload } from 'react-icons/fi';
import RightModal from './rightmodal';
import ShareButton from './sharebutton';

export default function AccessButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null; // or a placeholder


  return (
    <div className="flex gap-2 flex-wrap">

      {/* Buttons */}
      <button className="flex items-center cursor-pointer gap-1 px-3 py-2 text-sm font-medium bg-[#09637e] hover:bg-[#0f766e] text-white rounded-md transition">
        <FiFileText className="w-4 h-4" />
        Related Articles
      </button>

      
      <ShareButton link={url} />

      {/* Modal */}
      <RightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Full Access"
      >
        <form className="flex flex-col justify-between h-full gap-4">
          <div className='flex flex-col gap-4'>
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="px-3 py-2 text-sm  rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#09637e]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="px-3 py-2 text-sm  rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#09637e]"
              />
            </div>

            {/* Affiliation */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Affiliation / Organization *
              </label>
              <input
                type="text"
                placeholder="e.g., University of the Philippines, DENR, NGO name"
                className="px-3 py-2 text-sm  rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#09637e]"
              />
            </div>

            {/* Purpose */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Purpose of Data Use *
              </label>
              <textarea
                placeholder="Please describe how you plan to use this research data (e.g., academic research, policy development, education, conservation planning)"
                rows={4}
                className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#09637e] resize-none"
              />
            </div>

            {/* Terms of Use */}
            <div className="bg-yellow-100 dark:bg-yellow-200 p-3 rounded-lg text-xs text-gray-800 dark:text-gray-900">
              <h1 className='font-bold text-base pb-3'>Term of Use</h1>
              <p>
                By downloading this resource, you agree to use it responsibly for research, education, or conservation purposes. Please cite the authors appropriately in any publications.
              </p>
            </div>
          </div>


          {/* Buttons */}
          <div className="flex text-sm justify-end self-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex  items-center gap-2 px-4 py-2 bg-[#09637e] hover:bg-[#0f766e] text-white rounded-lg transition"
            >
              <FiDownload className="w-5 h-5" />
              Submit & Download
            </button>
          </div>
        </form>
      </RightModal>
    </div>
  );
}