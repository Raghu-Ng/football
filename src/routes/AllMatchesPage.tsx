import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AllMatchesPage = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const { data } = await supabase.from('matches').select('*').order('match_date', { ascending: false });
      setMatches(data || []);
      setLoading(false);
    };
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-white px-[5vw] py-16">
      <h1 className="text-primary font-bold text-4xl mb-12">All Matches</h1>
      {loading ? (
        <div className="text-xl text-gray-500">Loading...</div>
      ) : matches.length === 0 ? (
        <div className="text-xl text-gray-500">No matches found.</div>
      ) : (
        <table className="w-full border-t border-b border-gray-300 text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 px-2">Opponent</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Score</th>
              <th className="py-3 px-2">Venue</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id} className="border-b border-gray-200">
                <td className="py-2 px-2">{m.opponent}</td>
                <td className="py-2 px-2">{m.match_date}</td>
                <td className="py-2 px-2">{m.score}</td>
                <td className="py-2 px-2">{m.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllMatchesPage;
