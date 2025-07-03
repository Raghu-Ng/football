import React from 'react';
import { CheckCircle, Clock, Users, Star } from 'lucide-react';

const Academy = () => {
  const programs = [
    {
      title: 'Youth Development',
      age: '6-12 years',
      price: '$120/month',
      features: [
        'Basic skills training',
        'Fun-focused approach',
        '2 sessions per week',
        'Qualified coaches',
        'Equipment provided'
      ],
      popular: false
    },
    {
      title: 'Academy Elite',
      age: '13-18 years',
      price: '$200/month',
      features: [
        'Advanced tactical training',
        'Physical conditioning',
        '3 sessions per week',
        'Match opportunities',
        'Video analysis',
        'Nutrition guidance'
      ],
      popular: true
    },
    {
      title: 'Professional Prep',
      age: '16-21 years',
      price: '$350/month',
      features: [
        'Professional-level training',
        'Daily sessions available',
        'Scout networking',
        'Mental coaching',
        'Career guidance',
        'Trial opportunities'
      ],
      popular: false
    }
  ];

  const coaches = [
    {
      name: 'Marco Rodriguez',
      role: 'Head Coach',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      experience: '15 years coaching experience'
    },
    {
      name: 'Sarah Thompson',
      role: 'Youth Development',
      image: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      experience: 'Former international player'
    },
    {
      name: 'Carlos Martinez',
      role: 'Fitness Coach',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      experience: 'Sports science specialist'
    }
  ];

  return (
    <section id="academy" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Academy Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect program for your football journey. Our structured approach ensures every player reaches their potential.
          </p>
        </div>

        {/* Programs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {programs.map((program, index) => (
            <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-lg transition-transform hover:scale-105 ${
              program.popular ? 'ring-2 ring-blue-600' : ''
            }`}>
              {program.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.age}</p>
                <div className="text-4xl font-bold text-blue-600">{program.price}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full font-semibold transition-colors ${
                program.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                Register Now
              </button>
            </div>
          ))}
        </div>

        {/* Coaches */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Coaches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                <img 
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{coach.name}</h4>
                  <p className="text-blue-600 font-semibold mb-2">{coach.role}</p>
                  <p className="text-gray-600">{coach.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academy;