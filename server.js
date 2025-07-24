const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

// Sample beacon gate coordinates
const gates = {
  A: { lat: 17.0, lon: 78.0 },
  B: { lat: 17.0005, lon: 78.0003 },
  C: { lat: 17.0009, lon: 78.0007 },
  D: { lat: 17.0012, lon: 78.0010 }
};

// Simple Haversine function to calculate distance
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = deg => deg * (Math.PI / 180);
  const R = 6371e3; // Earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Predict closest gate
function predictGate(userLocation) {
  let closest = null;
  let minDist = Infinity;
  for (let [gate, coords] of Object.entries(gates)) {
    const dist = getDistance(userLocation.lat, userLocation.lon, coords.lat, coords.lon);
    if (dist < minDist) {
      minDist = dist;
      closest = gate;
    }
  }
  return closest;
}

app.post('/predict-exit', (req, res) => {
  const userLocation = req.body;
  const gate = predictGate(userLocation);
  res.json({ gate, eta: "3 mins", status: "Car will be dispatched" });
});

app.listen(PORT, () => console.log(Server running on http://localhost:${PORT}));
