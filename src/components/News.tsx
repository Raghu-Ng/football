import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Zap, Shield, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date_posted', { ascending: false });
      if (error) {
        setError('Failed to load news');
        setNewsItems([]);
      } else {
        setNewsItems(data || []);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Achievement: 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-400/30',
      Facility: 'bg-gradient-to-r from-blue-400/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 border-blue-400/30',
      Interview: 'bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-600 dark:text-green-400 border-green-400/30',
      Program: 'bg-gradient-to-r from-purple-400/20 to-pink-500/20 text-purple-600 dark:text-purple-400 border-purple-400/30',
      Alumni: 'bg-gradient-to-r from-red-400/20 to-rose-500/20 text-red-600 dark:text-red-400 border-red-400/30',
      Education: 'bg-gradient-to-r from-indigo-400/20 to-blue-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-400/30'
    };
    return colors[category] || 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-400/30';
  };

  return (
    <section id="news" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-red-50/20 to-yellow-50/10 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full border border-orange-400/30 dark:border-cyan-400/30">
              <Zap className="w-8 h-8 text-orange-500 dark:text-cyan-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Latest <span className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">News</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest happenings at United FC Kodagu. From 
            <span className="text-orange-500 dark:text-cyan-400 font-semibold"> match results</span> to 
            <span className="text-red-500 dark:text-blue-400 font-semibold"> player achievements</span>.
          </p>
        </div>
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500 dark:text-gray-400">Loading news...</div>
        ) : error ? (
          <div className="text-center py-12 text-lg text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.slice(0, 3).map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className="group bg-white/80 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 border border-gray-200/50 dark:border-gray-700 hover:border-orange-400/50 dark:hover:border-cyan-400/50 hover:shadow-orange-500/20 dark:hover:shadow-cyan-500/20">
                <div className="relative">
                  <img 
                    src={item.image_url || 'https://placehold.co/600x400?text=No+Image'}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t group-hover:scale-110 duration-500 transition-transform from-gray-900/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-500 dark:group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{item.content && item.content.split('\n')[0].slice(0, 120)}{item.content && item.content.split('\n')[0].length > 120 ? '...' : ''}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <div className="flex items-center gap-1 hover:text-orange-500 dark:hover:text-cyan-400 transition-colors">
                      <User size={16} />
                      <span>United FC Kodagu</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-orange-500 dark:hover:text-cyan-400 transition-colors">
                      <Calendar size={16} />
                      <span>{item.date_posted ? new Date(item.date_posted).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-orange-500 dark:text-cyan-400 font-semibold hover:text-orange-600 dark:hover:text-cyan-300 transition-colors group cursor-pointer">
                    Read More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-12 ">
          <Link to="/news" className="group bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25 flex items-center gap-2 mx-auto">
            <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;