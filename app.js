import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [gate, setGate] = useState('');
  const [status, setStatus] = useState('');

  const mockLocation = {
    lat: 17.0009,
    lon: 78.0008 // Near Gate C
  };

  const requestCar = async () => {
    const res = await axios.post('http://localhost:3000/predict-exit', mockLocation);
    setGate(res.data.gate);
    setStatus(res.data.status + ' to Gate ' + res.data.gate + ' (ETA: ' + res.data.eta + ')');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Smart Valet App</h2>
      <button onClick={requestCar}>Request My Car</button>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
}
