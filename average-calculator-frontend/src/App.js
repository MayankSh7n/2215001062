import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);

  const fetchAverage = async () => {
    if (!['p', 'f', 'e', 'r'].includes(numberId)) {
      alert('Invalid ID. Use p, f, e, or r.');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/numbers/${numberId}`);
      setResponse(res.data);
    } catch (err) {
      alert('Error fetching data');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Average Calculator</h1>
      <input
        type="text"
        placeholder="Enter ID (p/f/e/r)"
        value={numberId}
        onChange={e => setNumberId(e.target.value)}
      />
      <button onClick={fetchAverage}>Fetch</button>

      {response && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Previous Window:</strong> {response.windowPrevState.join(', ')}</p>
          <p><strong>Current Window:</strong> {response.windowCurrState.join(', ')}</p>
          <p><strong>Average:</strong> {response.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;