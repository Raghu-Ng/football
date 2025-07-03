import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Zap, CreditCard, User, MapPin, Phone, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { stripePromise } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthRequired: () => void;
}

interface CheckoutInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onAuthRequired }) => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  if (!isOpen) return null;

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const handleInputChange = (field: keyof CheckoutInfo, value: string) => {
    setCheckoutInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateCheckoutInfo = () => {
    const required = ['email', 'firstName', 'lastName', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missing = required.filter(field => !checkoutInfo[field as keyof CheckoutInfo]);
    
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.join(', ')}`);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(checkoutInfo.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(checkoutInfo.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!validateCheckoutInfo()) {
      return;
    }

    setLoading(true);

    try {
      // Create order in Supabase with complete information
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: state.total,
          total_calories: 0,
          status: 'pending',
          delivery_address: checkoutInfo.address,
          city: checkoutInfo.city,
          pincode: checkoutInfo.zipCode,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('Failed to create order');
      }

      // Create order items
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        pizza_name: item.name,
        pizza_size: item.size,
        crust: 'Standard',
        sauce: 'Standard',
        toppings: JSON.stringify([]),
        quantity: item.quantity,
        price: item.price,
        calories: 0,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items error:', itemsError);
        throw new Error('Failed to create order items');
      }

      // Create Stripe checkout session via Supabase Edge Function
      const { data: supabaseData } = await supabase.auth.getSession();
      const token = supabaseData.session?.access_token;

      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: order.id,
          items: state.items,
          customerInfo: checkoutInfo,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Checkout session error:', errorText);
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error('No session ID received');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe redirect error:', error);
          toast.error('Payment failed. Please try again.');
        }
      } else {
        throw new Error('Stripe not loaded');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const proceedToCheckout = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    setShowCheckout(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-end z-50">
      <div className="bg-gray-800 h-full w-full max-w-md shadow-2xl border-l border-cyan-400/30 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag size={24} className="text-cyan-400" />
            {showCheckout ? 'Checkout' : 'Shopping Cart'}
          </h2>
          <button
            onClick={() => {
              setShowCheckout(false);
              onClose();
            }}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!showCheckout ? (
            // Cart View
            <div className="p-6">
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
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-600 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Checkout Form
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        value={checkoutInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        value={checkoutInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={checkoutInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="tel"
                        value={checkoutInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={checkoutInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        value={checkoutInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                      <input
                        type="text"
                        value={checkoutInfo.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="NY"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={checkoutInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="10001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                      <select
                        value={checkoutInfo.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-3">Order Summary</h4>
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.name} (Size: {item.size}) x{item.quantity}</span>
                      <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total:</span>
                      <span className="text-cyan-400">${state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-700 p-6">
          {!showCheckout ? (
            state.items.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ${state.total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </button>
              </div>
            )
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 disabled:opacity-50"
              >
                <Zap size={20} />
                {loading ? 'Processing...' : `Complete Order - $${state.total.toFixed(2)}`}
              </button>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-full border border-gray-600 text-gray-300 hover:text-white hover:border-cyan-400 py-3 rounded-full font-semibold transition-all"
              >
                Back to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;