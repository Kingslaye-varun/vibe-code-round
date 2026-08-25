import React from 'react';
import { Flame, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';

export default function MetricsRow({ metrics }) {
  const { totalMonthlyBurn = 0, upcomingRenewalsCount = 0 } = metrics || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Card A: Total Monthly Burn Rate */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Monthly Burn Rate
          </span>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            ₹{totalMonthlyBurn.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-semibold text-gray-500">/ month</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-600 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Real-time normalized cash-flow</span>
        </div>
      </div>

      {/* Card B: Upcoming Renewals Alert Count */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Upcoming Renewals
          </span>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
            upcomingRenewalsCount > 0 ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'
          }`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {upcomingRenewalsCount}
          </span>
          <span className="text-xs font-semibold text-gray-500">sub{upcomingRenewalsCount === 1 ? '' : 's'}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>Due within the next 7 days</span>
        </div>
      </div>
    </div>
  );
}
