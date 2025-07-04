import React, { useState } from 'react';

const dummyJerseys = [
  { id: 1, image: '', title: 'Home Jersey', description: 'Blue and white', price: 89, stock: 50 },
  { id: 2, image: '', title: 'Away Jersey', description: 'Black and gold', price: 89, stock: 30 },
];
const dummyWins = [
  { id: 1, team2: 'Rivals FC', score: '3-1' },
];
const dummyMatches = [
  { id: 1, team2: 'Challengers FC' },
];
const dummyTransactions = [
  { id: 1, user: 'john@example.com', item: 'Home Jersey', amount: 89, date: '2025-07-01' },
  { id: 2, user: 'jane@example.com', item: 'Away Jersey', amount: 89, date: '2025-07-02' },
];

const AdminPage = () => {
  const [tab, setTab] = useState('store');
  const [showJerseyModal, setShowJerseyModal] = useState(false);
  const [jerseys, setJerseys] = useState(dummyJerseys);
  const [wins, setWins] = useState(dummyWins);
  const [matches, setMatches] = useState(dummyMatches);
  const [transactions] = useState(dummyTransactions);
  const [newJersey, setNewJersey] = useState({ image: '', title: '', description: '', price: '', stock: '' });
  const [newWin, setNewWin] = useState({ team2: '', score: '' });
  const [newMatch, setNewMatch] = useState({ team2: '' });

  const handleAddJersey = () => {
    setJerseys([...jerseys, { ...newJersey, id: Date.now() }]);
    setShowJerseyModal(false);
    setNewJersey({ image: '', title: '', description: '', price: '', stock: '' });
  };
  const handleAddWin = () => {
    setWins([...wins, { ...newWin, id: Date.now() }]);
    setNewWin({ team2: '', score: '' });
  };
  const handleAddMatch = () => {
    setMatches([...matches, { ...newMatch, id: Date.now() }]);
    setNewMatch({ team2: '' });
  };

  return (
    <div className="min-h-screen pt-[200px] bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Panel</h1>
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab('store')} className={`px-4 py-2 rounded-full font-semibold ${tab === 'store' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Store</button>
          <button onClick={() => setTab('wins')} className={`px-4 py-2 rounded-full font-semibold ${tab === 'wins' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Wins</button>
          <button onClick={() => setTab('matches')} className={`px-4 py-2 rounded-full font-semibold ${tab === 'matches' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Matches</button>
          <button onClick={() => setTab('transactions')} className={`px-4 py-2 rounded-full font-semibold ${tab === 'transactions' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Transactions</button>
        </div>
        {/* Store Tab */}
        {tab === 'store' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Jerseys</h2>
              <button onClick={() => setShowJerseyModal(true)} className="bg-cyan-500 text-white px-4 py-2 rounded-full font-semibold">Add Jersey</button>
            </div>
            <table className="w-full mb-8">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
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
                  <tr key={j.id} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="p-2"><div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded" /></td>
                    <td className="p-2">{j.title}</td>
                    <td className="p-2">{j.description}</td>
                    <td className="p-2">${j.price}</td>
                    <td className="p-2">{j.stock}</td>
                    <td className="p-2"><button className="text-cyan-500">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Add Jersey Modal */}
            {showJerseyModal && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Jersey</h3>
                  <input type="text" placeholder="Image URL" className="w-full mb-3 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newJersey.image} onChange={e => setNewJersey({ ...newJersey, image: e.target.value })} />
                  <input type="text" placeholder="Title" className="w-full mb-3 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newJersey.title} onChange={e => setNewJersey({ ...newJersey, title: e.target.value })} />
                  <input type="text" placeholder="Description" className="w-full mb-3 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newJersey.description} onChange={e => setNewJersey({ ...newJersey, description: e.target.value })} />
                  <input type="number" placeholder="Price" className="w-full mb-3 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newJersey.price} onChange={e => setNewJersey({ ...newJersey, price: e.target.value })} />
                  <input type="number" placeholder="Stock" className="w-full mb-3 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newJersey.stock} onChange={e => setNewJersey({ ...newJersey, stock: e.target.value })} />
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleAddJersey} className="bg-cyan-500 text-white px-4 py-2 rounded-full font-semibold flex-1">Add</button>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add Win</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Opponent Team" className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newWin.team2} onChange={e => setNewWin({ ...newWin, team2: e.target.value })} />
              <input type="text" placeholder="Score (e.g. 2-1)" className="w-32 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newWin.score} onChange={e => setNewWin({ ...newWin, score: e.target.value })} />
              <button onClick={handleAddWin} className="bg-cyan-500 text-white px-4 py-2 rounded-full font-semibold">Add</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Team 1</th>
                  <th className="p-2 text-left">Team 2</th>
                  <th className="p-2 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {wins.map(win => (
                  <tr key={win.id} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="p-2">United FC Kodagu</td>
                    <td className="p-2">{win.team2}</td>
                    <td className="p-2">{win.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Matches Tab */}
        {tab === 'matches' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add Match</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Opponent Team" className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" value={newMatch.team2} onChange={e => setNewMatch({ ...newMatch, team2: e.target.value })} />
              <button onClick={handleAddMatch} className="bg-cyan-500 text-white px-4 py-2 rounded-full font-semibold">Add</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Team 1</th>
                  <th className="p-2 text-left">Team 2</th>
                </tr>
              </thead>
              <tbody>
                {matches.map(match => (
                  <tr key={match.id} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="p-2">United FC Kodagu</td>
                    <td className="p-2">{match.team2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Transactions Tab */}
        {tab === 'transactions' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Transactions</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b border-gray-300 dark:border-gray-700">
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
