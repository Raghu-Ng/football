import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const dummyJerseys = [
  { id: 1, image: '', title: 'Home Jersey', description: 'Blue and white', price: 89, stock: 50 },
  { id: 2, image: '', title: 'Away Jersey', description: 'Black and gold', price: 89, stock: 30 },
];
const dummyTransactions = [
  { id: 1, user: 'john@example.com', item: 'Home Jersey', amount: 89, date: '2025-07-01' },
  { id: 2, user: 'jane@example.com', item: 'Away Jersey', amount: 89, date: '2025-07-02' },
];

const AdminPage = () => {
  const [tab, setTab] = useState('store');
  const [showJerseyModal, setShowJerseyModal] = useState(false);
  const [jerseys, setJerseys] = useState(dummyJerseys);
  const [wins, setWins] = useState<Array<{ id?: number; opponent: string; score: string; match_date: string; competition: string }>>([]);
  const [matches, setMatches] = useState<Array<{ id?: number; opponent: string; match_date: string; kickoff_time: string; competition: string; venue: string }>>([]);
  const [transactions] = useState(dummyTransactions);
  const [newJersey, setNewJersey] = useState({ image: '', title: '', description: '', price: '', stock: '' });
  const [newWin, setNewWin] = useState({ opponent: '', score: '', match_date: '', competition: '' });
  const [newMatch, setNewMatch] = useState({ opponent: '', match_date: '', kickoff_time: '', competition: '', venue: '' });
  const [loadingWins, setLoadingWins] = useState(false);
  const [loadingMatches, setLoadingMatches] = useState(false);

  // Fetch wins helper
  const fetchWins = async () => {
    setLoadingWins(true);
    const { data, error } = await supabase.from('wins').select('*').order('match_date', { ascending: false });
    // console.log(data)
    setWins(data || []);
    setLoadingWins(false);
  };

  // Fetch matches helper
  const fetchMatches = async () => {
    setLoadingMatches(true);
    const { data } = await supabase.from('upcoming_matches').select('*').order('match_date', { ascending: true });
    setMatches(data || []);
    setLoadingMatches(false);
  };

  useEffect(() => {
    fetchWins();
    fetchMatches();
  }, []);

  const handleAddJersey = () => {
    setJerseys([...jerseys, { ...newJersey, id: Date.now() }]);
    setShowJerseyModal(false);
    setNewJersey({ image: '', title: '', description: '', price: '', stock: '' });
  };
  const handleAddWin = async () => {
    if (!newWin.opponent || !newWin.score || !newWin.match_date) return;
    const { error } = await supabase.from('wins').insert([newWin]);
    if (!error) {
      await fetchWins();
      setNewWin({ opponent: '', score: '', match_date: '', competition: '' });
    }
  };
  const handleAddMatch = async () => {
    if (!newMatch.opponent || !newMatch.match_date) return;
    const { error } = await supabase.from('upcoming_matches').insert([newMatch]);
    if (!error) {
      await fetchMatches();
      setNewMatch({ opponent: '', match_date: '', kickoff_time: '', competition: '', venue: '' });
    }
  };

  return (
    <div className="min-h-screen pt-[200px] bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-orange-400/30 dark:border-blue-400/30">
        <h1 className="text-3xl font-bold mb-8 text-orange-500 dark:text-blue-400">Admin Panel</h1>
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab('store')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'store' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Store</button>
          <button onClick={() => setTab('wins')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'wins' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Wins</button>
          <button onClick={() => setTab('matches')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'matches' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Matches</button>
          <button onClick={() => setTab('transactions')} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${tab === 'transactions' ? 'bg-orange-500 dark:bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Transactions</button>
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
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Stock</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jerseys.map(j => (
                  <tr key={j.id} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2"><div className="w-12 h-12 bg-orange-200 dark:bg-blue-900 rounded" /></td>
                    <td className="p-2">{j.title}</td>
                    <td className="p-2">{j.description}</td>
                    <td className="p-2">${j.price}</td>
                    <td className="p-2">{j.stock}</td>
                    <td className="p-2"><button className="text-orange-500 dark:text-blue-400">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Add Jersey Modal */}
            {showJerseyModal && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-400/30 dark:border-blue-400/30">
                  <h3 className="text-xl font-bold mb-4 text-orange-500 dark:text-blue-400">Add New Jersey</h3>
                  <input type="text" placeholder="Image URL" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.image} onChange={e => setNewJersey({ ...newJersey, image: e.target.value })} />
                  <input type="text" placeholder="Title" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.title} onChange={e => setNewJersey({ ...newJersey, title: e.target.value })} />
                  <input type="text" placeholder="Description" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.description} onChange={e => setNewJersey({ ...newJersey, description: e.target.value })} />
                  <input type="number" placeholder="Price" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.price} onChange={e => setNewJersey({ ...newJersey, price: e.target.value })} />
                  <input type="number" placeholder="Stock" className="w-full mb-3 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newJersey.stock} onChange={e => setNewJersey({ ...newJersey, stock: e.target.value })} />
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleAddJersey} className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold flex-1">Add</button>
                    <button onClick={() => setShowJerseyModal(false)} className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold flex-1">Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Wins Tab */}
        {tab === 'wins' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4">Add Win</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <input type="text" placeholder="Opponent Team" className="flex-1 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newWin.opponent} onChange={e => setNewWin({ ...newWin, opponent: e.target.value })} />
              <input type="text" placeholder="Score (e.g. 2-1)" className="w-32 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newWin.score} onChange={e => setNewWin({ ...newWin, score: e.target.value })} />
              <input type="date" className="p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newWin.match_date} onChange={e => setNewWin({ ...newWin, match_date: e.target.value })} />
              <input type="text" placeholder="Competition" className="w-40 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newWin.competition} onChange={e => setNewWin({ ...newWin, competition: e.target.value })} />
              <button onClick={handleAddWin} className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">Add</button>
            </div>
            {loadingWins ? <div>Loading...</div> : (
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100 dark:bg-blue-900">
                  <th className="p-2 text-left">Opponent</th>
                  <th className="p-2 text-left">Score</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Competition</th>
                </tr>
              </thead>
              <tbody>
                {wins.map((win: any) => (
                  <tr key={win.id || win.opponent + win.score} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2">{win.opponent}</td>
                    <td className="p-2">{win.score}</td>
                    <td className="p-2">{win.match_date}</td>
                    <td className="p-2">{win.competition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        )}
        {/* Matches Tab */}
        {tab === 'matches' && (
          <div>
            <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4">Add Match</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <input type="text" placeholder="Opponent Team" className="flex-1 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatch.opponent} onChange={e => setNewMatch({ ...newMatch, opponent: e.target.value })} />
              <input type="date" className="p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatch.match_date} onChange={e => setNewMatch({ ...newMatch, match_date: e.target.value })} />
              <input type="time" className="p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatch.kickoff_time} onChange={e => setNewMatch({ ...newMatch, kickoff_time: e.target.value })} />
              <input type="text" placeholder="Competition" className="w-40 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatch.competition} onChange={e => setNewMatch({ ...newMatch, competition: e.target.value })} />
              <input type="text" placeholder="Venue" className="w-40 p-2 rounded bg-orange-50 dark:bg-blue-900 text-gray-900 dark:text-white" value={newMatch.venue} onChange={e => setNewMatch({ ...newMatch, venue: e.target.value })} />
              <button onClick={handleAddMatch} className="bg-orange-500 dark:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">Add</button>
            </div>
            {loadingMatches ? <div>Loading...</div> : (
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100 dark:bg-blue-900">
                  <th className="p-2 text-left">Opponent</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Kickoff</th>
                  <th className="p-2 text-left">Competition</th>
                  <th className="p-2 text-left">Venue</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match: any) => (
                  <tr key={match.id} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2">{match.opponent}</td>
                    <td className="p-2">{match.match_date}</td>
                    <td className="p-2">{match.kickoff_time}</td>
                    <td className="p-2">{match.competition}</td>
                    <td className="p-2">{match.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        )}
        {/* Transactions Tab */}
        {tab === 'transactions' && (
          <div>
            <h2 className="text-xl font-bold text-orange-500 dark:text-blue-400 mb-4">Transactions</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100 dark:bg-blue-900">
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b border-orange-200 dark:border-blue-700">
                    <td className="p-2">{tx.user}</td>
                    <td className="p-2">{tx.item}</td>
                    <td className="p-2">${tx.amount}</td>
                    <td className="p-2">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
