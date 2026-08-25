const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'subscriptions.json');

app.use(cors());
app.use(express.json());

// Helper to read subscriptions from file
const readSubscriptions = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading subscriptions:', err);
    return [];
  }
};

// Helper to write subscriptions to file
const writeSubscriptions = (subscriptions) => {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(subscriptions, null, 2));
  } catch (err) {
    console.error('Error writing subscriptions:', err);
  }
};

// Business Logic 1: Cost Uniformity Engine
const calculateMonthlyEquivalent = (cost, billingCycle) => {
  const numericCost = parseFloat(cost) || 0;
  if (billingCycle === 'yearly') {
    return Number((numericCost / 12).toFixed(2));
  }
  return Number(numericCost.toFixed(2));
};

// Business Logic 2: Date Intersect Calculator
const calculateRenewalInfo = (nextRenewalDateStr) => {
  if (!nextRenewalDateStr) {
    return { daysUntilRenewal: 0, isRenewingSoon: false };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renewalDate = new Date(nextRenewalDateStr);
  renewalDate.setHours(0, 0, 0, 0);

  const diffTime = renewalDate.getTime() - today.getTime();
  const daysUntilRenewal = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Flag renewing soon if between 0 and 7 days inclusive
  const isRenewingSoon = daysUntilRenewal >= 0 && daysUntilRenewal <= 7;

  return { daysUntilRenewal, isRenewingSoon };
};

// Transform single subscription with computed fields
const enrichSubscription = (sub) => {
  const monthlyEquivalent = calculateMonthlyEquivalent(sub.cost, sub.billingCycle);
  const { daysUntilRenewal, isRenewingSoon } = calculateRenewalInfo(sub.nextRenewalDate);

  return {
    ...sub,
    monthlyEquivalent,
    daysUntilRenewal,
    isRenewingSoon
  };
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Subscription Tracker API is running' });
});

// GET /api/subscriptions
app.get('/api/subscriptions', (req, res) => {
  const rawSubs = readSubscriptions();
  const enrichedSubs = rawSubs.map(enrichSubscription);

  // Calculate Metrics:
  // Total Monthly Burn Rate: Sum of all Active subscriptions' monthlyEquivalent
  const totalMonthlyBurn = enrichedSubs
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.monthlyEquivalent, 0);

  // Upcoming Renewals Alert Count: Count of Active subscriptions with isRenewingSoon === true
  const upcomingRenewalsCount = enrichedSubs
    .filter(sub => sub.status === 'active' && sub.isRenewingSoon)
    .length;

  res.json({
    subscriptions: enrichedSubs,
    metrics: {
      totalMonthlyBurn: Number(totalMonthlyBurn.toFixed(2)),
      upcomingRenewalsCount
    }
  });
});

// POST /api/subscriptions
app.post('/api/subscriptions', (req, res) => {
  const { serviceName, cost, billingCycle, nextRenewalDate } = req.body;

  if (!serviceName || cost === undefined || cost === null || !billingCycle || !nextRenewalDate) {
    return res.status(400).json({ error: 'Missing required subscription fields' });
  }

  const numericCost = parseFloat(cost);
  if (isNaN(numericCost) || numericCost <= 0) {
    return res.status(400).json({ error: 'Cost must be a positive number' });
  }

  const rawSubs = readSubscriptions();
  const newSub = {
    id: Date.now().toString(),
    serviceName: serviceName.trim(),
    cost: numericCost,
    billingCycle: billingCycle.toLowerCase() === 'yearly' ? 'yearly' : 'monthly',
    nextRenewalDate,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  rawSubs.unshift(newSub);
  writeSubscriptions(rawSubs);

  res.status(201).json(enrichSubscription(newSub));
});

// PATCH /api/subscriptions/:id (toggle active/paused status)
app.patch('/api/subscriptions/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const rawSubs = readSubscriptions();
  const index = rawSubs.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Subscription not found' });
  }

  // Toggle status if not provided, or set explicitly to active / paused
  let newStatus = rawSubs[index].status === 'active' ? 'paused' : 'active';
  if (status && (status === 'active' || status === 'paused')) {
    newStatus = status;
  }

  rawSubs[index].status = newStatus;
  writeSubscriptions(rawSubs);

  res.json(enrichSubscription(rawSubs[index]));
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
