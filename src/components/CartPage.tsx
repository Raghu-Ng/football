import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard } from 'lucide-react';

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gray-900 py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-orange-400/30 dark:border-cyan-400/30">
        {/* Cart Items Left */}
        <div className="md:w-1/2 flex flex-col p-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShoppingBag size={24} className="text-cyan-400" />
            Shopping Cart
          </h2>
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                <ShoppingBag size={32} className="text-cyan-400" />
              </div>
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-gray-600"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400">Size: {item.size}</p>
                    <p className="text-cyan-400 font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-600 text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-600 text-gray-400 hover:text-cyan-400 transition-colors"
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
        <div className="md:w-1/2 flex flex-col justify-center p-8 bg-gray-100 dark:bg-gray-900 border-l border-orange-400/20 dark:border-cyan-400/20">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h3>
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2 mb-8">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{item.name} (Size: {item.size}) x{item.quantity}</span>
                  <span className="text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-cyan-400">${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              disabled={state.items.length === 0}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50"
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
