import React, { useState } from 'react';
import { X, Crown, Handshake, Trophy, Target, Users, Star, Building, Mail, Phone, Globe, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { loadRazorpayScript } from '../../public/razorpay.js';

interface SponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SponsorshipForm {
  sponsorType: 'company' | 'individual';
  companyName: string;
  fullName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  sponsorshipType: string;
  budget: string;
  duration: string;
  goals: string;
  message: string;
}

const SponsorshipModal: React.FC<SponsorshipModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SponsorshipForm>({
    sponsorType: 'company',
    companyName: '',
    fullName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    sponsorshipType: '',
    budget: '',
    duration: '',
    goals: '',
    message: ''
  });

  if (!isOpen) return null;

  const sponsorshipTypes = [
    {
      id: 'title',
      name: 'Title Sponsor',
      price: '$50,000+',
      benefits: ['Stadium naming rights', 'Logo on all jerseys', 'VIP hospitality', 'Media coverage'],
      icon: Crown,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'jersey',
      name: 'Jersey Sponsor',
      price: '$25,000+',
      benefits: ['Front jersey logo', 'Training kit branding', 'Social media features', 'Match day presence'],
      icon: Trophy,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'equipment',
      name: 'Equipment Partner',
      price: '$15,000+',
      benefits: ['Equipment branding', 'Training ground signage', 'Player endorsements', 'Youth programs'],
      icon: Target,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'community',
      name: 'Community Partner',
      price: '$5,000+',
      benefits: ['Community events', 'Youth academy support', 'Local marketing', 'Grassroots programs'],
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Automotive', 'Real Estate',
    'Food & Beverage', 'Retail', 'Manufacturing', 'Energy', 'Education',
    'Entertainment', 'Sports & Fitness', 'Other'
  ];

  const budgetRanges = [
    '$5,000 - $15,000', '$15,000 - $25,000', '$25,000 - $50,000',
    '$50,000 - $100,000', '$100,000+', 'Custom Package'
  ];

  const durations = [
    '1 Season', '2 Seasons', '3 Seasons', '5 Seasons', 'Long-term Partnership'
  ];

  const handleInputChange = (field: keyof SponsorshipForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (formData.sponsorType === 'company') {
          return formData.companyName && formData.contactName && formData.email && formData.phone;
        } else {
          return formData.fullName && formData.email && formData.phone;
        }
      case 2:
        return formData.sponsorshipType && formData.budget && formData.duration;
      case 3:
        return formData.goals && formData.message;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleRazorpayPayment = async () => {
    // Load Razorpay script if not already loaded
    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      toast.error('Failed to load Razorpay. Please try again.');
      return;
    }
    // Calculate amount (use budget or a fixed value for demo)
    const amount = Number(formData.budget.replace(/[^\d]/g, '')) || 5000;
    const options = {
      key: 'rzp_test_BUPmwKeaWpaWM3', // Replace with your Razorpay test key
      amount: amount * 100, // in paise
      currency: 'INR',
      name: 'United FC Kodagu',
      description: 'Sponsorship Payment',
      handler: async function (response: any) {
        // Insert sponsorship application
        const { data: appData, error: appError } = await supabase.from('sponsorship_applications').insert({
          company_name: formData.companyName,
          contact_name: formData.contactName || formData.fullName,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          industry: formData.industry,
          sponsorship_type: formData.sponsorshipType,
          budget: formData.budget,
          duration: formData.duration,
          goals: formData.goals,
          message: formData.message,
        }).select().single();
        // Insert transaction
        await supabase.from('transactions').insert({
          razorpay_payment_id: response.razorpay_payment_id,
          amount: amount,
          currency: 'INR',
          status: 'success',
          sponsorship_application_id: appData?.id || null,
        });
        setCurrentStep(4);
        toast.success('Sponsorship application submitted and payment successful!');
      },
      prefill: {
        name: formData.companyName || formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: '#f59e42' },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast.error('Please complete all required fields');
      return;
    }
    setLoading(true);
    try {
      await handleRazorpayPayment();
    } catch (error) {
      console.log(error)
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      sponsorType: 'company',
      companyName: '',
      fullName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      industry: '',
      sponsorshipType: '',
      budget: '',
      duration: '',
      goals: '',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-400/30 shadow-2xl shadow-blue-500/20 relative">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Become a Sponsor</h2>
                <p className="text-gray-400">Partner with United FC Kodagu and grow together</p>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-400" />
                  Sponsor Information
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">I am a *</label>
                  <select
                    value={formData.sponsorType}
                    onChange={e => handleInputChange('sponsorType', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                  >
                    <option value="company">Company</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.sponsorType === 'company' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={e => handleInputChange('companyName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Your Company Name"
                        required={formData.sponsorType === 'company'}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={e => handleInputChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Your Full Name"
                        required={formData.sponsorType === 'individual'}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name {formData.sponsorType === 'company' ? '*' : '(Optional)'}</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={e => handleInputChange('contactName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Contact Person (if different)"
                      required={formData.sponsorType === 'company'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website (Optional)</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={e => handleInputChange('website', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Industry (Optional)</label>
                    <select
                      value={formData.industry}
                      onChange={e => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-blue-400" />
                  Sponsorship Package
                </h3>
                
                {/* Sponsorship Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {sponsorshipTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handleInputChange('sponsorshipType', type.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.sponsorshipType === type.id
                          ? 'border-blue-400 bg-blue-400/10'
                          : 'border-gray-600 hover:border-blue-400/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center`}>
                          <type.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{type.name}</h4>
                          <p className="text-blue-400 font-bold">{type.price}</p>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {type.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                            <Star className="w-3 h-3 text-blue-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                        required
                      >
                        <option value="">Select Budget Range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Partnership Duration *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <select
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                        required
                      >
                        <option value="">Select Duration</option>
                        {durations.map((duration) => (
                          <option key={duration} value={duration}>{duration}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Partnership Goals & Message
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Partnership Goals *</label>
                    <textarea
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="What do you hope to achieve through this partnership? (e.g., brand awareness, community engagement, customer acquisition)"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Tell us more about your company and why you'd like to partner with United FC Kodagu..."
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Thank you for your interest in partnering with United FC Kodagu. Our sponsorship team will review your application and contact you within 2-3 business days.
              </p>
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-white mb-2">What's Next?</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Application review by our sponsorship team</li>
                  <li>• Initial consultation call to discuss your goals</li>
                  <li>• Custom sponsorship proposal creation</li>
                  <li>• Contract finalization and partnership launch</li>
                </ul>
              </div>
              <button
                onClick={resetForm}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {currentStep < 4 && (
          <div className="border-t border-gray-700 p-6">
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 hover:text-blue-400"
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-full font-semibold transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-full font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Handshake size={16} />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorshipModal;