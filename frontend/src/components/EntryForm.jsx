import React, { useState, useRef } from 'react';
import { PlusCircle, Calendar as CalendarIcon, Tag, Clock } from 'lucide-react';

// Helper to parse user date input into standard YYYY-MM-DD format
export function parseFlexibleDate(inputStr) {
  if (!inputStr) return null;
  const trimmed = inputStr.trim();

  // Pattern 1: YYYY-MM-DD or YYYY/MM/DD
  if (/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}$/.test(trimmed)) {
    const parts = trimmed.split(/[-/.]/).map((p) => parseInt(p, 10));
    const [y, m, d] = parts;
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      const dateObj = new Date(y, m - 1, d);
      if (
        dateObj.getFullYear() === y &&
        dateObj.getMonth() === m - 1 &&
        dateObj.getDate() === d
      ) {
        return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      }
    }
  }

  // Pattern 2: DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const parts = trimmed.split(/[-/.]/).map((p) => parseInt(p, 10));
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    let d, m, y;
    if (parts[2] >= 1000 && parts[2] <= 9999) {
      // DD/MM/YYYY format
      d = parts[0];
      m = parts[1];
      y = parts[2];
    } else if (parts[0] >= 1000 && parts[0] <= 9999) {
      // YYYY/MM/DD format
      y = parts[0];
      m = parts[1];
      d = parts[2];
    }

    if (y && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      const dateObj = new Date(y, m - 1, d);
      if (
        dateObj.getFullYear() === y &&
        dateObj.getMonth() === m - 1 &&
        dateObj.getDate() === d
      ) {
        return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      }
    }
  }

  return null;
}

export default function EntryForm({ onAddSubscription }) {
  const [serviceName, setServiceName] = useState('');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [rawDate, setRawDate] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const datePickerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!serviceName.trim()) {
      setError('Please enter a service name.');
      return;
    }

    const numCost = parseFloat(cost);
    if (isNaN(numCost) || numCost <= 0) {
      setError('Cost must be a positive number.');
      return;
    }

    const isoDate = parseFlexibleDate(rawDate);
    if (!isoDate) {
      setError('Please enter a valid renewal date (e.g. 26/09/2026 or select from calendar).');
      return;
    }

    setSubmitting(true);
    try {
      await onAddSubscription({
        serviceName: serviceName.trim(),
        cost: numCost,
        billingCycle,
        nextRenewalDate: isoDate,
      });

      // Clear form on success
      setServiceName('');
      setCost('');
      setBillingCycle('monthly');
      setRawDate('');
    } catch (err) {
      setError(err.message || 'Failed to add subscription');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCalendarPick = (e) => {
    const val = e.target.value; // YYYY-MM-DD
    if (val) {
      const [y, m, d] = val.split('-');
      setRawDate(`${d}/${m}/${y}`);
    }
  };

  const openCalendarPicker = () => {
    if (datePickerRef.current) {
      if (typeof datePickerRef.current.showPicker === 'function') {
        datePickerRef.current.showPicker();
      } else {
        datePickerRef.current.click();
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 transition-all duration-200">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-600" />
            Add New Subscription
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Input your recurring expense details below</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service Name */}
        <div className="space-y-1.5">
          <label htmlFor="service-name" className="block text-xs font-semibold text-gray-700">
            Service Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Tag className="w-4 h-4" />
            </div>
            <input
              id="service-name"
              type="text"
              placeholder="e.g. Netflix, Spotify"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              required
            />
          </div>
        </div>

        {/* Cost */}
        <div className="space-y-1.5">
          <label htmlFor="cost-input" className="block text-xs font-semibold text-gray-700">
            Cost
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-medium text-sm">
              ₹
            </div>
            <input
              id="cost-input"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              required
            />
          </div>
        </div>

        {/* Billing Cycle */}
        <div className="space-y-1.5">
          <label htmlFor="billing-cycle" className="block text-xs font-semibold text-gray-700">
            Billing Cycle
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Clock className="w-4 h-4" />
            </div>
            <select
              id="billing-cycle"
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors appearance-none cursor-pointer"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Next Renewal Date */}
        <div className="space-y-1.5">
          <label htmlFor="renewal-date" className="block text-xs font-semibold text-gray-700">
            Next Renewal Date
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <input
              id="renewal-date"
              type="text"
              placeholder="DD/MM/YYYY or YYYY-MM-DD"
              value={rawDate}
              onChange={(e) => setRawDate(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-sm bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              required
            />

            {/* Hidden Native Calendar Picker Trigger */}
            <input
              type="date"
              ref={datePickerRef}
              onChange={handleCalendarPick}
              className="sr-only"
              tabIndex={-1}
            />

            <button
              type="button"
              onClick={openCalendarPicker}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors cursor-pointer"
              title="Open Calendar Picker"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            {submitting ? 'Adding...' : 'Add Subscription'}
          </button>
        </div>
      </form>
    </div>
  );
}
