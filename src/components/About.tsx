import React from 'react';
import { Award, Users, Trophy, Target, Zap, Shield, Cpu } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import ParallaxSection from './ParallaxSection';

const About = () => {
  const stats = [
    { icon: <Trophy className="w-8 h-8" />, number: '150+', label: 'Championships Won' },
    { icon: <Users className="w-8 h-8" />, number: '500+', label: 'Active Players' },
    { icon: <Award className="w-8 h-8" />, number: '25', label: 'Years of Excellence' },
    { icon: <Target className="w-8 h-8" />, number: '100+', label: 'Professional Players' }
  ];

  return (
    <section id="about" className="py-20 bg-orange-50/30 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-yellow-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />
      
      <ParallaxSection speed={0.2}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </ParallaxSection>
      <ParallaxSection speed={0.3}>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
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
              animationDuration: `${8 + Math.random() * 4}s`
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
              About <span className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">United FC Kodagu</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Founded in 1999, United FC Kodagu has been at the forefront of developing world-class football talent through 
              <span className="text-orange-500 dark:text-cyan-400 relative group">
                {' '}innovative training methods
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 dark:from-cyan-400 dark:to-blue-500 group-hover:w-full transition-all duration-300" />
              </span> and unwavering commitment to excellence.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left" delay={200}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-orange-500 dark:text-cyan-400" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We believe that every player has the potential for greatness. Our comprehensive approach combines 
                <span className="text-orange-500 dark:text-cyan-400 font-semibold"> technical skill development</span>, tactical understanding, 
                physical conditioning, and mental resilience to create complete footballers.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                From grassroots to professional level, we provide a pathway for ambitious players to achieve their dreams 
                while instilling values of <span className="text-red-500 dark:text-blue-400 font-semibold">teamwork</span>, 
                <span className="text-yellow-500 dark:text-purple-400 font-semibold"> respect</span>, and 
                <span className="text-orange-500 dark:text-cyan-400 font-semibold"> dedication</span>.
              </p>
              <button className="group bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="flex items-center gap-2 relative z-10">
                  Learn More About Us
                  <Cpu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </button>
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
                <p className="text-orange-100 dark:text-cyan-100">Years of Excellence</p>
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 dark:from-purple-400/30 dark:to-pink-500/30 rounded-full animate-pulse" />
              <div className="absolute top-1/2 -left-2 w-6 h-6 bg-gradient-to-r from-orange-400/30 to-red-500/30 dark:from-cyan-400/30 dark:to-blue-500/30 rounded-full animate-bounce" />
            </div>
          </ScrollReveal>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} direction="up" delay={600 + index * 100}>
              <div className="text-center group relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 text-orange-500 dark:text-cyan-400 rounded-2xl mb-4 border border-orange-400/30 dark:border-cyan-400/30 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10">{stat.icon}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{stat.label}</div>
                
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-600/5 dark:from-cyan-500/5 dark:to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      {/* Wins & Upcoming Matches Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Matches */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Upcoming Matches</h3>
            <div className="flex flex-col gap-6">
              {[{team2: 'Challengers FC', date: 'WED JUL 23', comp: 'CLUB FRIENDLIES', kickoff: '12:30', venue: 'National Stadium', time: '19:30 Local Time'}, {team2: 'Future Stars', date: 'FRI JUL 30', comp: 'PREMIER LEAGUE', kickoff: '18:00', venue: 'Stadium C', time: '21:00 Local Time'}].map((match, i) => (
                <div key={i} className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-red-500">
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{match.date}</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{match.comp}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">KICKOFF - {match.kickoff}</span>
                        <span className="text-xs text-gray-500">{match.venue}</span>
                      </div>
                      <div className="flex justify-center items-center gap-2 my-4">
                        <span className="font-bold text-gray-700 dark:text-gray-200">United FC Kodagu</span>
                        <span className="text-xl font-bold text-gray-500">vs</span>
                        <span className="font-bold text-gray-700 dark:text-gray-200">{match.team2}</span>
                      </div>
                      <div className="flex justify-center">
                        <span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">{match.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Wins */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recent Wins</h3>
            <div className="flex flex-col gap-6">
              {[{team2: 'Rivals FC', score: '3-1', date: 'SUN MAY 25', comp: 'PREMIER LEAGUE', kickoff: '16:00', venue: 'Stadium A'}, {team2: 'Legends United', score: '2-0', date: 'SAT MAY 17', comp: 'PREMIER LEAGUE', kickoff: '18:00', venue: 'Stadium B'}].map((win, i) => (
                <div key={i} className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-red-500">
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{win.date}</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{win.comp}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">KICKOFF - {win.kickoff}</span>
                        <span className="text-xs text-gray-500">{win.venue}</span>
                      </div>
                      <div className="flex justify-center items-center gap-2 my-4">
                        <span className="font-bold text-gray-700 dark:text-gray-200">United FC Kodagu</span>
                        <span className="text-2xl font-extrabold text-red-500">{win.score}</span>
                        <span className="font-bold text-gray-700 dark:text-gray-200">{win.team2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* End Wins & Upcoming Matches Section */}
    </section>
  );
};

export default About;