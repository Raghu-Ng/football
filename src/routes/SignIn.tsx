import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if(supabase.auth.currentUser) {
      setLoading(false);
      navigate('/newhome');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      console.error('Sign in error:', error);
    } else {
      navigate('/newhome');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-primary font-bold text-4xl mb-12">Sign In</h1>
      <form onSubmit={handleSignIn} className="flex flex-col gap-6 w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-400 px-6 py-4 text-lg font-medium bg-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-400 px-6 py-4 text-lg font-medium bg-white focus:outline-none"
        />
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-4 font-semibold text-lg"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
