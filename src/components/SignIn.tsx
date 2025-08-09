import React, { useState } from 'react';
import { Mail, Lock, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success('Welcome back!');
        navigate('/');
      } else {
        await signUp(email, password);
        toast.success('Account created successfully!');
        navigate('/get-started');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-orange-400/30 dark:border-blue-400/30 shadow-2xl shadow-orange-500/20 dark:shadow-blue-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-500 dark:text-blue-400" />
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-orange-500 dark:text-blue-400 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 dark:text-blue-300" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-orange-50 dark:bg-blue-900 border border-orange-300 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-orange-400 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-orange-500 dark:text-blue-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 dark:text-blue-300" size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-orange-50 dark:bg-blue-900 border border-orange-300 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-orange-400 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-500 dark:to-cyan-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-blue-400 dark:hover:to-cyan-500 text-white py-3 rounded-full font-semibold transition-all disabled:opacity-50 shadow-lg shadow-orange-500/25 dark:shadow-blue-500/25"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-orange-500 dark:text-blue-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-orange-500 dark:text-blue-400 font-semibold hover:text-orange-400 dark:hover:text-blue-300 transition-colors"
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
