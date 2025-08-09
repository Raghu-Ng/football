import React, { useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  Zap,
  Shield,
  Target,
  Star,
  Trophy,
  Award,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ParallaxSection from "./ParallaxSection";
import { useRef } from "react";
const PlayerCard3D = ({ player, index, setSelectedPlayer }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  const getPositionColor = (position) => {
    const colors = {
      Forward: "from-red-500 to-orange-500",
      Midfielder: "from-green-500 to-emerald-500",
      Defender: "from-blue-500 to-cyan-500",
      Goalkeeper: "from-purple-500 to-pink-500",
    };
    return colors[position] || "from-gray-500 to-gray-600";
  };

  return (
    <ScrollReveal direction="up" delay={200 + index * 100}>
      <div className="perspective-1000">
        <div
          ref={cardRef}
          className="relative w-full h-96 preserve-3d transition-all duration-300 ease-out cursor-pointer group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setSelectedPlayer(player)}
        >
          {/* Card Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 group-hover:border-orange-500 dark:group-hover:border-cyan-400">
            {/* Base Background Layer */}
            <div className="absolute inset-0 rounded-2xl bg-slate-50/50 dark:bg-transparent z-0" />

            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-white dark:bg-gray-800 z-0">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getPositionColor(
                  player.position
                )} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent dark:from-gray-900 dark:via-gray-900/50" />
            </div>

            {/* Floating Stars */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex space-x-1">
                {Array.from({ length: Math.floor(player.rating) }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>
            </div>

            {/* Player Image */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-400 dark:border-cyan-400 shadow-2xl shadow-orange-500/30 dark:shadow-cyan-500/30 group-hover:border-orange-500 dark:group-hover:border-cyan-400 transition-all duration-500 group-hover:scale-110">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Player Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-10">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                {player.name}
              </h3>
              <div
                className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getPositionColor(
                  player.position
                )} text-white shadow-lg mb-3`}
              >
                {player.position}
              </div>

              <div className="flex justify-center items-center space-x-4 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {player.age}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {player.nationality}
                </span>
              </div>

              {/* Stats preview */}
              <div className="mt-4 grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                {Object.entries(player.stats)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-100/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-2 border border-gray-300 dark:border-gray-600"
                    >
                      <div className="text-orange-500 dark:text-cyan-400 font-bold text-lg">
                        {value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Particle overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-500 dark:bg-cyan-400 rounded-full animate-pulse shadow"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* 3D depth layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 dark:from-cyan-500/5 dark:to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-z-10" />
          </div>

          {/* Floating Achievement Badge */}
          <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-y-2 group-hover:translate-y-0">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-white/50 flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Elite
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const People = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const players = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Forward",
      age: 19,
      nationality: "USA",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      bio: "Rising star with exceptional pace and finishing ability. Joined our academy at 14 and has shown tremendous growth.",
      stats: { goals: 24, assists: 8, appearances: 32 },
      achievements: ["Top Scorer 2023", "Player of the Month"],
      rating: 4.8,
    },
    {
      id: 2,
      name: "Maria Santos",
      position: "Midfielder",
      age: 17,
      nationality: "Brazil",
      image:
        "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      bio: "Creative playmaker with excellent vision and passing range. Captain of our U18 team.",
      stats: { goals: 12, assists: 18, appearances: 28 },
      achievements: ["Team Captain", "Best Playmaker"],
      rating: 4.9,
    },
    {
      id: 3,
      name: "James Wilson",
      position: "Defender",
      age: 20,
      nationality: "England",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      bio: "Solid defender with leadership qualities. Currently training with professional clubs.",
      stats: { goals: 3, assists: 5, appearances: 35 },
      achievements: ["Defensive Player of Year", "Clean Sheet Record"],
      rating: 4.7,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-orange-500 dark:text-blue-400">
          People
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {players.map((player) => (
            <PlayerCard3D setSelectedPlayer={setSelectedPlayer} player={player} index={player.id} />
          ))}
        </div>
      </div>
      {selectedPlayer && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <ScrollReveal direction="scale">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-orange-400/30 dark:border-cyan-400/30 shadow-2xl shadow-orange-500/20 dark:shadow-cyan-500/20 relative">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={selectedPlayer.image}
                    alt={selectedPlayer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedPlayer.position === 'Forward' ? 'from-red-500/20 to-orange-500/20' : selectedPlayer.position === 'Midfielder' ? 'from-green-500/20 to-emerald-500/20' : selectedPlayer.position === 'Defender' ? 'from-blue-500/20 to-cyan-500/20' : 'from-purple-500/20 to-pink-500/20'}`} />
                  
                  <button 
                    onClick={() => setSelectedPlayer(null)}
                    className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-500/80 transition-colors border border-gray-600 group"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  {/* Player rating */}
                  <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{selectedPlayer.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedPlayer.name}</h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${selectedPlayer.position === 'Forward' ? 'from-red-500 to-orange-500' : selectedPlayer.position === 'Midfielder' ? 'from-green-500 to-emerald-500' : selectedPlayer.position === 'Defender' ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'} text-white shadow-lg`}>
                        <Shield className="w-4 h-4 inline mr-2" />
                        {selectedPlayer.position}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex gap-4 mb-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          Age {selectedPlayer.age}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {selectedPlayer.nationality}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{selectedPlayer.bio}</p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlayer.achievements.map((achievement, index) => (
                        <span key={index} className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-400/30">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-500 dark:text-cyan-400" />
                      Season Statistics
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(selectedPlayer.stats).map(([key, value]) => (
                        <div key={key} className="text-center bg-gray-100/50 dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200/50 dark:border-gray-600 hover:border-orange-400/50 dark:hover:border-cyan-400/50 transition-all duration-300 group">
                          <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{value}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 capitalize mt-1">
                            {key === 'cleanSheets' ? 'Clean Sheets' : key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
    </section>
  );
};

export default People;
