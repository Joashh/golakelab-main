'use client'

import { Download, FileText, Database, Image, FileSpreadsheet } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { DownloadModal } from '../component/DownloadModal';

export default function DownloadsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  const handleDownloadClick = (fileName: string) => {
    setSelectedFile(fileName);
    setIsModalOpen(true);
  };

  const downloadCategories = [
    {
      title: 'Research Publications',
      icon: FileText,
      color: 'sky',
      items: [
        { name: 'GoLake Lab Annual Report 2025', type: 'PDF', size: '2.4 MB' },
        { name: 'Small Lakes Governance Framework', type: 'PDF', size: '1.8 MB' },
        { name: 'Biodiversity Assessment Report', type: 'PDF', size: '3.2 MB' },
      ],
    },
    {
      title: 'Datasets',
      icon: Database,
      color: 'emerald',
      items: [
        { name: 'Water Quality Data (2020-2025)', type: 'CSV', size: '850 KB' },
        { name: 'Biodiversity Survey Data', type: 'XLSX', size: '1.2 MB' },
        { name: 'Hydrological Measurements', type: 'CSV', size: '640 KB' },
      ],
    },
    {
      title: 'Maps & GIS Data',
      icon: Image,
      color: 'blue',
      items: [
        { name: 'Lake Boundary Shapefiles', type: 'SHP', size: '3.5 MB' },
        { name: 'Bathymetric Maps Collection', type: 'PDF', size: '5.8 MB' },
        { name: 'Land Use Classification Maps', type: 'GeoTIFF', size: '12.4 MB' },
      ],
    },
    {
      title: 'Guidelines & Toolkits',
      icon: FileSpreadsheet,
      color: 'teal',
      items: [
        { name: 'Lake Monitoring Guidelines', type: 'PDF', size: '1.5 MB' },
        { name: 'Community Engagement Toolkit', type: 'PDF', size: '2.1 MB' },
        { name: 'Policy Development Templates', type: 'DOCX', size: '890 KB' },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; text: string }> = {
      sky: { bg: 'from-sky-50 to-white', border: 'border-sky-200', icon: 'text-sky-600', text: 'text-sky-600' },
      emerald: { bg: 'from-emerald-50 to-white', border: 'border-emerald-200', icon: 'text-emerald-600', text: 'text-emerald-600' },
      blue: { bg: 'from-blue-50 to-white', border: 'border-blue-200', icon: 'text-blue-600', text: 'text-blue-600' },
      teal: { bg: 'from-teal-50 to-white', border: 'border-teal-200', icon: 'text-teal-600', text: 'text-teal-600' },
    };
    return colors[color] || colors.sky;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Download className="size-4" />
              <span className="text-sm">Access Research Resources</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Downloads</h1>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto">
              Access research publications, datasets, maps, and toolkits for lake conservation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Information Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-slate-700 text-center">
              All downloads require user information for access tracking and research purposes. Your data will be kept confidential and used only for internal analytics.
            </p>
          </div>

          {/* Download Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {downloadCategories.map((category, index) => {
              const colors = getColorClasses(category.color);
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border ${colors.border} shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 bg-white rounded-lg shadow-sm`}>
                      <Icon className={`size-6 ${colors.icon}`} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{category.title}</h2>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">
                                {item.type}
                              </span>
                              <span>{item.size}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadClick(item.name)}
                            className={`flex-shrink-0 p-2 ${colors.text} hover:bg-white rounded-lg transition-colors`}
                            title="Download"
                          >
                            <Download className="size-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Terms of Use</h2>
            <div className="prose max-w-none text-slate-700 space-y-3">
              <p>
                By downloading materials from GoLake Lab, you agree to the following terms:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All materials are provided for educational, research, and conservation purposes only.</li>
                <li>Proper attribution must be given when using or citing GoLake Lab resources.</li>
                <li>Commercial use of datasets and publications requires prior written permission.</li>
                <li>Downloaded materials should not be redistributed without authorization.</li>
                <li>Users are encouraged to share their research findings and contributions back to the community.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                For questions about data usage, collaboration opportunities, or to request specific datasets, please contact us through the About page.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

     

      {/* Download Modal */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lakeName={selectedFile}
      />
    </div>
  );
}
