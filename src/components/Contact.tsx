import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, Zap, Shield, Cpu } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: ['123 Football Avenue', 'Sports City, SC 12345']
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['info@elitefc.com', 'academy@elitefc.com']
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 6:00 PM']
    }
  ];

  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const { error } = await supabase.from('messages').insert([
      {
        name: form.firstName + ' ' + form.lastName,
        email: form.email,
        subject: form.subject,
        message: form.message
      }
    ]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    } else {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 pb-32 bg-orange-50/30 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-yellow-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full border border-orange-400/30 dark:border-cyan-400/30">
              <Cpu className="w-8 h-8 text-orange-500 dark:text-cyan-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get In <span className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to start your football journey? Contact us today to learn more about our 
            <span className="text-orange-500 dark:text-cyan-400 font-semibold"> programs</span> and 
            <span className="text-red-500 dark:text-blue-400 font-semibold"> facilities</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500 dark:text-cyan-400" />
              Send us a message
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="academy">Academy Registration</option>
                  <option value="tryouts">Tryout Information</option>
                  <option value="general">General Inquiry</option>
                  <option value="facilities">Facility Rental</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Tell us about your interest in United FC Kodagu..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>
              {success && (
                <div className="text-green-600 dark:text-green-400 mt-4 text-center font-semibold">Message sent successfully!</div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="space-y-8 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 text-orange-500 dark:text-cyan-400 rounded-lg flex items-center justify-center border border-orange-400/30 dark:border-cyan-400/30">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 dark:text-gray-400">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200/50 dark:bg-gray-800 h-64 rounded-2xl flex items-center justify-center border border-gray-300/50 dark:border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 text-orange-500 dark:text-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-4 border border-orange-400/30 dark:border-cyan-400/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">Interactive Map</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">123 Football Avenue, Sports City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;