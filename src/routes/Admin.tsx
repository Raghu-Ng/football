import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const Admin = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tabs
  const [tab, setTab] = useState('store');

  // Jerseys
  const [showJerseyModal, setShowJerseyModal] = useState(false);
  const [jerseys, setJerseys] = useState<any[]>([]);
  const [jerseyImages, setJerseyImages] = useState<File[]>([]);  const [newJersey, setNewJersey] = useState<{
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

  // Matches
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
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
    match_center: '',
    opponentLogoFile: null as File | null,
  });

  // Transactions
  const [transactions, setTransactions] = useState<any[]>([]);

  // News
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

  // Fetchers
  const fetchJerseys = async () => {
    const { data } = await supabase.from('jerseys').select('*').order('created_at', { ascending: false });
    setJerseys(data || []);
  };
  const fetchAllMatches = async () => {
    const { data } = await supabase.from('matches').select('*').order('match_date', { ascending: false });
    setAllMatches(data || []);
  };
  const fetchUpcomingMatches = async () => {
    const { data } = await supabase.from('upcoming_matches').select('*').order('match_date', { ascending: true });
    setUpcomingMatches(data || []);
  };
  const fetchTransactions = async () => {
    const { data } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
    setTransactions(data || []);
  };
  const fetchNewsList = async () => {
    setNewsTab((prev) => ({ ...prev, loading: true }));
    const { data } = await supabase.from('news').select('*').order('date_posted', { ascending: false });
    setNewsTab((prev) => ({ ...prev, newsList: data || [], loading: false }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJerseys();
      fetchTransactions();
      fetchAllMatches();
      fetchUpcomingMatches();
      fetchNewsList();
    }
  }, [isAuthenticated]);

  const handleDeleteMatch = async (id: number, type: 'all' | 'upcoming') => {
    if (type === 'all') {
      await supabase.from('matches').delete().eq('id', id);
      fetchAllMatches();
    } else {
      await supabase.from('upcoming_matches').delete().eq('id', id);
      fetchUpcomingMatches();
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    await supabase.from('transactions').delete().eq('id', id);
    fetchTransactions();
  };

  const handleDeleteNews = async (id: number) => {
    await supabase.from('news').delete().eq('id', id);
    fetchNewsList();
  };

  // Auth handler
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

  // Jersey CRUD
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
  const handleDeleteJersey = async (id: number) => {
    await supabase.from('jerseys').delete().eq('id', id);
    fetchJerseys();
  };

  // Match CRUD
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
          match_center: newMatchModal.match_center,
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
    setNewMatchModal({ opponent: '', score: '', match_date: '', competition: '', result: '', kickoff_time: '', venue: '', image_url: '', match_center: '', opponentLogoFile: null });
  };

  // News CRUD
  const handleAddNews = async () => {
    setNewsTab((prev) => ({ ...prev, uploading: true, error: '', success: '' }));
    let image_url = '';
    if (newsTab.imageFile) {
      const fileExt = newsTab.imageFile.name.split('.').pop();
      const fileName = `news/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, newsTab.imageFile);
      if (uploadError) {
        setNewsTab((prev) => ({ ...prev, uploading: false, error: 'Image upload failed' }));
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
      image_url = publicUrlData?.publicUrl || '';
    }
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

  // Auth UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <form onSubmit={handleAdminLogin} className="bg-white p-8 w-full max-w-sm border border-primary flex flex-col gap-4">
          <h2 className="text-xl font-bold text-primary mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-primary text-gray-900 bg-white"
            value={loginEmail}
            onChange={e => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-primary text-gray-900 bg-white"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            required
          />
          {loginError && <div className="text-red-500 text-sm text-center">{loginError}</div>}
          <button type="submit" className="bg-primary text-white px-4 py-2 w-full font-semibold mt-2">Login</button>
        </form>
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen bg-white px-[5vw] py-16">
      <h1 className="text-primary font-bold text-4xl mb-12">Admin Dashboard</h1>
      <div className="flex gap-8 mb-8">
        <button onClick={() => setTab('store')} className={`px-6 py-3 font-semibold bg-primary text-white border-none ${tab === 'store' ? '' : 'opacity-60'}`}>Store</button>
        <button onClick={() => setTab('allMatches')} className={`px-6 py-3 font-semibold bg-primary text-white border-none ${tab === 'allMatches' ? '' : 'opacity-60'}`}>All Matches</button>
        <button onClick={() => setTab('upcomingMatches')} className={`px-6 py-3 font-semibold bg-primary text-white border-none ${tab === 'upcomingMatches' ? '' : 'opacity-60'}`}>Upcoming Matches</button>
        <button onClick={() => setTab('transactions')} className={`px-6 py-3 font-semibold bg-primary text-white border-none ${tab === 'transactions' ? '' : 'opacity-60'}`}>Transactions</button>
        <button onClick={() => setTab('news')} className={`px-6 py-3 font-semibold bg-primary text-white border-none ${tab === 'news' ? '' : 'opacity-60'}`}>News</button>
      </div>
      {/* Store Tab */}
      {tab === 'store' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-primary font-bold text-4xl mb-6">Jerseys</h2>
            <button onClick={() => setShowJerseyModal(true)} className="bg-primary text-white px-4 py-2 font-semibold border-none">Add Jersey</button>
          </div>
          <table className="w-full mb-8 border border-primary">
            <thead>
              <tr className="border-b border-primary">
                <th className="py-3 px-2">Images</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Description</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Sizes</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Stock</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jerseys.map(j => (
                <tr key={j.id} className="border-b border-primary">
                  <td className="py-2 px-2">
                    <div className="flex gap-2">
                      {j.image_urls && j.image_urls.map((url: string, idx: number) => (
                        <img key={idx} src={url} alt="jersey" className="w-12 h-12 object-cover" />
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-2">{j.name}</td>
                  <td className="py-2 px-2">{j.description}</td>
                  <td className="py-2 px-2">{j.category}</td>
                  <td className="py-2 px-2">{Array.isArray(j.sizes) ? j.sizes.join(', ') : ''}</td>
                  <td className="py-2 px-2">₹{j.price}</td>
                  <td className="py-2 px-2">{j.stock}</td>
                  <td className="py-2 px-2">
                    <button onClick={() => handleDeleteJersey(j.id)} className="text-primary font-bold mr-2 border-none bg-white">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add Jersey Modal */}
          {showJerseyModal && (
            <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
              <div className="bg-white p-8 w-full max-w-md border border-primary">
                <h3 className="text-xl font-bold mb-4 text-primary">Add New Jersey</h3>
                <input type="text" placeholder="Name" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newJersey.name} onChange={e => setNewJersey({ ...newJersey, name: e.target.value })} />
                <input type="text" placeholder="Description" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newJersey.description} onChange={e => setNewJersey({ ...newJersey, description: e.target.value })} />
                <input type="text" placeholder="Category" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newJersey.category} onChange={e => setNewJersey({ ...newJersey, category: e.target.value })} />
                <div className="mb-3">
                  <label className="block mb-1 font-semibold">Sizes</label>
                  <div className="flex gap-2 flex-wrap">
                    {SIZE_OPTIONS.map(size => (
                      <button
                        type="button"
                        key={size}
                        className={`px-3 py-1 border font-semibold transition-colors border-primary ${newJersey.sizes.includes(size) ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                        onClick={() => setNewJersey(j => ({ ...j, sizes: j.sizes.includes(size) ? j.sizes.filter(s => s !== size) : [...j.sizes, size] }))}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <input type="number" placeholder="Price" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newJersey.price} onChange={e => setNewJersey({ ...newJersey, price: e.target.value })} />
                <input type="number" placeholder="Stock" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newJersey.stock} onChange={e => setNewJersey({ ...newJersey, stock: e.target.value })} />
                <div className="mb-3">
                  <label className="block mb-1 font-semibold">Upload Images (up to 4)</label>
                  <input type="file" accept="image/*" multiple max={4} onChange={e => setJerseyImages(e.target.files ? Array.from(e.target.files).slice(0,4) : [])} />
                  <div className="flex gap-2 mt-2">
                    {jerseyImages.map((file, idx) => (
                      <img key={idx} src={URL.createObjectURL(file)} alt="preview" className="w-12 h-12 object-cover" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={handleAddJersey} className="bg-primary text-white px-4 py-2 font-semibold flex-1 border-none">Add</button>
                  <button onClick={() => { setShowJerseyModal(false); setJerseyImages([]); }} className="bg-white text-primary px-4 py-2 font-semibold flex-1 border border-primary">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* All Matches Tab */}
      {tab === 'allMatches' && (
        <div className="mb-8">
          <h2 className="text-primary font-bold text-4xl mb-6">All Matches</h2>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => { setShowMatchModal(true); setMatchType('all'); }}
              className="bg-primary text-white px-4 py-2 font-semibold border-none"
            >
              Add to All Matches
            </button>
          </div>
          <table className="w-full border border-primary text-left">
            <thead>
              <tr className="border-b border-primary">
                <th className="py-3 px-2">Opponent</th>
                <th className="py-3 px-2">Logo</th>
                <th className="py-3 px-2">Score</th>
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2">Competition</th>
                <th className="py-3 px-2">Result</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allMatches.map((match: any) => (
                <tr key={match.id || match.opponent + match.score} className="border-b border-primary">
                  <td className="py-2 px-2">{match.opponent}</td>
                  <td className="py-2 px-2">{match.image_url && <img src={match.image_url} alt="logo" className="w-8 h-8 object-cover" />}</td>
                  <td className="py-2 px-2">{match.score}</td>
                  <td className="py-2 px-2">{match.match_date}</td>
                  <td className="py-2 px-2">{match.competition}</td>
                  <td className="py-2 px-2">{match.result || '-'}</td>
                  <td className="py-2 px-2">
                    <button onClick={() => handleDeleteMatch(match.id, 'all')} className="text-primary font-bold mr-2 border-none bg-white hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Upcoming Matches Tab */}
      {tab === 'upcomingMatches' && (
        <div>
          <h2 className="text-primary font-bold text-4xl mb-6">Upcoming Matches</h2>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => { setShowMatchModal(true); setMatchType('upcoming'); }}
              className="bg-primary text-white px-4 py-2 font-semibold border-none"
            >
              Add to Upcoming Matches
            </button>
          </div>
          <table className="w-full border border-primary text-left">
            <thead>
              <tr className="border-b border-primary">
                <th className="py-3 px-2">Opponent</th>
                <th className="py-3 px-2">Logo</th>
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2">Kickoff</th>
                <th className="py-3 px-2">Competition</th>
                <th className="py-3 px-2">Venue</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingMatches.map((match: any) => (
                <tr key={match.id} className="border-b border-primary">
                  <td className="py-2 px-2">{match.opponent}</td>
                  <td className="py-2 px-2">{match.image_url && <img src={match.image_url} alt="logo" className="w-8 h-8 object-cover" />}</td>
                  <td className="py-2 px-2">{match.match_date}</td>
                  <td className="py-2 px-2">{match.kickoff_time}</td>
                  <td className="py-2 px-2">{match.competition}</td>
                  <td className="py-2 px-2">{match.venue}</td>
                  <td className="py-2 px-2">
                    <button onClick={() => handleDeleteMatch(match.id, 'upcoming')} className="text-primary font-bold mr-2 border-none bg-white hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Transactions Tab */}
      {tab === 'transactions' && (
        <div>
          <h2 className="text-primary font-bold text-4xl mb-6">Transactions</h2>
          <table className="w-full border border-primary text-left">
            <thead>
              <tr className="border-b border-primary">
                <th className="py-3 px-2">ID</th>
                <th className="py-3 px-2">Razorpay Payment ID</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Created At</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-primary">
                  <td className="py-2 px-2">{tx.id}</td>
                  <td className="py-2 px-2">{tx.razorpay_payment_id}</td>
                  <td className="py-2 px-2">₹{tx.amount}</td>
                  <td className="py-2 px-2">{tx.status}</td>
                  <td className="py-2 px-2">{tx.created_at ? new Date(tx.created_at).toLocaleString() : ''}</td>
                  <td className="py-2 px-2">
                    <button onClick={() => handleDeleteTransaction(tx.id)} className="text-primary font-bold mr-2 border-none bg-white hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* News Tab */}
      {tab === 'news' && (
        <div>
          <h2 className="text-primary font-bold text-4xl mb-6">Add News</h2>
          <div className="flex flex-col gap-3 mb-6">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-primary p-6 cursor-pointer bg-white mb-2 transition">
              {newsTab.imageFile ? (
                <img
                  src={URL.createObjectURL(newsTab.imageFile)}
                  alt="Banner Preview"
                  className="w-full max-w-2xl h-48 object-cover mb-2"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-48 w-full max-w-2xl">
                  <span className="text-4xl text-primary mb-2">🖼️</span>
                  <span className="text-primary">Click or drag to upload banner image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setNewsTab(prev => ({ ...prev, imageFile: e.target.files ? e.target.files[0] : null }))}
              />
            </label>
            <input type="text" placeholder="Title" className="p-2 border border-primary text-gray-900 bg-white" value={newsTab.title} onChange={e => setNewsTab(prev => ({ ...prev, title: e.target.value }))} />
            <textarea placeholder="Content" className="p-2 border border-primary text-gray-900 bg-white min-h-[100px]" value={newsTab.content} onChange={e => setNewsTab(prev => ({ ...prev, content: e.target.value }))} />
            <button onClick={handleAddNews} disabled={newsTab.uploading} className="bg-primary text-white px-4 py-2 font-semibold mt-2 disabled:opacity-60">{newsTab.uploading ? 'Uploading...' : 'Add News'}</button>
            {newsTab.error && <div className="text-red-500 text-sm">{newsTab.error}</div>}
            {newsTab.success && <div className="text-green-600 text-sm">{newsTab.success}</div>}
          </div>
          <h3 className="text-lg font-bold mb-2 text-primary">Recent News</h3>
          {newsTab.loading ? <div>Loading...</div> : (
            <ul className="space-y-2">
              {newsTab.newsList.map((n) => (
                <li key={n.id} className="bg-white border border-primary p-3 flex items-center gap-4">
                  {n.image_url && <img src={n.image_url} alt={n.title} className="w-16 h-16 object-cover" />}
                  <div className="flex-1">
                    <div className="font-semibold text-primary">{n.title}</div>
                    <div className="text-sm text-primary line-clamp-2">{n.content}</div>
                    <div className="text-xs text-primary">{n.date_posted ? new Date(n.date_posted).toLocaleString() : ''}</div>
                  </div>
                  {/* <div>test</div> */}
                  <button onClick={() => handleDeleteNews(n.id)} className="text-primary font-bold mr-2 border-none bg-white hover:text-red-600">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Add Match Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-full max-w-md border border-primary">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Add {matchType === 'all' ? 'All Match' : 'Upcoming Match'}
            </h3>
            <input type="text" placeholder="Opponent" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.opponent} onChange={e => setNewMatchModal({ ...newMatchModal, opponent: e.target.value })} />
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Opponent Logo</label>
              <input type="file" accept="image/*" onChange={e => setNewMatchModal({ ...newMatchModal, opponentLogoFile: e.target.files ? e.target.files[0] : null })} />
              {newMatchModal.opponentLogoFile && (
                <img src={URL.createObjectURL(newMatchModal.opponentLogoFile)} alt="logo preview" className="w-16 h-16 object-cover mt-2" />
              )}
            </div>
            <input type="date" placeholder="Match Date" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.match_date} onChange={e => setNewMatchModal({ ...newMatchModal, match_date: e.target.value })} />
            <input type="text" placeholder="Competition" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.competition} onChange={e => setNewMatchModal({ ...newMatchModal, competition: e.target.value })} />
            {matchType === 'all' ? (
              <>
                <input type="text" placeholder="Score (e.g. 2-1)" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.score} onChange={e => setNewMatchModal({ ...newMatchModal, score: e.target.value })} />
                <input type="text" placeholder="Result (win/loss/draw)" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.result} onChange={e => setNewMatchModal({ ...newMatchModal, result: e.target.value })} />
                <input type="url" placeholder="Match Center Link" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.match_center} onChange={e => setNewMatchModal({ ...newMatchModal, match_center: e.target.value })} />
              </>
            ) : (
              <>
                <input type="time" placeholder="Kickoff Time" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.kickoff_time} onChange={e => setNewMatchModal({ ...newMatchModal, kickoff_time: e.target.value })} />
                <input type="text" placeholder="Venue" className="w-full mb-3 p-2 border border-primary text-gray-900 bg-white" value={newMatchModal.venue} onChange={e => setNewMatchModal({ ...newMatchModal, venue: e.target.value })} />
              </>
            )}
            <div className="flex gap-2 mt-4">
              <button onClick={handleAddMatchModal} className="bg-primary text-white px-4 py-2 font-semibold flex-1 border-none">Add</button>
              <button onClick={() => { setShowMatchModal(false); setNewMatchModal({ opponent: '', score: '', match_date: '', competition: '', result: '', kickoff_time: '', venue: '', image_url: '', match_center: '', opponentLogoFile: null }); }} className="bg-white text-primary px-4 py-2 font-semibold flex-1 border border-primary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
