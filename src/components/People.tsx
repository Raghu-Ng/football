import React, { useState } from 'react';
import { X, MapPin, Calendar, Zap, Shield, Target, Star, Trophy, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import ParallaxSection from './ParallaxSection';

const People = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const players = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'Forward',
      age: 19,
      nationality: 'USA',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Rising star with exceptional pace and finishing ability. Joined our academy at 14 and has shown tremendous growth.',
      stats: { goals: 24, assists: 8, appearances: 32 },
      achievements: ['Top Scorer 2023', 'Player of the Month'],
      rating: 4.8
    },
    {
      id: 2,
      name: 'Maria Santos',
      position: 'Midfielder',
      age: 17,
      nationality: 'Brazil',
      image: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Creative playmaker with excellent vision and passing range. Captain of our U18 team.',
      stats: { goals: 12, assists: 18, appearances: 28 },
      achievements: ['Team Captain', 'Best Playmaker'],
      rating: 4.9
    },
    {
      id: 3,
      name: 'James Wilson',
      position: 'Defender',
      age: 20,
      nationality: 'England',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Solid defender with leadership qualities. Currently training with professional clubs.',
      stats: { goals: 3, assists: 5, appearances: 35 },
      achievements: ['Defensive Player of Year', 'Clean Sheet Record'],
      rating: 4.7
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-orange-500 dark:text-blue-400">People</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {players.map((player) => (
            <div key={player.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700">
              <img src={player.image} alt={player.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{player.name}</h2>
                <div className="text-orange-500 dark:text-cyan-400 font-semibold mb-1">{player.position}</div>
                <div className="text-gray-600 dark:text-gray-300 mb-2">{player.bio}</div>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span><MapPin size={16} className="inline mr-1" />{player.nationality}</span>
                  <span><Calendar size={16} className="inline mr-1" />Age: {player.age}</span>
                </div>
                <div className="flex gap-2 text-xs text-gray-400">
                  {player.achievements.map((ach, i) => (
                    <span key={i} className="bg-orange-100 dark:bg-blue-900 px-2 py-1 rounded-full">{ach}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default People;
