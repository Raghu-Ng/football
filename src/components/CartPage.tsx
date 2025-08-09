import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gray-900 py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-orange-400/30 dark:border-blue-400/30">
        {/* Cart Items Left */}
        <div className="md:w-1/2 flex flex-col p-8 gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShoppingBag size={24} className="text-orange-500 dark:text-blue-400" />
            Shopping Cart
          </h2>
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-blue-400/20 dark:to-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-400/30 dark:border-blue-400/30">
                <ShoppingBag size={32} className="text-orange-500 dark:text-blue-400" />
              </div>
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-blue-900 rounded-lg border border-orange-300 dark:border-blue-500">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-orange-200 dark:border-blue-400"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-orange-500 dark:text-blue-300">Size: {item.size}</p>
                    <p className="font-semibold text-orange-600 dark:text-blue-400">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-orange-200 dark:hover:bg-blue-700 text-orange-500 dark:text-blue-300 hover:text-orange-700 dark:hover:text-blue-400 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-orange-200 dark:hover:bg-blue-700 text-orange-500 dark:text-blue-300 hover:text-orange-700 dark:hover:text-blue-400 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Order Summary Right */}
        <div className="md:w-1/2 flex flex-col justify-center p-8 bg-orange-50 dark:bg-blue-900 border-l border-orange-400/20 dark:border-blue-400/20">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h3>
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2 mb-8">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-blue-200">{item.name} (Size: {item.size}) x{item.quantity}</span>
                  <span className="text-orange-600 dark:text-blue-400">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-orange-300 dark:border-blue-500 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-orange-600 dark:text-blue-400">${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => { navigate('/checkout'); window.scrollTo(0, 0); }}
              disabled={state.items.length === 0}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-500 dark:to-cyan-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-blue-400 dark:hover:to-cyan-500 text-white py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 dark:shadow-blue-500/25 disabled:opacity-50"
            >
              <CreditCard size={20} />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
