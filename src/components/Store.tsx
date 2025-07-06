import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Plus, Zap, Shield, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import ScrollReveal from './ScrollReveal';
import ParallaxSection from './ParallaxSection';
import { useNavigate } from 'react-router-dom';

interface Jersey {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
  sizes: string[];
  stock: number;
}

const Store = () => {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJersey, setSelectedJersey] = useState<Jersey | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { dispatch } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    supabase
      .from('jerseys')
      .select('*')
      .then(({ data, error }: { data: any; error: any }) => {
        if (error) {
          toast.error('Failed to load jerseys');
          setJerseys([]);
        } else {
          setJerseys(data || []);
        }
        setLoading(false);
      });
  }, []);

  const filteredJerseys = jerseys.slice(0, 3); // Show only 3 max

  const addToCart = (jersey: Jersey, size: string) => {
    if (!user && !authLoading) {
      navigate('/login');
      return;
    }
    if (!size) {
      toast.error('Please select a size');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${jersey.id}-${size}`,
        name: jersey.name,
        price: jersey.price,
        image_url: jersey.image_url,
        size,
        quantity: 1,
      },
    });

    toast.success('Added to cart!');
    setSelectedJersey(null);
    setSelectedSize('');
  };

  const handleProductClick = (jersey: Jersey) => {
    navigate(`/product/${jersey.id}`);
  };

  if (loading) {
    return (
      <section id="store" className="py-20 bg-orange-50/30 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 dark:border-cyan-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading jerseys...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="store" className="py-20 bg-orange-50/30 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-yellow-50/20 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10" />
      
      <ParallaxSection speed={0.2}>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </ParallaxSection>
      <ParallaxSection speed={0.3}>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </ParallaxSection>
      
      {/* Floating shopping elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <Sparkles className="w-6 h-6 text-orange-500 dark:text-cyan-400" />
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full border border-orange-400/30 dark:border-cyan-400/30 shadow-2xl shadow-orange-400/20 dark:shadow-cyan-400/20 relative group">
                <Shield className="w-8 h-8 text-orange-500 dark:text-cyan-400 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Official <span className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">Jerseys</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Show your United FC Kodagu pride with our premium collection of official jerseys. Each jersey is crafted with the 
              <span className="text-orange-500 dark:text-cyan-400 font-semibold"> highest quality materials</span> and cutting-edge technology.
            </p>
          </div>
        </ScrollReveal>

        {/* Enhanced Jerseys Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJerseys.map((jersey, index) => (
            <ScrollReveal key={jersey.id} direction="up" delay={300 + index * 100}>
              <div className="group bg-white/90 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 border border-gray-200/50 dark:border-gray-700 hover:border-orange-400/50 dark:hover:border-cyan-400/50 hover:shadow-orange-500/20 dark:hover:shadow-cyan-500/20 relative">
                <div className="relative overflow-hidden">
                  <img 
                    src={jersey.image_url}
                    alt={jersey.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {jersey.category}
                    </span>
                  </div>
                  {jersey.stock < 10 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse shadow-lg">
                        Low Stock
                      </span>
                    </div>
                  )}
                  
                  {/* Floating elements on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-600/20 dark:from-cyan-500/20 dark:to-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-orange-400/30 dark:border-cyan-400/30">
                        <Zap className="w-6 h-6 text-orange-500 dark:text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-cyan-400 transition-colors">{jersey.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">{jersey.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">${jersey.price}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(4.9)</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleProductClick(jersey)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-4 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25 group-hover:shadow-orange-400/40 dark:group-hover:shadow-cyan-400/40 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Zap size={16} className="group-hover:animate-pulse relative z-10" />
                    <span className="relative z-10">View Product</span>
                  </button>
                </div>
                
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-600/5 dark:from-cyan-500/5 dark:to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced Jersey Selection Modal - Reduced Size */}
        {selectedJersey && false && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <ScrollReveal direction="scale">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-orange-400/30 dark:border-cyan-400/30 shadow-2xl shadow-orange-500/20 dark:shadow-cyan-500/20 relative">
                <div className="relative">
                  <img 
                    src={selectedJersey.image_url}
                    alt={selectedJersey.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                  <button 
                    onClick={() => {
                      setSelectedJersey(null);
                      setSelectedSize('');
                    }}
                    className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-500/80 transition-colors border border-gray-600 group"
                  >
                    <Plus className="rotate-45 group-hover:rotate-90 transition-transform duration-300" size={20} />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedJersey.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{selectedJersey.description}</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">${selectedJersey?.price}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500 dark:text-cyan-400" />
                      Select Size:
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedJersey.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 border rounded-lg font-medium transition-all transform hover:scale-105 text-sm ${
                            selectedSize === size
                              ? 'bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white border-orange-400 dark:border-cyan-400 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-cyan-400 hover:text-orange-500 dark:hover:text-cyan-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(selectedJersey, selectedSize)}
                    disabled={!selectedSize}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white py-3 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <ShoppingCart size={20} className="relative z-10" />
                    <span className="relative z-10">Add to Cart - ${selectedJersey?.price}</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
};

export default Store;