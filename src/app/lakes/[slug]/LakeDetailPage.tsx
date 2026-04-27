'use client'
import { useState } from 'react';
import { Tabs } from '@/app/component/tab';
import { useParams } from 'react-router';
import { DownloadModal } from '@/app/component/DownloadModal';
import Overlay from "@/app/component/overlay";
import { Partner } from '@/app/types/partner';
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Maximize,
  Fish,
  Download,
  Leaf,
  Users,
  AlertTriangle,
  TrendingUp,
  FileText,
  BarChart3,
} from 'lucide-react';
import { motion } from 'motion/react';
import ProgressLink from '@/app/component/progresslink';

type Tab = {
  id: string;
  title: string;
  icon?: any; // or a proper icon type if you want
};

type LakeDetailPageProps = {
  data: {
    lake: any;
    sections: Record<string, any[]>;
    tabs: string[];
    metadata: {
      barangay?: string;
      distance?: string;
      depth?: string;
      area?: string;
      fish?: string;
    };
    category: any;
    image: string;
    
  };
};

export default function LakeDetailPage({ data }: LakeDetailPageProps) {
  const { lake, sections, tabs, metadata, category, image } = data;
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const stripHtml = (html: string) =>
    html.replace(/<[^>]+>/g, '');

  if (!lake) {
    return (
      <div className="min-h-screen flex flex-col bg-linear-to-br from-sky-50 via-white to-emerald-50">

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Lake not found</h1>
            <ProgressLink href="/" className="text-sky-600 hover:text-sky-700">
              Return to Home
            </ProgressLink>
          </div>
        </main>

      </div>
    );
  }





  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-sky-50 via-white to-emerald-50">


      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img src={image} alt={lake.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <ProgressLink
                href={`/lake-categories/${category?.slug || category?.name || ""}`}
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="size-4" />
                <span>Back to Category</span>
              </ProgressLink>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{lake.name}</h1>
              <p className="text-lg text-white/90 max-w-3xl line-clamp-2">
                {stripHtml(lake.description || '')}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <MapPin className="size-5 text-sky-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Location</h3>
              </div>
              <p className=" text-2xl font-bold text-blue-800">
                {Array.isArray(metadata.barangay)
                  ? metadata.barangay.join(", ")
                  : metadata.barangay || "No data"}
              </p>
              <p className="text-xs text-slate-500 mt-1">{lake.distanceFromCity}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Ruler className="size-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Max Depth</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{Array.isArray(metadata.depth)
                ? metadata.depth.join(", ")
                : metadata.depth || "No data"}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Maximize className="size-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Surface Area</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{Array.isArray(metadata.area)
                ? metadata.area.join(", ")
                : metadata.area || "No data"}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Fish className="size-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Fish Species</h3>
              </div>
              <p className="text-2xl font-bold text-teal-600">
                {Array.isArray(metadata.fish) ? metadata.fish.length : 0}
              </p>
              <p className="text-xs text-slate-500 mt-1">documented species</p>
            </motion.div>
          </div>

          {/* Download Button */}
          <div className="mb-8">
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Download className="size-5" />
              <span>Download Lake Data</span>
            </button>
          </div>

          <div className="bg-white relative  rounded-2xl shadow-sm border border-gray-100  p-6">

            
            {tabs.length === 0 && <h1 className="text-center text-gray-500">No data retrieved</h1>}

            {tabs.length > 0 && <Tabs grouped={sections} tabs={tabs} />}
          </div>

          {/* Data Visualization Placeholder */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Data Visualization</h3>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-12 border-2 border-dashed border-slate-300 text-center">
              <BarChart3 className="size-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">Interactive charts and maps coming soon</p>
              <p className="text-sm text-slate-500">
                Water quality trends, species distribution, and spatial analysis
              </p>
            </div>
          </div>
        </div>
      </main>


      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        journal={lake.name}
      />
    </div>
  );
}