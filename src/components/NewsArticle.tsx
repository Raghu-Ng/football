import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar } from 'lucide-react';

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

  if (loading) return <div className="py-20 text-center text-gray-500 dark:text-gray-400">Loading...</div>;
  if (!article) return <div className="py-20 text-center text-gray-500 dark:text-gray-400">Article not found.</div>;

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/news" className="text-orange-500 dark:text-cyan-400 font-semibold mb-4 inline-block">&larr; All News</Link>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{article.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Calendar size={16} />
          <span>{article.date_posted ? new Date(article.date_posted).toLocaleDateString() : ''}</span>
        </div>
        {article.image_url && (
          <img src={article.image_url} alt={article.title} className="w-full h-64 object-cover rounded-xl mb-8 shadow" />
        )}
        <div className="prose dark:prose-invert max-w-none text-lg text-gray-800 dark:text-gray-200">
          {article.content && article.content.split('\n').map((line: string, idx: number) =>
            <p key={idx}>{line}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsArticle;
