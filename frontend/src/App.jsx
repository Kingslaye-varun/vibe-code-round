import React, { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [metrics, setMetrics] = useState({ totalMonthlyBurn: 0, upcomingRenewalsCount: 0 });
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch('/api/subscriptions');
      if (!res.ok) throw new Error('Failed to fetch subscriptions');
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
      setMetrics(data.metrics || { totalMonthlyBurn: 0, upcomingRenewalsCount: 0 });
    } catch (err) {
      console.error('Error loading subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleAddSubscription = async (newSub) => {
    const res = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSub),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Failed to create subscription');
    }
    await fetchSubscriptions();
  };

  return (
    <div className="min-h-screen bg-gray-50/60 p-4 sm:p-6 md:p-10 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Subscription Tracker
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Renewal Dashboard & Monthly Cash-Flow Manager
            </p>
          </div>
        </header>

        {/* Milestone 2: Entry Form */}
        <EntryForm onAddSubscription={handleAddSubscription} />

        {/* Temporary Basic List for Milestone 2 Acceptance Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4">
            Active Subscriptions ({subscriptions.length})
          </h3>
          {loading ? (
            <p className="text-xs text-gray-500">Loading subscriptions...</p>
          ) : subscriptions.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No subscriptions added yet.</p>
          ) : (
            <div className="space-y-2">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-xs border border-gray-100"
                >
                  <span className="font-semibold text-gray-800">{sub.serviceName}</span>
                  <span className="text-gray-600">
                    ₹{sub.cost} ({sub.billingCycle}) → Monthly: ₹{sub.monthlyEquivalent}
                  </span>
                  <span className="text-gray-500">Renews: {sub.nextRenewalDate}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
