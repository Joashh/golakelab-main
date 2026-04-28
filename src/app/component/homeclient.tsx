'use client'
import { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Users, Sparkles, MessageSquare, ArrowUp, ArrowDown, Share2, Bookmark, Plus, TrendingUp, Clock, Award } from 'lucide-react';
import { SegmentedNav } from './SegmentedNav';
import { motion } from 'motion/react';
import ProgressLink from './progresslink';
import he from "he";

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count?: number;
};

export default function HomePage({ categories, posts }: { categories: Category[]; posts: any[]; }) {
  const [activeSection, setActiveSection] = useState<'about' | 'explore' | 'engage'>('explore');
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');



  const getAvatarColor = (name: string) => {
    const colors = [
      'from-sky-500 to-blue-500',
      'from-emerald-500 to-teal-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-500',
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const forumPosts = posts;

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-sky-50 via-white to-emerald-50">

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Segmented Navigation */}
        <div className="mb-12">
          <SegmentedNav activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Section Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* About Section */}
          {activeSection === 'about' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-linear-to-br from-sky-100 to-emerald-100 rounded-xl">
                  <BookOpen className="size-8 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">What This is About</h2>
                  <p className="text-lg text-slate-600">Understanding the mission and vision of GoLake Lab</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  The Governance Leadership, Advocacy for Knowledge Enhancement Laboratory (GoLAKE Lab) is transforming small lake management by creating a dedicated platform within UPLB. We empower stakeholders with the skills, tools, and data to support evidence-based governance and sustainable lake management.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="p-6 bg-linear-to-br from-sky-50 to-sky-100 rounded-xl border border-sky-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Capacity Building</h3>
                    <p className="text-slate-600 text-sm">
                      Train planners, policymakers, LGUs, and researchers to conduct lake studies and utilize decision support systems (DSS).
                    </p>
                  </div>
                  <div className="p-6 bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Centralized Repository</h3>
                    <p className="text-slate-600 text-sm">
                      Consolidate hydrological, ecological, governance, and socio-economic datasets for easy access and analysis.
                    </p>
                  </div>
                  <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Evidence-Based Policy</h3>
                    <p className="text-slate-600 text-sm">
                      Collaborate with experts and laboratories to support adaptive management and informed decision-making.
                    </p>
                  </div>
                  <div className="p-6 bg-linear-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Monitoring & Collaboration</h3>
                    <p className="text-slate-600 text-sm">
                      Work with DOST-PCAARRD-supported labs and small lake governance specialists to enhance governance effectiveness.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSection('explore')}
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-linear-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all group"
                >
                  <span>Explore Small Lakes</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Explore Section */}
          {activeSection === 'explore' && (
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Explore Small Lakes</h2>
                <p className="text-lg text-slate-600">Discover detailed information about lake ecosystems and their biodiversity</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all flex flex-col h-full"
                  >
                    <div className="relative h-64 overflow-hidden bg-slate-200 flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{category.name}</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed text-justify">{category.description}</p>
                      </div>

                      <ProgressLink
                        href={`/lake-categories/${category.slug}`}
                        className="inline-flex  items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all group w-full mt-auto"
                      >
                        <span>Explore Lakes</span>
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </ProgressLink>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Engage Section */}
          {activeSection === 'engage' && (
            <div>
              {/* Header with Create Post Button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl">
                    <Users className="size-8 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Community Forum</h2>
                    <p className="text-lg text-slate-600">Share insights, ask questions, and connect with researchers</p>
                  </div>
                </div>
                <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white rounded-lg hover:from-sky-700 hover:to-emerald-700 transition-all font-medium shadow-lg shadow-sky-200">
                  <Plus className="size-4" />
                  <span>Create Post</span>
                </button>
              </div>

              {/* Sorting Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSortBy('hot')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${sortBy === 'hot'
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    <TrendingUp className="size-4" />
                    <span>Hot</span>
                  </button>
                  <button
                    onClick={() => setSortBy('new')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${sortBy === 'new'
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    <Clock className="size-4" />
                    <span>New</span>
                  </button>
                  <button
                    onClick={() => setSortBy('top')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${sortBy === 'top'
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    <Award className="size-4" />
                    <span>Top</span>
                  </button>
                </div>
              </div>

              {/* Forum Posts */}
              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all overflow-hidden"
                  >
                    <div className="flex">
                      {/* Voting Section */}
                      <div className="flex flex-col items-center gap-1 bg-slate-50 px-4 py-4 border-r border-slate-200">
                        <button className="p-1 hover:bg-sky-100 rounded transition-colors group">
                          <ArrowUp className="size-5 text-slate-400 group-hover:text-sky-600" />
                        </button>
                        <span className="text-sm font-bold text-slate-700">{post.upvotes}</span>
                        <button className="p-1 hover:bg-slate-200 rounded transition-colors group">
                          <ArrowDown className="size-5 text-slate-400 group-hover:text-slate-600" />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="flex-1 p-6">
                        {/* Post Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(post.author)} flex items-center justify-center text-white text-xs font-bold`}>
                            {post.avatar}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
                            <span className="font-semibold text-slate-900">{post.author ? post.author.charAt(0).toUpperCase() + post.author.slice(1) : "Unknown"}</span>
                            <span>•</span>
                            <ProgressLink
                              href={`/lake-categories/${post.categorySlug}`}
                              className="text-sky-600 font-medium hover:underline"
                            >
                              {post.category}
                            </ProgressLink>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>

                        {/* Post Title */}
                        <h3 className="font-bold text-lg text-slate-900 mb-2 hover:text-sky-600 cursor-pointer transition-colors">
                          {post.title}
                        </h3>

                        {/* Post Content */}
                        <div className="text-slate-700 mb-3 leading-relaxed text-justify news-content" dangerouslySetInnerHTML={{
                          __html: he.decode(post.content)
                        }} />


                        {/* Tags */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {post.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium hover:bg-slate-200 cursor-pointer transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                          <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors group">
                            <MessageSquare className="size-4 group-hover:text-sky-600" />
                            <span className="text-sm font-medium">{post.comments} Comments</span>
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors group">
                            <Share2 className="size-4 group-hover:text-emerald-600" />
                            <span className="text-sm font-medium">Share</span>
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors group">
                            <Bookmark className="size-4 group-hover:text-blue-600" />
                            <span className="text-sm font-medium">Save</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Create Post Button */}
              <button className="sm:hidden fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-600 to-emerald-600 text-white rounded-full hover:from-sky-700 hover:to-emerald-700 transition-all font-medium shadow-lg shadow-sky-300 z-10">
                <Plus className="size-5" />
                <span>New Post</span>
              </button>
            </div>
          )}
        </motion.div>
      </main>


    </div>
  );
}
