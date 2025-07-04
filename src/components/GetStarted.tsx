import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Here you would save the info to user profile or context
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gray-900 py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden border border-orange-400/30 dark:border-blue-400/30 p-8">
        <h2 className="text-2xl font-bold text-orange-500 dark:text-blue-400 mb-8">Get Started</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Please fill in your basic details to complete your profile.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
            <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
          </div>
          <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="p-3 rounded border w-full border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
            <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
            <input name="zip" value={form.zip} onChange={handleChange} required placeholder="ZIP Code" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-500 dark:to-cyan-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-blue-400 dark:hover:to-cyan-500 text-white py-3 px-8 rounded-full font-semibold transition-all shadow-lg shadow-orange-500/25 dark:shadow-blue-500/25 disabled:opacity-60">{loading ? 'Saving...' : 'Continue to Home'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
