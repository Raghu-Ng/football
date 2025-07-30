import React, { useEffect, useState } from "react";
import { Award, Users, Trophy, Target, Zap, Shield, Cpu } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ParallaxSection from "./ParallaxSection";
import { supabase } from "../lib/supabase";
import logo from "../assets/images/logo.png";
import logoImg from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const achievements = [
    {
      title: "Champions",
      season: "2023-24",
      description: "Crowned champions of the league.",
    },
    {
      title: "7th Position",
      season: "2024-25",
      description:
        "Secured 7th position in the Karnataka Women's Super Division League.",
    },
    {
      title: "3rd Place",
      season: "2021-22",
      description:
        "Secured 3rd position in the Karnataka Women's A Division League.",
    },
    {
      title: "Qualified for A Division League",
      season: "2020-21",
      description:
        "Finished as table toppers without a single loss and qualified to play in the Karnataka Women's A Division League.",
    },
    {
      title: "Runner-Up",
      season: "2022-23",
      description: "Placed second in the Karnataka Women's A Division League.",
    },
    {
      title: "Debut Season Survival",
      season: "2024-25",
      description:
        "In our first Super Division League season, our main objective was to avoid relegation—successfully achieved by finishing 7th.",
    },
    {
      title: "Qualified for Super Division",
      season: "Unknown",
      description:
        "Secured top position in the A Division League and qualified to play in the Karnataka Women's Super Division League.",
    },
    {
      title: "Future Goal",
      season: "2025-26 (Expected)",
      description:
        "We are expecting to qualify for the India Women's Premier League.",
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
        const sorted = (data || [])
          .slice()
          .sort(
            (a, b) =>
              new Date(b.match_date).getTime() -
              new Date(a.match_date).getTime()
          );
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

  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="py-12 bg-white bg-blue-50/30 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gr`ad`ient-to-br from-blue-50/50 via-red-50/30 to-yellow-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />

      <ParallaxSection speed={0.2}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
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
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400/30 to-red-600/30 dark:from-cyan-400/30 dark:to-blue-600/30 rounded-full blur-sm" />
          </div>
        ))}
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left" delay={200}>
            <div>
              <ScrollReveal direction="up" delay={100}>
                <div className="mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    About{" "}
                    <span className="text-4xl md:text-5xl font-bold text-Blue-900 dark:text-white mb-6">
                      United FC Kodagu
                    </span>
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300  mx-auto">
                    Founded in 1999, United FC Kodagu has been at the forefront
                    of developing world-class football talent through
                    <span className="text-blue-700 dark:text-cyan-400 relative group !font-medium">
                      {" "}
                      innovative training methods
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-red-500 dark:from-cyan-400 dark:to-blue-500 group-hover:w-full transition-all duration-300" />
                    </span>{" "}
                    and unwavering commitment to excellence.
                  </p>
                </div>
              </ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                {/* <Shield className="w-6 h-6 text-blue-700 dark:text-cyan-400" /> */}
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Our mission is to empower young women through{" "}
                <span className="text-blue-700 dark:text-cyan-400 font-semibold">
                  free, professional football training
                </span>
                , fostering{" "}
                <span className="text-blue-700 dark:text-blue-400 font-semibold">
                  talent
                </span>
                ,{" "}
                <span className="text-blue-700 dark:text-purple-400 font-semibold">
                  discipline
                </span>
                , and{" "}
                <span className="text-blue-700 dark:text-cyan-400 font-semibold">
                  leadership
                </span>
                . We are committed to building a strong platform for girls from
                all backgrounds to thrive in sport, gain exposure, and pursue
                their dreams with{" "}
                <span className="text-blue-700 dark:text-blue-400 font-semibold">
                  dignity
                </span>{" "}
                and{" "}
                <span className="text-blue-700 dark:text-purple-400 font-semibold">
                  pride
                </span>
                .
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                To create a world where every girl with a passion for football
                has the opportunity resources, and support to rise, compete, and
                lead both on and off the field.
              </p>


            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={400}>
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 dark:border-cyan-400/20 shadow-2xl shadow-blue-500/20 dark:shadow-cyan-500/20 transform group-hover:scale-105 transition-all duration-500">
                <img
                  src={logoImg}
                  alt="Training session"
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                  />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-600/10 dark:from-cyan-500/10 dark:to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white p-6 rounded-2xl shadow-xl border border-blue-400/30 dark:border-cyan-400/30 transform group-hover:scale-110 transition-all duration-500">
                <h4 className="text-2xl font-bold">5+</h4>
                <p className="text-blue-100 dark:text-cyan-100">
                  Years of Excellence
                </p>
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400/30 to-blue-500/30 dark:from-purple-400/30 dark:to-pink-500/30 rounded-full animate-pulse" />
              <div className="absolute top-1/2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400/30 to-red-500/30 dark:from-cyan-400/30 dark:to-blue-500/30 rounded-full animate-bounce" />
            </div>
          </ScrollReveal>
        </div>

        {/* Enhanced Stats */}
      </div>

      {/* Wins & Upcoming Matches Section */}

      {/* End Wins & Upcoming Matches Section */}
      <div className="w-full flex flex-col sm:flex-row px-4 sm:px-6 lg:px-8 gap-12 items-stretch">
        <div className="w-full  relative z-10 flex flex-col">
          <div className="mb-4 text-3xl font-bold flex justify-between">
            <div className="text-gray-900 dark:text-white">
              Recent matches and upcoming matches
            </div>
            <button
              onClick={() => navigate("/all-matches")}
              className="group text-sm border border-blue-500 dark:border-cyan-500 text-blue-600 dark:text-cyan-400 bg-blue-50/10 dark:bg-cyan-50/10 hover:bg-blue-100/20 dark:hover:bg-cyan-100/20 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
            >
              View All Matches
            </button>
          </div>
          <div className="flex flex-col h-full md:flex-row gap-8 justify-center items-stretch">
            {/* Show latest win from matches */}
            {latestWin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  type: "tween",
                  ease: "easeInOut",
                }}
                key={latestWin.id}
                className="w-full md:flex-1 min-w-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800 shadow-2xl shadow-black/10 flex flex-col justify-between duration-300 hover:border-blue-500"
              >
                <div className="flex flex-col items-center p-6 h-full">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {latestWin.match_date}
                  </span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {latestWin.competition}
                  </span>
                  <div className="flex items-center justify-center gap-4 my-4">
                    <div className="relative size-[60px] sm:size-[4vw] overflow-hidden">
                      <img
                        src={logo}
                        alt="United FC Kodagu logo"
                        className="absolute inset-0 size-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
                      {latestWin.score}
                    </span>
                    <div className="relative size-[60px] sm:size-[4vw] overflow-hidden">
                      <img
                        src={latestWin.image_url}
                        alt={`${latestWin.opponent} logo`}
                        className="absolute inset-0 size-full object-fit rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <span className="text-sm font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-2">
                      United FC Kodagu
                    </span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      {latestWin.opponent}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
            {/* Show 2 upcoming matches */}
            {upcomingMatches.slice(0, 2).map((match, i) => {
              let time = match.kickoff_time;
              if (typeof time === "string" && time.length >= 5)
                time = time.slice(0, 5);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 * (i + 1),
                    type: "tween",
                    ease: "easeInOut",
                  }}
                  key={match.id || i}
                  className="w-full md:flex-1 min-w-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800 shadow-2xl shadow-black/10 flex flex-col justify-between  duration-300 hover:border-blue-500"
                >
                  <div className="flex flex-col items-center p-6 h-full">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {match.match_date}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {match.competition}
                    </span>
                    <div className="flex items-center justify-center gap-4 my-4">
                      <div className="relative size-[60px] sm:size-[4vw] overflow-hidden">
                        <img
                          src={logo}
                          alt="United FC Kodagu logo"
                          className="absolute inset-0 size-full object-cover rounded-full"
                        />
                      </div>
                      <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
                        {time || "19:00"}
                      </span>
                      <div className="relative size-[60px] sm:size-[4vw] overflow-hidden">
                        <img
                          src={
                            match.image_url ||
                            "https://placehold.co/80x80/gray/white?text=OPP"
                          }
                          alt={`${match.opponent} logo`}
                          className="absolute inset-0 size-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between w-full mt-2">
                      <span className="text-sm font-bold text-blue flex items-center gap-2">
                        United FC Kodagu
                      </span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        {match.opponent}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* All Matches Section Link */}
        </div>
        <div className="flex flex-col  z-10 w-full sm:w-[400px] shrink-0">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-7">
            Achievements
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  type: "tween",
                  ease: "easeInOut",
                }}
            className="flex flex-col w-full gap-2 max-h-[400px] sm:max-h-[250px] overflow-y-auto"
          >
            {achievements.map((item, index) => (
              <div
                key={index}
                className="border border-blue-200 dark:border-cyan-600 rounded-lg p-4 shadow-sm bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-blue-600 dark:text-cyan-400">
                  {item.title}{" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({item.season})
                  </span>
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
