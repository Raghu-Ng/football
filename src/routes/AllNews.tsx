import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const AllNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data } = await supabase.from('news').select('*').order('date_posted', { ascending: false });
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-white px-[5vw] py-16">
      <h1 className="text-primary font-bold text-4xl mb-12">All News</h1>
      {loading ? (
        <div className="text-xl text-gray-500">Loading...</div>
      ) : news.length === 0 ? (
        <div className="text-xl text-gray-500">No news articles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {news.map((item) => (
            <Link to={`/news/${item.id}`} key={item.id} className="block bg-white border border-gray-300 p-6 hover:bg-gray-50 transition-colors">
              <div className="mb-4 w-full h-48 overflow-hidden">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" style={{ borderRadius: 0 }} />
                )}
              </div>
              <h2 className="text-primary font-bold text-xl mb-2">{item.title}</h2>
              <div className="text-gray-600 text-sm mb-2">{item.date_posted ? new Date(item.date_posted).toLocaleDateString() : ''}</div>
              <div className="text-gray-700 text-base mb-2 line-clamp-2">{item.content && item.content.split('\n')[0].slice(0, 180)}{item.content && item.content.split('\n')[0].length > 180 ? '...' : ''}</div>
              {(item.team1 || item.team2) && (
                <div className="text-base text-gray-700 mb-1">{item.team1}{item.team1 && item.team2 && ' vs '}{item.team2}</div>
              )}
              {item.venue && (
                <div className="text-base text-gray-500">Venue: {item.venue}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNews;
