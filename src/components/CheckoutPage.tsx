import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
// @ts-ignore
import { loadRazorpayScript } from '../../public/razorpay.js';

const CheckoutPage: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      setForm((prev) => ({ ...prev, email: user.email || '' }));
      // Fetch profile details
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        if (data) {
          setForm((prev) => ({
            ...prev,
            firstName: data.name?.split(' ')[0] || '',
            lastName: data.name?.split(' ').slice(1).join(' ') || '',
            phone: data.phone || '',
            address: data.default_address || '',
            city: data.city || '',
            zipCode: data.pincode || '',
          }));
        }
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRazorpay = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      console.error('Razorpay SDK failed to load.');
      return;
    }
    const options = {
      key: 'rzp_test_BUPmwKeaWpaWM3', // Use your Razorpay test key here
      amount: state.total * 100, // in paise
      currency: 'INR',
      name: 'United FC Kodagu',
      description: 'Order Payment',
      handler: async function (response: any) {
        // Save order to Supabase
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([{
            user_id: user?.id || null,
            razorpay_order_id: response.razorpay_order_id || null,
            razorpay_payment_id: response.razorpay_payment_id,
            status: 'paid',
            total_amount: state.total,
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            zip_code: form.zipCode,
            items: state.items,
          }])
          .select()
          .single();

        if (orderError) {
          console.error('Order save error:', orderError);
          // alert('Order save failed!');
          return;
        }

        // Save transaction to Supabase
        await supabase
          .from('transactions')
          .insert([{
            order_id: order.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || null,
            amount: state.total,
            currency: 'INR',
            status: 'success',
            payment_method: 'razorpay',
          }]);

        console.log('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        navigate('/success');
      },
      prefill: {
        name: form.firstName + ' ' + form.lastName,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: form.address + ', ' + form.city + ', ' + form.zipCode,
      },
      theme: {
        color: '#f97316',
      },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gray-900 py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-orange-400/30 dark:border-blue-400/30">
        {/* Checkout Form Left */}
        <div className="md:w-1/2 flex flex-col p-8 gap-4">
          <h2 className="text-2xl font-bold text-orange-500 dark:text-blue-400 mb-8">Checkout</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First Name" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
              <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last Name" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
            </div>
            <input name="email" value={form.email} disabled required type="email" placeholder="Email" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300 w-full" />
            <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="Phone" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300 w-full" />
            <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="p-3 rounded border w-full border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
              <input name="zipCode" value={form.zipCode} onChange={handleChange} required placeholder="ZIP Code" className="p-3 rounded border border-orange-300 dark:border-blue-500 bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white placeholder-orange-300 dark:placeholder-blue-300" />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleRazorpay}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-500 dark:to-cyan-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-blue-400 dark:hover:to-cyan-500 text-white py-3 px-8 rounded-full font-semibold transition-all shadow-lg shadow-orange-500/25 dark:shadow-blue-500/25 mt-6"
              >
                Pay with Razorpay
              </button>
            </div>
          </form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
