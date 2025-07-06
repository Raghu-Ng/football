import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('news').select('*').order('date_posted', { ascending: false });
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-orange-500 dark:text-blue-400">All News</h1>
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500 dark:text-gray-400">Loading news...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-lg text-gray-500 dark:text-gray-400">No news articles found.</div>
        ) : (
          <div className="space-y-8">
            {news.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className="block group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-[1.01] border border-gray-200/50 dark:border-gray-700 hover:border-orange-400/50 dark:hover:border-cyan-400/50 hover:shadow-orange-500/20 dark:hover:shadow-cyan-500/20">
                <div className="flex flex-col md:flex-row">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} className="w-full md:w-64 h-48 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none" />
                  )}
                  <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-cyan-400 transition-colors">{item.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar size={16} />
                      <span>{item.date_posted ? new Date(item.date_posted).toLocaleDateString() : ''}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {item.content && item.content.split('\n')[0].slice(0, 180)}{item.content && item.content.split('\n')[0].length > 180 ? '...' : ''}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllNews;
