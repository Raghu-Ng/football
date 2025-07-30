import React from "react";
import { Users, Star, Shield, Target, Award } from "lucide-react";
import {motion} from "framer-motion"

const programs = [
  {
    title: "Youth Development",
    icon: Users,
    description: "Skill-building and fun for ages 6-12.",
  },
  {
    title: "Academy Elite",
    icon: Star,
    description: "Advanced training for ages 13-18.",
  },
  {
    title: "Professional Prep",
    icon: Award,
    description: "Pro-level coaching for ages 16-21.",
  },
  {
    title: "Summer Camps",
    icon: Shield,
    description: "Seasonal camps for all skill levels.",
  },
  {
    title: "Goalkeeper Academy",
    icon: Target,
    description: "Specialized training for goalkeepers.",
  },
];

const ClubProgramsSection = () => (
  <section id="club-programs" className="py-6 bg-white dark:bg-gray-900">
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="mb-4 text-left">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Our Programs
        </h2>
        <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
          A pathway for every player, from beginners to aspiring professionals.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {programs.map((program, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            key={program.title}
            className="flex flex-col h-[200px]  py-12 items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow border border-gray-200 dark:border-gray-700 min-h-[110px]"
          >
            <program.icon className="w-6 h-6 text-orange-500 dark:text-cyan-400 mb-1 mt-6" />
            <div className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-0.5 mt-auto">
              {program.title}
            </div>
            <div className="text-lg text-gray-500 dark:text-gray-400 text-center leading-tight mb-4">
              {program.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ClubProgramsSection;
