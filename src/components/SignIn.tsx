import React, { useState } from 'react';
import { Mail, Lock, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const SignIn: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success('Welcome back!');
      } else {
        await signUp(email, password);
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);(
    <ScrollReveal
      direction="up"
      delay={200 + index * 100}
      playOnce={!revealTriggered.current}
      onReveal={() => {
        revealTriggered.current = true;
      }}
    >
      <div 
        className="group relative bg-white/90 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 border border-gray-200/50 dark:border-gray-700 hover:border-orange-400/50 dark:hover:border-cyan-400/50 hover:shadow-orange-500/20 dark:hover:shadow-cyan-500/20 cursor-pointer"
        onClick={() => openCollage(category)}
      >
        <div className="relative h-80 overflow-hidden">
          <img 
            src={category.coverImage}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* Category icon */}
          <div className="absolute top-4 left-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-lg border border-white/20`}>
              <category.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Image count badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-gray-600 flex items-center gap-1">
              <Camera className="w-4 h-4" />
              {category.images.length}
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10 dark:from-cyan-500/10 dark:to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-600/20 dark:from-cyan-500/20 dark:to-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-orange-400/30 dark:border-cyan-400/30 group-hover:scale-110 transition-transform">
              <Grid className="w-8 h-8 text-orange-500 dark:text-cyan-400" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-cyan-400 transition-colors">
            {category.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-orange-500 dark:text-cyan-400 font-semibold text-sm flex items-center gap-1">
              <Zap className="w-4 h-4" />
              View Collection
            </span>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500 text-xs">
              <Grid className="w-3 h-3" />
              {category.images.length} photos
            </div>
          </div>
        </div>
        
        {/* Card glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-600/5 dark:from-cyan-500/5 dark:to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </ScrollReveal>
  )
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-full font-semibold transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/25"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
