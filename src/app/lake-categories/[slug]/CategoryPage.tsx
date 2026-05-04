'use client'
import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import { LakeCard } from '@/app/component/LakeCard';
import { FilterBar } from '@/app/component/FilterBar';
import { SearchBar } from '@/app/component/SearchBar';
import { LakesMap } from '@/app/component/LakesMap';
import { ArrowLeft, MapPin, Waves, Database, BarChart3, Info, Droplets, ChevronRight, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/component/tabs';
import { Partner } from '@/app/types/partner';
import ProgressLink from '@/app/component/progresslink';
import SmileySurvey from '@/app/component/smileysurvey';
import LakeBarChart from '@/app/component/BarGraph';

interface LakeDetailPageProps {
  category: any;
  lakes: any[];
  partners: Partner[];
  bardata: any;
}

type Lake = {
  id: number;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  barangays: string[];
  fishSpecies: string[];
  number_species: number;
  maxDepth: number;
  latitude: number;
  longitude: number;
  area: number;
};


export function CategoryPage({ category, lakes, partners, bardata
}: LakeDetailPageProps) {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [depthFilter, setDepthFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');


  const lakeMapPoints = lakes
    .filter((lake) => lake.latitude && lake.longitude)
    .map((lake) => ({
      id: lake.id.toString(),
      slug: lake.slug,
      name: lake.name,
      x: lake.longitude, // 👈 still lng
      y: lake.latitude,  // 👈 still lat
      depth: lake.maxDepth,
      area: lake.area,
    }));


  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredLakes = useMemo(() => {
    let filtered: Lake[] = lakes;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((lake) =>
        lake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lake.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lake.barangays.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lake.fishSpecies.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Depth filter
    if (depthFilter !== 'all') {
      filtered = filtered.filter((lake) => {
        const depth = lake.maxDepth;
        if (depthFilter === 'shallow') return depth < 40;
        if (depthFilter === 'medium') return depth >= 40 && depth <= 60;
        if (depthFilter === 'deep') return depth > 60;
        return true;
      });
    }

    return filtered;
  }, [lakes, searchQuery, depthFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalArea = lakes.reduce(
      (sum, lake) => sum + (lake.area || 0),
      0
    );

    const avgDepth =
      lakes.reduce(
        (sum, lake) => sum + (lake.maxDepth || 0),
        0
      ) / lakes.length;

    const totalSpecies = lakes.reduce(
      (sum, lake) => sum + (lake.number_species || 0),
      0
    );

    return {
      totalLakes: lakes.length,
      totalArea: totalArea.toFixed(2),
      avgDepth: avgDepth.toFixed(1),
      totalSpecies,
    };
  }, [lakes]);




  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-linear-to-br from-sky-50 via-white to-emerald-50">

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Category not found</h1>
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

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-sky-600 to-emerald-600 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${category.image})` }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <ProgressLink
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </ProgressLink>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Waves className="size-4" />
              <span className="text-sm">Ecological & Governance Research Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>

            <p className="text-lg md:text-md text-sky-50 leading-relaxed mb-8">
              {category.description}
            </p>

            <button
              onClick={() => {
                setActiveTab('lakes');
                setTimeout(() => {
                  document.getElementById('lake-explorer')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-sky-700 rounded-xl hover:bg-sky-50 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <span>Explore Lakes</span>
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12 ">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white to-gray-50 px-4  py-5 rounded-2xl border border-gray-200 shadow-sm">
            <TabsTrigger
              value="overview"
              className="flex items-center justify-center gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-md bg-white hover:bg-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <Info className="size-4 sm:size-5 text-sky-500 group-data-[state=active]:text-white transition-colors" />
              <span className="text-xs sm:text-sm md:text-base font-medium truncate">Overview</span>
            </TabsTrigger>

            <TabsTrigger
              value="lakes"
              className="flex items-center justify-center gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/50 hover:bg-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <Droplets className="size-4 sm:size-5 text-emerald-500 group-data-[state=active]:text-white transition-colors" />
              <span className="text-xs sm:text-sm md:text-base font-medium truncate">Lakes</span>
            </TabsTrigger>

            <TabsTrigger
              value="data"
              className="flex items-center justify-center gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/50 hover:bg-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <Database className="size-4 sm:size-5 text-purple-500 group-data-[state=active]:text-white transition-colors" />
              <span className="text-xs sm:text-sm md:text-base font-medium truncate">Data</span>
            </TabsTrigger>

            <TabsTrigger
              value="governance"
              className="flex items-center justify-center gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/50 hover:bg-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <Users className="size-4 sm:size-5 text-orange-500 group-data-[state=active]:text-white transition-colors" />
              <span className="text-xs sm:text-sm md:text-base font-medium truncate">Governance</span>
            </TabsTrigger>
          </TabsList>
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Key Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Droplets className="size-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalLakes}</div>
                  </div>
                  <p className="text-sm text-slate-600">Total Lakes</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <MapPin className="size-5 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalArea}</div>
                  </div>
                  <p className="text-sm text-slate-600">Hectares</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <Waves className="size-5 text-sky-600" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.avgDepth}m</div>
                  </div>
                  <p className="text-sm text-slate-600">Avg. Depth</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Database className="size-5 text-teal-600" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalSpecies}</div>
                  </div>
                  <p className="text-sm text-slate-600">Fish Species</p>
                </div>
              </div>

              {/* Map Placeholder & Introduction */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">About This Region</h3>
                  <p className='text-black/60 text-justify '>{category.aboutregion}</p>
                </div>

                <LakesMap points={lakeMapPoints} />
              </div>

              {/* Quick Access to Lakes */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Access to Individual Lakes</h3>
                <div className={`grid gap-3 ${categoryId === 'twin-lakes'
                  ? 'grid-cols-2 md:grid-cols-2 max-w-md mx-auto'
                  : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-7'
                  }`}>
                  {lakes.map((lake) => (
                    <ProgressLink
                      key={lake.id}
                      href={`/lakes/${lake.slug}`}
                      className="p-4 border border-slate-200 rounded-xl hover:border-sky-400 hover:bg-sky-50 transition-all text-center group"
                    >
                      <Droplets className="size-6 text-sky-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium text-slate-900"> {(lake.name || "").replace(" Lake", "")}</p>
                    </ProgressLink>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Lakes Tab */}
          <TabsContent value="lakes" className="mt-8" id="lake-explorer">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Search and Filter */}
              <div className="mb-8 space-y-4">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <FilterBar depthFilter={depthFilter} onDepthFilterChange={setDepthFilter} />
              </div>

              {/* Results Count */}
              {(searchQuery || depthFilter !== 'all') && (
                <div className="mb-6">
                  <p className="text-sm text-slate-600">
                    Showing {filteredLakes.length} of {lakes.length} lakes
                  </p>
                </div>
              )}

              {/* Lakes Grid */}
              {filteredLakes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLakes.map((lake) => (
                    <LakeCard key={lake.id} {...lake} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-200">
                  <p className="text-lg text-slate-600 mb-4">No lakes found matching your criteria</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setDepthFilter('all');
                    }}
                    className="text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Data & Insights Tab */}
          <TabsContent value="data" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <BarChart3 className="size-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Data & Visualizations</h3>
                    <p className="text-slate-600">Explore ecological, hydrological, and governance data through interactive visualizations</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Land Use Card */}
                  <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-sky-400 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <MapPin className="size-5 text-emerald-600" />
                      </div>
                      <h4 className="font-bold text-slate-900">Land Use</h4>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      Analysis of land use patterns in watershed areas and their impact on water quality
                    </p>
                    <div className="bg-slate-100 rounded-lg p-4 text-center">
                      <BarChart3 className="size-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">Chart placeholder</p>
                    </div>
                  </div>

                  {/* Resource Utilization Card */}
                  <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-sky-400 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Waves className="size-5 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-slate-900">Resource Utilization</h4>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      Fishing activities, aquaculture operations, and water extraction patterns
                    </p>
                    <div className="bg-slate-100 rounded-lg p-4 text-center">
                      <BarChart3 className="size-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">Chart placeholder</p>
                    </div>
                  </div>

                  {/* Environmental Stressors Card */}
                  <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-sky-400 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Database className="size-5 text-red-600" />
                      </div>
                      <h4 className="font-bold text-slate-900">Environmental Stressors</h4>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      Key pressures including pollution, sedimentation, and invasive species
                    </p>
                    <div className="bg-slate-100 rounded-lg p-4 text-center">
                      <BarChart3 className="size-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">Chart placeholder</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl border border-sky-200">
                  <h4 className="font-bold text-slate-900 mb-3">Access Detailed Datasets</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Request access to comprehensive ecological, hydrological, and governance datasets. All data requests require user information for research tracking purposes.
                  </p>
                  <button className="px-6 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium">
                    Request Data Access
                  </button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Governance Tab */}
          <TabsContent value="governance" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Users className="size-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Governance & Policy</h3>
                    <p className="text-slate-600">Understanding management structures and policy interventions for sustainable lake conservation</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
                    <h4 className="font-bold text-slate-900 mb-3">Management Structures</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Local Government Units (LGUs) coordination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Barangay-level management committees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Community-based organizations and cooperatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Multi-stakeholder partnerships</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200">
                    <h4 className="font-bold text-slate-900 mb-3">Key Policy Areas</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Water quality standards and monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Land use zoning and buffer zone regulations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Sustainable fishing and aquaculture practices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Watershed protection and restoration programs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                  <h4 className="font-bold text-slate-900 mb-3">Policy Recommendations</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    Based on ecological assessments and governance analysis, key policy interventions include establishing comprehensive lake management plans, strengthening enforcement mechanisms, promoting community participation, and developing integrated watershed management approaches.
                  </p>
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Full Policy Report
                  </button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200" >
          <LakeBarChart data={bardata} />
        </div>


      </main>



      <div className="py-18 p-6  bg-gray-50 border  border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900  text-center mb-6">
          Partners
        </h2>


        <div className=" flex flex-wrap justify-center items-center gap-10 mb-6">
          {partners.map((partner) => {
            // Get featured image URL safely
            const logoUrl =
              partner._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

            return (
              <div
                key={partner.id}
                className="flex items-center justify-center p-3 rounded-xl"
              >
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={partner.title.rendered}
                    className="h-12 object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>


        {category.description && (
          <p className="text-sm mb-8 text-gray-600   leading-relaxed max-w-4xl mx-auto text-center">
            {category.description}
          </p>
        )}

        <SmileySurvey />
      </div>

    </div>
  );
}