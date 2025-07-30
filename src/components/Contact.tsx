import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Zap, Shield, Cpu } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: ['To Be added', 'Sports City, SC 12345']
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['Media@kodagufc.com']
    },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Insert message into Supabase
    const { error } = await supabase.from('messages').insert({
      name: form.firstName + ' ' + form.lastName,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
    });
    setLoading(false);
    if (error) {
      setError('Failed to send message. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 pb-32 bg-blue-50/30 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-yellow-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-400/20 to-blue-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full border border-blue-400/30 dark:border-cyan-400/30">
              <Cpu className="w-8 h-8 text-blue-500 dark:text-cyan-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-blue-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to start your football journey? Contact us today to learn more about our 
            <span className="text-blue-500 dark:text-cyan-400 font-semibold"> programs</span> and 
            <span className="text-blue-500 dark:text-blue-400 font-semibold"> facilities</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-500 dark:text-cyan-400" />
              Send us a message
            </h3>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <Shield className="w-16 h-16 text-blue-500 dark:text-cyan-400 mb-4" />
                <h4 className="text-xl font-bold mb-2 text-blue-500 dark:text-cyan-400">Thank you!</h4>
                <p className="text-gray-700 dark:text-gray-300">Your message has been received. We'll get back to you soon.</p>
              </div>
            ) : (
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
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="John"
                    requiblue
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
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Doe"
                    requiblue
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
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="john@example.com"
                  requiblue
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
                  requiblue
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
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white"
                  requiblue
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
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Tell us about your interest in United FC Kodagu..."
                  requiblue
                ></textarea>
              </div>
              {error && <div className="text-blue-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-cyan-500 dark:to-blue-600 hover:from-blue-400 hover:to-blue-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white py-3 px-6 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 dark:shadow-cyan-500/25"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>
            </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="space-y-8 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-blue-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 text-blue-500 dark:text-cyan-400 rounded-lg flex items-center justify-center border border-blue-400/30 dark:border-cyan-400/30">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;