import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/home');
    } catch (err: any) {
      setError(err.message || `Unexpected error during ${isSignUp ? 'sign up' : 'sign in'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-primary font-bold text-4xl mb-12">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleAuth} className="flex flex-col gap-6 w-full max-w-md">
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
        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="border border-gray-400 px-6 py-4 text-lg font-medium bg-white focus:outline-none"
          />
        )}
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-4 font-semibold text-lg"
          disabled={loading}
        >
          {loading ? (isSignUp ? 'Signing up...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
        <div className="text-center mt-2">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button type="button" className="text-primary underline" onClick={() => { setIsSignUp(false); setConfirmPassword(''); }}>
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button type="button" className="text-primary underline" onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
