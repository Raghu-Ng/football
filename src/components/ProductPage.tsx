import React, { useState } from 'react';
import { ShoppingCart, Zap, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

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

// This should be replaced with a fetch from context or API in a real app
import { mockJerseys } from './mockJerseys';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const jersey = mockJerseys.find(j => j.id === id);
  const [selectedSize, setSelectedSize] = useState('');

  if (!jersey) return <div className="text-center py-20">Product not found.</div>;

  const addToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${jersey.id}-${selectedSize}`,
        name: jersey.name,
        price: jersey.price,
        image_url: jersey.image_url,
        size: selectedSize,
        quantity: 1,
      },
    });
    toast.success('Added to cart!');
    navigate('/store');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gray-900 py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-orange-400/30 dark:border-cyan-400/30">
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
          <img src={jersey.image_url} alt={jersey.name} className="w-full h-auto max-h-96 object-contain rounded-xl" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{jersey.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">{jersey.description}</p>
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-current" />
            ))}
            <span className="text-sm text-gray-500 dark:text-gray-400">(4.9)</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">${jersey.price}</div>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500 dark:text-cyan-400" />
              Select Size:
            </h4>
            <div className="flex flex-wrap gap-2">
              {jersey.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 border rounded-lg font-medium transition-all text-sm ${selectedSize === size ? 'bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 text-white border-orange-400 dark:border-cyan-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-cyan-400 hover:text-orange-500 dark:hover:text-cyan-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={addToCart}
            disabled={!selectedSize}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white py-3 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
