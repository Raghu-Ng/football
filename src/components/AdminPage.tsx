import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState('store');
  const [showJerseyModal, setShowJerseyModal] = useState(false);
  const [jerseys, setJerseys] = useState<any[]>([]);
  const [jerseyImages, setJerseyImages] = useState<File[]>([]);
  const [newJersey, setNewJersey] = useState<{
    name: string;
    price: string;
    description: string;
    category: string;
    sizes: string[];
    stock: string;
    image_urls: string[];
  }>({
    name: '',
    price: '',
    description: '',
    category: '',
    sizes: [],
    stock: '',
    image_urls: [],
  });
  const [allMatches, setAllMatches] = useState<Array<{ id?: number; opponent: string; score: string; match_date: string; competition: string; result?: string }>>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Array<{ id?: number; opponent: string; match_date: string; kickoff_time: string; competition: string; venue: string }>>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [newsTab, setNewsTab] = useState({
    title: '',
    content: '',
    imageFile: null as File | null,
    uploading: false,
    error: '',
    success: '',
    newsList: [] as any[],
    loading: false,
  });
  // Add modal state for matches
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchType, setMatchType] = useState<'all' | 'upcoming'>('all');
  const [newMatchModal, setNewMatchModal] = useState({
    opponent: '',
    score: '',
    match_date: '',
    competition: '',
    result: '',
    kickoff_time: '',
    venue: '',
    image_url: '',
    opponentLogoFile: null as File | null,
  });

  // Fetch jerseys from Supabase
  const fetchJerseys = async () => {
    const { data } = await supabase.from('jerseys').select('*').order('created_at', { ascending: false });
    setJerseys(data || []);
  };

  // Fetch all matches
  const fetchAllMatches = async () => {
    const { data } = await supabase.from('matches').select('*').order('match_date', { ascending: false });
    setAllMatches(data || []);
  };

  // Fetch upcoming matches
  const fetchUpcomingMatches = async () => {
    const { data } = await supabase.from('upcoming_matches').select('*').order('match_date', { ascending: true });
    setUpcomingMatches(data || []);
  };

  // Fetch news for admin view
  const fetchNewsList = async () => {
    setNewsTab((prev) => ({ ...prev, loading: true }));
    const { data } = await supabase.from('news').select('*').order('date_posted', { ascending: false });
    setNewsTab((prev) => ({ ...prev, newsList: data || [], loading: false }));
  };

  // Add news handler
  const handleAddNews = async () => {
    setNewsTab((prev) => ({ ...prev, uploading: true, error: '', success: '' }));
    let image_url = '';
    if (newsTab.imageFile) {
      // Upload image to Supabase Storage (images bucket, news/ folder)
      const fileExt = newsTab.imageFile.name.split('.').pop();
      const fileName = `news/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, newsTab.imageFile);
      if (uploadError) {
        console.error('Image upload error:', uploadError);
        setNewsTab((prev) => ({ ...prev, uploading: false, error: 'Image upload failed' }));
        return;
      }
      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
      image_url = publicUrlData?.publicUrl || '';
    }
    // Insert news row
    const { error: insertError } = await supabase.from('news').insert({
      title: newsTab.title,
      content: newsTab.content,
      image_url,
    });
    if (insertError) {
      setNewsTab((prev) => ({ ...prev, uploading: false, error: 'Failed to add news' }));
      return;
    }
    setNewsTab((prev) => ({ ...prev, uploading: false, success: 'News added!', title: '', content: '', imageFile: null }));
    fetchNewsList();
  };

  // Add Jersey handler (with up to 4 images)
  const handleAddJersey = async () => {
    let image_urls: string[] = [];
    for (const file of jerseyImages.slice(0, 4)) {
      const ext = file.name.split('.').pop();
      const fileName = `jerseys/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
        if (publicUrlData?.publicUrl) image_urls.push(publicUrlData.publicUrl);
      }
    }
    const jerseyToInsert = {
      ...newJersey,
      price: Number(newJersey.price),
      stock: Number(newJersey.stock),
      sizes: Array.isArray(newJersey.sizes) ? newJersey.sizes : [],
      image_urls,
    };
    const { error } = await supabase.from('jerseys').insert([jerseyToInsert]);
    if (!error) {
      setShowJerseyModal(false);
      setNewJersey({ name: '', price: '', description: '', category: '', sizes: [], stock: '', image_urls: [] });
      setJerseyImages([]);
      fetchJerseys();
    }
  };

  // Delete Jersey
  const handleDeleteJersey = async (id: number) => {
    await supabase.from('jerseys').delete().eq('id', id);
    fetchJerseys();
  };

  // Fetch transactions from Supabase
  const fetchTransactions = async () => {
    const { data } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
    setTransactions(data || []);
  };

  useEffect(() => {
    fetchJerseys();
    fetchTransactions();
    fetchAllMatches();
    fetchUpcomingMatches();
    fetchNewsList();
  }, []);

  // Add match handler
  const handleAddMatchModal = async () => {
    let matchImageUrl = '';
    if (newMatchModal.opponentLogoFile) {
      const ext = newMatchModal.opponentLogoFile.name.split('.').pop();
      const fileName = `matches/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, newMatchModal.opponentLogoFile);
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
        if (publicUrlData?.publicUrl) matchImageUrl = publicUrlData.publicUrl;
      }
    }
    if (matchType === 'all') {
      await supabase.from('matches').insert([
        {
          opponent: newMatchModal.opponent,
          score: newMatchModal.score,
          match_date: newMatchModal.match_date,
          competition: newMatchModal.competition,
          result: newMatchModal.result,
          image_url: matchImageUrl,
        },
      ]);
      fetchAllMatches();
    } else {
      await supabase.from('upcoming_matches').insert([
        {
          opponent: newMatchModal.opponent,
          match_date: newMatchModal.match_date,
          kickoff_time: newMatchModal.kickoff_time,
          competition: newMatchModal.competition,
          venue: newMatchModal.venue,
          image_url: matchImageUrl,
        },
      ]);
      fetchUpcomingMatches();
    }
    setShowMatchModal(false);
    setNewMatchModal({ opponent: '', score: '', match_date: '', competition: '', result: '', kickoff_time: '', venue: '', image_url: '', opponentLogoFile: null });
  };

  // Jersey sizes options
  const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Admin login handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const { data, error } = await supabase.from("admin").select("password").eq("email", loginEmail).single();
    if (error || !data) {
      setLoginError("Invalid email or password");
      return;
    }
    if (data.password !== loginPassword) {
      setLoginError("Invalid email or password");
      return;
    }
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form onSubmit={handleAdminLogin} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm border border-orange-400/30 dark:border-blue-400/30 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
            value={loginEmail}
            onChange={e => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            required
          />
          {loginError && <div className="text-red-500 text-sm text-center">{loginError}</div>}
          <button type="submit" className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold mt-2">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[200px] bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-orange-400/30 dark:border-blue-400/30">
        <h1 className="text-3xl font-bold mb-8 text-orange-500 dark:text-blue-400">Admin Panel</h1>
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab('store')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'store' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Store</button>
          <button onClick={() => setTab('allMatches')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'allMatches' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>All Matches</button>
          <button onClick={() => setTab('upcomingMatches')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'upcomingMatches' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Upcoming Matches</button>
          <button onClick={() => setTab('transactions')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'transactions' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Transactions</button>
          <button onClick={() => setTab('news')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'news' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>News</button>
        </div>
        {/* Store Tab */}
        {tab === 'store' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400">Jerseys</h2>
              <button onClick={() => setShowJerseyModal(true)} className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow">Add Jersey</button>
            </div>
            <table className="w-full mb-8">
              <thead>
                <tr className="bg-orange-100 dark:bg-blue-900">
                  <th className="p-2 text-left">Images</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Sizes</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Stock</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jerseys.map(j => (
                  <tr key={j.id} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2">
                      <div className="flex gap-2">
                        {j.image_urls && j.image_urls.map((url: string, idx: number) => (
                          <img key={idx} src={url} alt="jersey" className="w-12 h-12 object-cover rounded" />
                        ))}
                      </div>
                    </td>
                    <td className="p-2">{j.name}</td>
                    <td className="p-2">{j.description}</td>
                    <td className="p-2">{j.category}</td>
                    <td className="p-2">{Array.isArray(j.sizes) ? j.sizes.join(', ') : ''}</td>
                    <td className="p-2">${j.price}</td>
                    <td className="p-2">{j.stock}</td>
                    <td className="p-2">
                      <button onClick={() => handleDeleteJersey(j.id)} className="text-red-500 font-bold mr-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Add Jersey Modal */}
            {showJerseyModal && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-400/30 dark:border-blue-400/30">
                  <h3 className="text-xl font-bold mb-4 text-orange-500 dark:text-blue-400">Add New Jersey</h3>
                  <input type="text" placeholder="Name" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.name} onChange={e => setNewJersey({ ...newJersey, name: e.target.value })} />
                  <input type="text" placeholder="Description" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.description} onChange={e => setNewJersey({ ...newJersey, description: e.target.value })} />
                  <input type="text" placeholder="Category" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.category} onChange={e => setNewJersey({ ...newJersey, category: e.target.value })} />
                  <div className="mb-3">
                    <label className="block mb-1 font-semibold">Sizes</label>
                    <div className="flex gap-2 flex-wrap">
                      {SIZE_OPTIONS.map(size => (
                        <button
                          type="button"
                          key={size}
                          className={`px-3 py-1 rounded border font-semibold transition-colors ${newJersey.sizes.includes(size) ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'}`}
                          onClick={() => setNewJersey(j => ({ ...j, sizes: j.sizes.includes(size) ? j.sizes.filter(s => s !== size) : [...j.sizes, size] }))}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input type="number" placeholder="Price" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.price} onChange={e => setNewJersey({ ...newJersey, price: e.target.value })} />
                  <input type="number" placeholder="Stock" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.stock} onChange={e => setNewJersey({ ...newJersey, stock: e.target.value })} />
                  <div className="mb-3">
                    <label className="block mb-1 font-semibold">Upload Images (up to 4)</label>
                    <input type="file" accept="image/*" multiple max={4} onChange={e => setJerseyImages(e.target.files ? Array.from(e.target.files).slice(0,4) : [])} />
                    <div className="flex gap-2 mt-2">
                      {jerseyImages.map((file, idx) => (
                        <img key={idx} src={URL.createObjectURL(file)} alt="preview" className="w-12 h-12 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleAddJersey} className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold flex-1">Add</button>
                    <button onClick={() => { setShowJerseyModal(false); setJerseyImages([]); }} className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold flex-1">Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* All Matches Tab */}
        {tab === 'allMatches' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4">All Matches</h2>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => { setShowMatchModal(true); setMatchType('all'); }}
                className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow transition-colors duration-200 hover:bg-orange-600 dark:hover:bg-blue-600"
              >
                Add to All Matches
              </button>
            </div>
            {/*
              TODO: Add loading spinner or skeletons here
            */}
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100 dark:bg-blue-900">
                  <th className="p-2 text-left">Opponent</th>
                  <th className="p-2 text-left">Logo</th>
                  <th className="p-2 text-left">Score</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Competition</th>
                  <th className="p-2 text-left">Result</th>
                </tr>
              </thead>
              <tbody>
                {allMatches.map((match: any) => (
                  <tr key={match.id || match.opponent + match.score} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2">{match.opponent}</td>
                    <td className="p-2">{match.image_url && <img src={match.image_url} alt="logo" className="w-8 h-8 object-cover rounded" />}</td>
                    <td className="p-2">{match.score}</td>
                    <td className="p-2">{match.match_date}</td>
                    <td className="p-2">{match.competition}</td>
                    <td className="p-2">{match.result || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Upcoming Matches Tab */}
        {tab === 'upcomingMatches' && (
          <div>
            <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4">Upcoming Matches</h2>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => { setShowMatchModal(true); setMatchType('upcoming'); }}
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold"
              >
                Add to Upcoming Matches
              </button>
            </div>
            {/*
              TODO: Add loading spinner or skeletons here
            */}
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100 dark:bg-blue-900">
                  <th className="p-2 text-left">Opponent</th>
                  <th className="p-2 text-left">Logo</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Kickoff</th>
                  <th className="p-2 text-left">Competition</th>
                  <th className="p-2 text-left">Venue</th>
                </tr>
              </thead>
              <tbody>
                {upcomingMatches.map((match: any) => (
                  <tr key={match.id} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2">{match.opponent}</td>
                    <td className="p-2">{match.image_url && <img src={match.image_url} alt="logo" className="w-8 h-8 object-cover rounded" />}</td>
                    <td className="p-2">{match.match_date}</td>
                    <td className="p-2">{match.kickoff_time}</td>
                    <td className="p-2">{match.competition}</td>
                    <td className="p-2">{match.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Transactions Tab */}
        {tab === 'transactions' && (
          <div>
            <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4">Transactions</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100 dark:bg-blue-900">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Razorpay Payment ID</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2">{tx.id}</td>
                    <td className="p-2">{tx.razorpay_payment_id}</td>
                    <td className="p-2">₹{tx.amount}</td>
                    <td className="p-2">{tx.status}</td>
                    <td className="p-2">{tx.created_at ? new Date(tx.created_at).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* News Tab */}
        {tab === 'news' && (
          <div>
            <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4">Add News</h2>
            <div className="flex flex-col gap-3 mb-6">
              {/* Banner Image Upload */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-orange-400 dark:border-blue-400 rounded-xl p-6 cursor-pointer bg-orange-50/40 dark:bg-blue-900/40 mb-2 transition hover:bg-orange-100/60 dark:hover:bg-blue-800/60">
                {newsTab.imageFile ? (
                  <img
                    src={URL.createObjectURL(newsTab.imageFile)}
                    alt="Banner Preview"
                    className="w-full max-w-2xl h-48 object-cover rounded-lg mb-2 shadow"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 w-full max-w-2xl">
                    <span className="text-4xl text-orange-300 dark:text-blue-400 mb-2">🖼️</span>
                    <span className="text-gray-500 dark:text-gray-400">Click or drag to upload banner image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setNewsTab(prev => ({ ...prev, imageFile: e.target.files ? e.target.files[0] : null }))}
                />
              </label>
              <input type="text" placeholder="Title" className="p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newsTab.title} onChange={e => setNewsTab(prev => ({ ...prev, title: e.target.value }))} />
              <textarea placeholder="Content" className="p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white min-h-[100px]" value={newsTab.content} onChange={e => setNewsTab(prev => ({ ...prev, content: e.target.value }))} />
              <button onClick={handleAddNews} disabled={newsTab.uploading} className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold mt-2 disabled:opacity-60">{newsTab.uploading ? 'Uploading...' : 'Add News'}</button>
              {newsTab.error && <div className="text-red-500 text-sm">{newsTab.error}</div>}
              {newsTab.success && <div className="text-green-600 text-sm">{newsTab.success}</div>}
            </div>
            <h3 className="text-lg font-bold mb-2 text-orange-500 dark:text-blue-400">Recent News</h3>
            {newsTab.loading ? <div>Loading...</div> : (
              <ul className="space-y-2">
                {newsTab.newsList.map((n) => (
                  <li key={n.id} className="bg-orange-50 dark:bg-blue-900 rounded p-3 flex items-center gap-4">
                    {n.image_url && <img src={n.image_url} alt={n.title} className="w-16 h-16 object-cover rounded" />}
                    <div>
                      <div className="font-semibold">{n.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{n.content}</div>
                      <div className="text-xs text-gray-400">{n.date_posted ? new Date(n.date_posted).toLocaleString() : ''}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {/* Add Match Modal */}
        {showMatchModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-400/30 dark:border-blue-400/30">
              <h3 className="text-xl font-bold mb-4 text-orange-500 dark:text-blue-400">
                Add {matchType === 'all' ? 'All Match' : 'Upcoming Match'}
              </h3>
              <input type="text" placeholder="Opponent" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatchModal.opponent} onChange={e => setNewMatchModal({ ...newMatchModal, opponent: e.target.value })} />
              <div className="mb-3">
                <label className="block mb-1 font-semibold">Opponent Logo</label>
                <input type="file" accept="image/*" onChange={e => setNewMatchModal({ ...newMatchModal, opponentLogoFile: e.target.files ? e.target.files[0] : null })} />
                {newMatchModal.opponentLogoFile && (
                  <img src={URL.createObjectURL(newMatchModal.opponentLogoFile)} alt="logo preview" className="w-16 h-16 object-cover rounded mt-2" />
                )}
              </div>
              <input type="date" placeholder="Match Date" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatchModal.match_date} onChange={e => setNewMatchModal({ ...newMatchModal, match_date: e.target.value })} />
              <input type="text" placeholder="Competition" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatchModal.competition} onChange={e => setNewMatchModal({ ...newMatchModal, competition: e.target.value })} />
              {matchType === 'all' ? (
                <>
                  <input type="text" placeholder="Score (e.g. 2-1)" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatchModal.score} onChange={e => setNewMatchModal({ ...newMatchModal, score: e.target.value })} />
                  <input type="text" placeholder="Result (win/loss/draw)" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatchModal.result} onChange={e => setNewMatchModal({ ...newMatchModal, result: e.target.value })} />
                </>
              ) : (
                <>
                  <input type="time" placeholder="Kickoff Time" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatchModal.kickoff_time} onChange={e => setNewMatchModal({ ...newMatchModal, kickoff_time: e.target.value })} />
                  <input type="text" placeholder="Venue" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatchModal.venue} onChange={e => setNewMatchModal({ ...newMatchModal, venue: e.target.value })} />
                </>
              )}
              <div className="flex gap-2 mt-4">
                <button onClick={handleAddMatchModal} className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold flex-1">Add</button>
                <button onClick={() => { setShowMatchModal(false); setNewMatchModal({ opponent: '', score: '', match_date: '', competition: '', result: '', kickoff_time: '', venue: '', image_url: '', opponentLogoFile: null }); }} className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold flex-1">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
