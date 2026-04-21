'use client'
import { BarChart3, TrendingUp, Database, FileSpreadsheet } from 'lucide-react';
import { motion } from 'motion/react';

export default function DataInsightsPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Data & Insights</h1>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto">
              Evidence-based analytics and research findings for small lake management
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
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200 mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-sky-100 to-emerald-100 rounded-xl">
                <BarChart3 className="size-8 text-sky-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Research Data & Analytics</h2>
                <p className="text-lg text-slate-600">
                  Comprehensive datasets and analytical tools for lake conservation
                </p>
              </div>
            </div>

            <p className="text-slate-700 text-lg leading-relaxed mb-8">
              Our Data & Insights platform provides stakeholders with access to comprehensive hydrological, ecological, governance, and socio-economic datasets. These resources support evidence-based decision-making and adaptive management strategies for small lake conservation.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-sky-50 to-white rounded-xl border border-slate-200 hover:border-sky-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Database className="size-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Data Repository</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Access centralized datasets on water quality, biodiversity, hydrology, and governance metrics
                    </p>
                    <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                      Explore Data →
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="size-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Analytics & Trends</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Visualize temporal trends, spatial patterns, and key performance indicators
                    </p>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      View Analytics →
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileSpreadsheet className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Research Reports</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Browse published research findings, technical reports, and policy briefs
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Browse Reports →
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-teal-50 to-white rounded-xl border border-slate-200 hover:border-teal-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <BarChart3 className="size-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Decision Support Tools</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Utilize analytical tools and decision support systems for lake management
                    </p>
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      Access Tools →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-8 border border-blue-200 text-center">
            <h3 className="font-bold text-xl text-slate-900 mb-2">More Features Coming Soon</h3>
            <p className="text-slate-700">
              We're continuously expanding our data analytics capabilities. Check back soon for interactive dashboards, data visualization tools, and advanced analytical features.
            </p>
          </div>
        </motion.div>
      </main>

    </div>
  );
}
