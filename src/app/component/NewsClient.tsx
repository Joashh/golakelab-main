'use client';

import { useState } from 'react';
import { Newspaper, Calendar, User, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '../types/news';
import he from "he";

export default function NewsClient({ news }: { news: NewsItem[] }) {
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    const stripHtml = (html: string) => {
        return html.replace(/<[^>]+>/g, '');
    };

    const getCategoryColor = (category: NewsItem['category']) => {
        switch (category) {
            case 'Research':
                return 'bg-blue-100 text-blue-700 border-blue-200';

            case 'Event':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';

            case 'Policy':
                return 'bg-purple-100 text-purple-700 border-purple-200';

            case 'Community':
                return 'bg-sky-100 text-sky-700 border-sky-200';

            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-white via-sky-50 to-emerald-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-gradient-to-br from-sky-600 to-emerald-600 rounded-2xl shadow-lg">
                        <Newspaper className="size-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900">News & Updates</h2>
                        <p className="text-lg text-slate-600">Latest developments in small lake research and governance</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {news.slice(0, 3).map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group"
                        >
                            <div className={`h-2 ${item.category === 'Research' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                item.category === 'Event' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                                    item.category === 'Policy' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                        'bg-gradient-to-r from-sky-500 to-sky-600'
                                }`} />

                            <div className="p-6 ">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors">
                                    {he.decode(item.title)}
                                </h3>

                                <p className="text-slate-700 mb-4 leading-relaxed line-clamp-3" > {stripHtml(item.content)}

                                </p>

                                <div className="flex items-center gap-4 text-sm text-slate-500 pb-4 border-b border-slate-100">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="size-3.5" />
                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="size-3.5" />
                                        {item.author
                                            ? item.author.charAt(0).toUpperCase() + item.author.slice(1)
                                            : "Unknown"}
                                    </span>
                                </div>

                                <button
                                    onClick={() => setSelectedNews(item)}
                                    className="mt-4 flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium group/btn"
                                >
                                    <span>Read more</span>
                                    <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* News Detail Modal */}
                <AnimatePresence>
                    {selectedNews && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedNews(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full h-[90vh] flex flex-col overflow-hidden"
                            >
                                {/* Header - Sticky */}
                                <div className={`flex-shrink-0 p-8 ${selectedNews.category === 'Research' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                    selectedNews.category === 'Event' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                                        selectedNews.category === 'Policy' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                            'bg-gradient-to-r from-sky-500 to-sky-600'
                                    }`}>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                                            {selectedNews.category}
                                        </span>
                                        <button
                                            onClick={() => setSelectedNews(null)}
                                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                        >
                                            <X className="size-5 text-white" />
                                        </button>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        {he.decode(selectedNews.title)}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-white/90">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="size-4" />
                                            {new Date(selectedNews.date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <User className="size-3.5" />
                                            {selectedNews.author
                                                ? selectedNews.author.charAt(0).toUpperCase() + selectedNews.author.slice(1)
                                                : "Unknown"}
                                        </span>
                                    </div>
                                </div>

                                {/* Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto p-8">
                                    <div
                                        className="news-content"
                                        dangerouslySetInnerHTML={{
                                            __html: he.decode(selectedNews.content)
                                        }}
                                    />
                                </div>

                                {/* Footer - Sticky */}
                                <div className="flex-shrink-0 border-t border-slate-200 p-6 bg-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-slate-600">
                                            <span className="font-medium">Published by {selectedNews.author}</span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedNews(null)}
                                            className="px-6 py-2.5 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-all"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}