import React from 'react';
import { AlertCircle, CheckCircle2, PauseCircle, Calendar, RefreshCw } from 'lucide-react';

export default function SubscriptionGrid({ subscriptions, onToggleStatus, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-8 text-center text-gray-500">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-600 mb-2" />
        <p className="text-sm font-medium">Loading subscriptions grid...</p>
      </div>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
          <Calendar className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900">No active subscriptions yet</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
          Add your first SaaS application or streaming subscription using the entry form above to monitor renewal alerts and monthly burn rate.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Your Subscriptions</h2>
          <p className="text-xs text-gray-500 mt-0.5">Manage statuses and track upcoming renewal dates</p>
        </div>
        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-semibold text-xs rounded-full">
          {subscriptions.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-3.5 px-6">Service Name</th>
              <th className="py-3.5 px-4">Cost</th>
              <th className="py-3.5 px-4">Billing Cycle</th>
              <th className="py-3.5 px-4">Next Renewal</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-6 text-right">Active / Paused</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {subscriptions.map((sub) => {
              const isPaused = sub.status === 'paused';
              const isRenewingSoon = sub.isRenewingSoon && !isPaused;

              // Row background logic
              let rowStyle = 'hover:bg-gray-50/50 transition-colors';
              if (isPaused) {
                rowStyle = 'bg-gray-50/70 opacity-60 grayscale';
              } else if (isRenewingSoon) {
                rowStyle = 'bg-amber-50/60 border-l-4 border-l-amber-500 hover:bg-amber-50/80';
              }

              return (
                <tr key={sub.id} className={`transition-all duration-200 ${rowStyle}`}>
                  {/* Service Name */}
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <span>{sub.serviceName}</span>
                      {isRenewingSoon && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          Renewing Soon
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Cost */}
                  <td className="py-4 px-4 font-medium text-gray-800">
                    <div>
                      <span>₹{sub.cost.toFixed(2)}</span>
                      {sub.billingCycle === 'yearly' && (
                        <span className="block text-[11px] text-gray-500 font-normal">
                          (₹{sub.monthlyEquivalent}/mo)
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Billing Cycle */}
                  <td className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <span className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200">
                      {sub.billingCycle}
                    </span>
                  </td>

                  {/* Next Renewal Date */}
                  <td className="py-4 px-4 text-xs text-gray-700 font-medium">
                    <div>
                      <span>{sub.nextRenewalDate}</span>
                      {!isPaused && (
                        <span className={`block text-[11px] font-semibold mt-0.5 ${
                          isRenewingSoon ? 'text-amber-700 font-bold' : 'text-gray-500'
                        }`}>
                          {sub.daysUntilRenewal < 0
                            ? `Overdue by ${Math.abs(sub.daysUntilRenewal)} days`
                            : sub.daysUntilRenewal === 0
                            ? 'Renews Today!'
                            : `in ${sub.daysUntilRenewal} days`}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    {isPaused ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                        <PauseCircle className="w-3.5 h-3.5" />
                        Paused
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active
                      </span>
                    )}
                  </td>

                  {/* Interactive Toggle Switch */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onToggleStatus(sub.id)}
                      type="button"
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                        !isPaused ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={!isPaused}
                      title={!isPaused ? 'Click to Pause' : 'Click to Activate'}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          !isPaused ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
