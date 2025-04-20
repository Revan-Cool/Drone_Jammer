const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Node.js backend logic (converted from Python service)
const backendApp = express();
backendApp.use(cors());
backendApp.use(express.json());

let drones = [
  { id: 'Drone-001', frequency: '2.4 GHz', location: 'Sector A', owner: 'Alice', status: 'active' },
  { id: 'Drone-002', frequency: '5.8 GHz', location: 'Sector B', owner: 'Bob', status: 'active' },
  { id: 'Drone-003', frequency: '2.4 GHz', location: 'Sector C', owner: 'Charlie', status: 'active' },
];

backendApp.get('/api/drones', (req, res) => {
  res.json(drones);
});

backendApp.post('/api/drones/:id/disconnect', (req, res) => {
  const droneId = req.params.id;
  const drone = drones.find(d => d.id === droneId);
  if (drone) {
    drone.status = 'disconnected';
    res.json({ message: `${droneId} disconnected successfully.` });
  } else {
    res.status(404).json({ error: 'Drone not found.' });
  }
});

backendApp.post('/api/drones/:id/control', (req, res) => {
  const droneId = req.params.id;
  const drone = drones.find(d => d.id === droneId);
  if (drone) {
    res.json({ message: `Control command sent to ${droneId}.` });
  } else {
    res.status(404).json({ error: 'Drone not found.' });
  }
});

const backendServer = backendApp.listen(0, () => {
  const port = backendServer.address().port;
  console.log(`Backend API server running on port ${port}`);

  // After backend starts, launch Electron app
  app.whenReady().then(() => {
    createWindow();

    // Pass backend port to renderer process via environment variable
    process.env.BACKEND_PORT = port;

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    backendServer.close();
    app.quit();
  }
});
