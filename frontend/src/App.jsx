import React, { useState, useEffect, useCallback } from 'react';
import EntryForm from './components/EntryForm';
import MetricsRow from './components/MetricsRow';
import SubscriptionGrid from './components/SubscriptionGrid';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [metrics, setMetrics] = useState({ totalMonthlyBurn: 0, upcomingRenewalsCount: 0 });
  const [loading, setLoading] = useState(true);

  // Recalculate metrics locally for instantaneous real-time UI updates
  const calculateLocalMetrics = useCallback((subsList) => {
    const activeSubs = subsList.filter(s => s.status === 'active');
    const totalMonthlyBurn = activeSubs.reduce((sum, s) => sum + (s.monthlyEquivalent || 0), 0);
    const upcomingRenewalsCount = activeSubs.filter(s => s.isRenewingSoon).length;
    return {
      totalMonthlyBurn: Number(totalMonthlyBurn.toFixed(2)),
      upcomingRenewalsCount,
    };
  }, []);

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

  const handleToggleStatus = async (id) => {
    // 1. Instant optimistic update on local state ("The Vibe Check")
    let targetSub = null;
    const updatedSubs = subscriptions.map((sub) => {
      if (sub.id === id) {
        const nextStatus = sub.status === 'active' ? 'paused' : 'active';
        targetSub = { ...sub, status: nextStatus };
        return targetSub;
      }
      return sub;
    });

    setSubscriptions(updatedSubs);
    setMetrics(calculateLocalMetrics(updatedSubs));

    try {
      // 2. Persist backend PATCH update
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetSub ? targetSub.status : undefined }),
      });

      if (!res.ok) {
        throw new Error('Failed to toggle status');
      }

      // 3. Sync with canonical server response
      const updatedItem = await res.json();
      setSubscriptions((currentSubs) =>
        currentSubs.map((s) => (s.id === id ? updatedItem : s))
      );
      // Re-fetch to ensure metrics parity
      fetchSubscriptions();
    } catch (err) {
      console.error('Error toggling subscription status:', err);
      // Rollback on failure
      fetchSubscriptions();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 p-4 sm:p-6 md:p-10 font-sans text-gray-900 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                ₹
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Subscription Tracker
              </h1>
            </div>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Renewal Dashboard & Real-Time Monthly Cash-Flow Manager
            </p>
          </div>
        </header>

        {/* Entry Form */}
        <EntryForm onAddSubscription={handleAddSubscription} />

        {/* Metrics Row */}
        <MetricsRow metrics={metrics} />

        {/* Subscription Grid */}
        <SubscriptionGrid
          subscriptions={subscriptions}
          onToggleStatus={handleToggleStatus}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
