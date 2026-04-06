'use client';
import { FiUsers, FiDatabase, FiBarChart2, FiMonitor } from 'react-icons/fi';
import { FaWater } from 'react-icons/fa';

export default function About() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          About the GoLAKE Lab
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 md:max-w-4xl mx-auto leading-relaxed">
          The <span className="font-semibold text-blue-600 dark:text-blue-400">
            Governance Leadership, Advocacy for Knowledge Enhancement Laboratory (Go LAKE Lab)
          </span> 
          is transforming small lake management by creating a dedicated platform within UPLB. 
          We empower stakeholders with the skills, tools, and data to support evidence-based governance 
          and sustainable lake management.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Capacity Building */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-md dark:shadow-gray-700 hover:shadow-xl transition">
            <FiUsers className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Capacity Building</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Train planners, policymakers, LGUs, and researchers to conduct lake studies and utilize decision support systems (DSS).
            </p>
          </div>

          {/* Digital Repository */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-md dark:shadow-gray-700 hover:shadow-xl transition">
            <FiDatabase className="text-green-600 dark:text-green-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Centralized Repository</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Consolidate hydrological, ecological, governance, and socio-economic datasets for easy access and analysis.
            </p>
          </div>

          {/* Evidence-based Policy */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-md dark:shadow-gray-700 hover:shadow-xl transition">
            <FiBarChart2 className="text-yellow-500 dark:text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Evidence-Based Policy</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Collaborate with experts and laboratories to support adaptive management and informed decision-making.
            </p>
          </div>

          {/* Monitoring */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-md dark:shadow-gray-700 hover:shadow-xl transition">
            <FiMonitor className="text-purple-600 dark:text-purple-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Monitoring & Collaboration</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Work with DOST-PCAARRD-supported labs and small lake governance specialists to enhance governance effectiveness.
            </p>
          </div>
        </div>

        {/* Optional Footer Icon */}
        
      </div>
    </section>
  );
}