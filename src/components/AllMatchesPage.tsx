import React from "react";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AllMatchesPage = () => {
  const [allMatches, setAllMatches] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: false })
      .then(({ data }) => {
        const sorted = (data || []).slice().sort((a: any, b: any) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime());
        setAllMatches(sorted);
      });
  }, []);

  return (
    <section className="py-20 bg-orange-50/30 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">All Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMatches.map((match, i) => {
            let tint = "";
            if (match.result === "win") tint = "bg-green-50/80 dark:bg-green-950/30 border-green-200 dark:border-green-900";
            else if (match.result === "loss") tint = "bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-900";
            else tint = "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800";
            return (
              <div key={match.id || i} className={`rounded-2xl border shadow flex flex-col justify-between transition-all duration-300 ${tint}`}>
                <div className="flex flex-col items-center p-6 h-full">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{match.match_date}</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">{match.competition}</span>
                  <div className="flex items-center justify-center gap-4 my-4">
                    <div className="relative w-20 h-20">
                      <img src={logo} alt="United FC Kodagu logo" className="absolute inset-0 w-20 h-20 object-cover rounded-full" />
                    </div>
                    <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow">{match.score}</span>
                    <div className="relative w-20 h-20">
                      <img src={match.image_url || "https://placehold.co/80x80/gray/white?text=OPP"} alt={`${match.opponent} logo`} className="absolute inset-0 w-20 h-20 object-cover rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <span className="text-sm font-bold text-orange-600 dark:text-cyan-400 flex items-center gap-2">United FC Kodagu</span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">{match.opponent}</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider">
                    {match.result}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllMatchesPage;
