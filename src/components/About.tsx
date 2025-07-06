import React, { useEffect, useState } from "react";
import { Award, Users, Trophy, Target, Zap, Shield, Cpu } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ParallaxSection from "./ParallaxSection";
import { supabase } from "../lib/supabase";
import logo from "../assets/images/logo.png"
import { useNavigate } from "react-router-dom";

const About = () => {
  const stats = [
    {
      icon: <Trophy className="w-8 h-8" />,
      number: "150+",
      label: "Championships Won",
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Active Players",
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "25",
      label: "Years of Excellence",
    },
    {
      icon: <Target className="w-8 h-8" />,
      number: "100+",
      label: "Professional Players",
    },
  ];

  const [latestWin, setLatestWin] = useState<any | null>(null);
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all matches
    supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: false })
      .then(({ data }) => {
        // Sort all matches by match_date descending (already sorted by Supabase, but ensure in JS)
        const sorted = (data || []).slice().sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime());
        setAllMatches(sorted);
        // Find latest win using result column
        if (sorted.length > 0) {
          const win = sorted.find((m: any) => m.result === "win");
          setLatestWin(win || null);
        }
      });
    // Fetch upcoming matches
    supabase
      .from("upcoming_matches")
      .select("*")
      .order("match_date", { ascending: true })
      .then(({ data }) => {
        // Sort by match_date ascending, then by kickoff_time ascending if available
        const sorted = (data || []).slice().sort((a, b) => {
          const dateA = new Date(a.match_date).getTime();
          const dateB = new Date(b.match_date).getTime();
          if (dateA !== dateB) return dateA - dateB;
          if (a.kickoff_time && b.kickoff_time) {
            return a.kickoff_time.localeCompare(b.kickoff_time);
          }
          return 0;
        });
        setUpcomingMatches(sorted);
      });
  }, []);

  const navigate = useNavigate()

  return (
    <section
      id="about"
      className="py-20 bg-orange-50/30 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gr`ad`ient-to-br from-orange-50/50 via-red-50/30 to-yellow-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />

      <ParallaxSection speed={0.2}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </ParallaxSection>
      <ParallaxSection speed={0.3}>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </ParallaxSection>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-orange-400/30 to-red-600/30 dark:from-cyan-400/30 dark:to-blue-600/30 rounded-full blur-sm" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full border border-orange-400/30 dark:border-cyan-400/30 shadow-2xl shadow-orange-400/20 dark:shadow-cyan-400/20 relative group">
                <Zap className="w-8 h-8 text-orange-500 dark:text-cyan-400 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                United FC Kodagu
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Founded in 1999, United FC Kodagu has been at the forefront of
              developing world-class football talent through
              <span className="text-orange-500 dark:text-cyan-400 relative group">
                {" "}
                innovative training methods
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 dark:from-cyan-400 dark:to-blue-500 group-hover:w-full transition-all duration-300" />
              </span>{" "}
              and unwavering commitment to excellence.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left" delay={200}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-orange-500 dark:text-cyan-400" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We believe that every player has the potential for greatness.
                Our comprehensive approach combines
                <span className="text-orange-500 dark:text-cyan-400 font-semibold">
                  {" "}
                  technical skill development
                </span>
                , tactical understanding, physical conditioning, and mental
                resilience to create complete footballers.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                From grassroots to professional level, we provide a pathway for
                ambitious players to achieve their dreams while instilling
                values of{" "}
                <span className="text-red-500 dark:text-blue-400 font-semibold">
                  teamwork
                </span>
                ,
                <span className="text-yellow-500 dark:text-purple-400 font-semibold">
                  {" "}
                  respect
                </span>
                , and
                <span className="text-orange-500 dark:text-cyan-400 font-semibold">
                  {" "}
                  dedication
                </span>
                .
              </p>
              {/* <button className="group bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="flex items-center gap-2 relative z-10">
                  Learn More About Us
                  <Cpu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </button> */}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={400}>
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl border border-orange-400/20 dark:border-cyan-400/20 shadow-2xl shadow-orange-500/20 dark:shadow-cyan-500/20 transform group-hover:scale-105 transition-all duration-500">
                <img
                  src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Training session"
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10 dark:from-cyan-500/10 dark:to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white p-6 rounded-2xl shadow-xl border border-orange-400/30 dark:border-cyan-400/30 transform group-hover:scale-110 transition-all duration-500">
                <h4 className="text-2xl font-bold">25+</h4>
                <p className="text-orange-100 dark:text-cyan-100">
                  Years of Excellence
                </p>
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 dark:from-purple-400/30 dark:to-pink-500/30 rounded-full animate-pulse" />
              <div className="absolute top-1/2 -left-2 w-6 h-6 bg-gradient-to-r from-orange-400/30 to-red-500/30 dark:from-cyan-400/30 dark:to-blue-500/30 rounded-full animate-bounce" />
            </div>
          </ScrollReveal>
        </div>

        {/* Enhanced Stats */}
            

      </div>

      {/* Wins & Upcoming Matches Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
        <div className="mb-4 text-2xl font-bold">Recent matches and upcoming matches</div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Show latest win from matches */}
          {latestWin && (
            <div key={latestWin.id} className="w-full md:flex-1 min-w-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800 shadow-2xl flex flex-col justify-between transition-all duration-300">
              <div className="flex flex-col items-center p-6 h-full">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{latestWin.match_date}</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">{latestWin.competition}</span>
                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="relative w-20 h-20">
                    <img src={logo} alt="United FC Kodagu logo" className="absolute inset-0 w-20 h-20 object-cover rounded-full" />
                  </div>
                  <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow">{latestWin.score}</span>
                  <div className="relative w-20 h-20">
                    <img src={latestWin.image_url} alt={`${latestWin.opponent} logo`} className="absolute inset-0 w-20 h-20 object-fit rounded-full" />
                  </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <span className="text-sm font-bold text-orange-600 dark:text-cyan-400 flex items-center gap-2">United FC Kodagu</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">{latestWin.opponent}</span>
                </div>
              </div>
            </div>
          )}
          {/* Show 2 upcoming matches */}
          {upcomingMatches.slice(0, 2).map((match, i) => {
            let time = match.kickoff_time;
            if (typeof time === "string" && time.length >= 5) time = time.slice(0, 5);
            return (
              <div key={match.id || i} className="w-full md:flex-1 min-w-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800 shadow-2xl flex flex-col justify-between transition-all duration-300">
                <div className="flex flex-col items-center p-6 h-full">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{match.match_date}</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">{match.competition}</span>
                  <div className="flex items-center justify-center gap-4 my-4">
                    <div className="relative w-20 h-20">
                      <img src={logo} alt="United FC Kodagu logo" className="absolute inset-0 w-20 h-20 object-cover rounded-full" />
                    </div>
                    <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow">{time || "19:00"}</span>
                    <div className="relative w-20 h-20">
                      <img src={match.image_url || "https://placehold.co/80x80/gray/white?text=OPP"} alt={`${match.opponent} logo`} className="absolute inset-0 w-20 h-20 object-cover rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <span className="text-sm font-bold text-orange-600 dark:text-cyan-400 flex items-center gap-2">United FC Kodagu</span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">{match.opponent}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* All Matches Section Link */}
        <div className="mt-8 flex justify-center">
          <button onClick={() => navigate("/all-matches")}  className="inline-block px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 text-white shadow hover:from-orange-500 hover:to-red-500 dark:hover:from-cyan-500 dark:hover:to-blue-500 transition-all duration-200">
            View All Matches
          </button>
        </div>
      </div>
      {/* End Wins & Upcoming Matches Section */}
    </section>
  );
};

export default About;
