const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Backend Python service URL
const PYTHON_SERVICE_URL = 'http://localhost:5001';

// Get list of drones from Python service
app.get('/api/drones', async (req, res) => {
  try {
    const response = await fetch(`${PYTHON_SERVICE_URL}/drones`);
    const drones = await response.json();
    res.json(drones);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drones' });
  }
});

// Send disconnect command to a drone
app.post('/api/drones/:id/disconnect', async (req, res) => {
  const droneId = req.params.id;
  try {
    const response = await fetch(`${PYTHON_SERVICE_URL}/drones/${droneId}/disconnect`, {
      method: 'POST',
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to disconnect drone' });
  }
});

// Send control command to a drone
app.post('/api/drones/:id/control', async (req, res) => {
  const droneId = req.params.id;
  try {
    const response = await fetch(`${PYTHON_SERVICE_URL}/drones/${droneId}/control`, {
      method: 'POST',
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to control drone' });
  }
});

app.listen(PORT, () => {
  console.log(`Node.js API server running on port ${PORT}`);
});
