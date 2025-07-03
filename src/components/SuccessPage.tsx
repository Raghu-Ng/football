import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, ArrowRight, Zap } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const SuccessPage = () => {
  const { dispatch } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Get session ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    setSessionId(sessionIdParam);

    // Clear cart after successful payment
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-cyan-400/30 relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/30">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Payment <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Successful!</span>
        </h1>
        
        <p className="text-gray-300 mb-6">
          Thank you for your purchase! Your order has been confirmed and you'll receive an email confirmation shortly.
        </p>

        {sessionId && (
          <div className="bg-gray-700 rounded-lg p-4 mb-6 border border-gray-600">
            <p className="text-sm text-gray-400 mb-1">Order Reference:</p>
            <p className="font-mono text-sm text-cyan-400 break-all">{sessionId}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-left bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full flex items-center justify-center border border-blue-400/30">
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-white">What's next?</p>
              <p className="text-sm text-gray-400">Your jerseys will be processed and shipped within 2-3 business days.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => scrollToSection('#store')}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <Zap size={16} />
            Continue Shopping
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={() => scrollToSection('#home')}
            className="w-full border border-gray-600 text-gray-300 hover:text-white hover:border-cyan-400 py-3 rounded-full font-semibold transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;