import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const NewsArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data } = await supabase.from('news').select('*').eq('id', id).single();
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;
  if (!article) return <div className="py-20 text-center text-gray-500">Article not found.</div>;

  return (
    <div className="min-h-screen bg-white px-[100px] py-16">
      <Link to="/news" className="text-primary font-semibold mb-4 inline-block">&larr; All News</Link>
      <h1 className="text-primary font-bold text-5xl mb-6">{article.title}</h1>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>{article.date_posted ? new Date(article.date_posted).toLocaleDateString() : ''}</span>
      </div>
      {article.image_url && (
        <img src={article.image_url} alt={article.title} className="w-full h-64 object-cover mb-8" style={{ borderRadius: 0 }} />
      )}
      <div className="prose max-w-none text-lg text-gray-800 mb-6" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
        {article.content}
      </div>
      {(article.team1 || article.team2) && (
        <div className="text-base text-gray-700 mb-1">{article.team1}{article.team1 && article.team2 && ' vs '}{article.team2}</div>
      )}
      {article.venue && (
        <div className="text-base text-gray-500">Venue: {article.venue}</div>
      )}
    </div>
  );
};

export default NewsArticle;
