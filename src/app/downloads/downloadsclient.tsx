"use client";

import { useState } from "react";
import JournalCard from "../component/journalcard";
import {
  Download,
  FileText,
  Database,
  Map,
  FileSpreadsheet,
  MoreHorizontal
} from "lucide-react";
import { motion } from 'motion/react';

export default function DownloadsClient({ journals }: any) {

  function getCategoryIcon(title: string) {
    const t = title.toLowerCase();

    if (t.includes("research")) return FileText;
    if (t.includes("map")) return Map;
    if (t.includes("dataset")) return Database;
    if (t.includes("guideline")) return FileSpreadsheet;

    return MoreHorizontal; // default
  }
  const [selectedFile, setSelectedFile] = useState<any>(null);


  const grouped = journals.reduce((acc: any, journal: any) => {
    const catName =
      journal._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized";

    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(journal);

    return acc;
  }, {});

  //const categories = Object.entries(grouped);

  const categoryOrder: Record<string, number> = {
    research: 1,
    map: 2,
    dataset: 3,
    guideline: 4,
  };

  const getOrder = (title: string) => {
    const t = title.toLowerCase();

    if (t.includes("research")) return categoryOrder.research;
    if (t.includes("map")) return categoryOrder.map;
    if (t.includes("dataset")) return categoryOrder.dataset;
    if (t.includes("guideline")) return categoryOrder.guideline;

    return 999;
  };

  const sortedCategories = Object.entries(grouped).sort(
    ([aTitle], [bTitle]) => getOrder(aTitle) - getOrder(bTitle)
  );


  return (
    <>
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

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <p className="text-slate-700 text-center">
            All downloads require user information for access tracking and research purposes. Your data will be kept confidential and used only for internal analytics.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {sortedCategories.map(([title, items]: any, index) => {
            const Icon = getCategoryIcon(title);

            return (
              <div
                key={title}
                className="bg-linear-to-br from-sky-50 to-white rounded-2xl p-6 border border-sky-200 shadow-lg"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className="size-6 text-sky-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    <span dangerouslySetInnerHTML={{ __html: title }} />
                  </h2>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map((journal: any) => (
                    <JournalCard
                      key={journal.id}
                      journal={journal}
                      onClick={() => setSelectedFile(journal)}
                    />
                  ))}
                </div>
              </div>
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
      </main>
    </>
  );
}