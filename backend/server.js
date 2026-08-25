const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'subscriptions.json');

app.use(cors());
app.use(express.json());

// Helper to read subscriptions
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

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Subscription Tracker API is running' });
});

// GET /api/subscriptions placeholder for Milestone 0
app.get('/api/subscriptions', (req, res) => {
  const subscriptions = readSubscriptions();
  res.json({
    subscriptions,
    metrics: {
      totalMonthlyBurn: 0,
      upcomingRenewalsCount: 0
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
