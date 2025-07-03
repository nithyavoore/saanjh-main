import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult('Loading...');

    try {
      const response = await fetch('http://localhost:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: query })  // Updated field name
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Network response was not ok');
      }

      const data = await response.json();
      if (data && data.length > 0 && data[0].generated_text) {
        setResult(data[0].generated_text);
      } else {
        setResult('No generated text found.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(`Error occurred: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Query Interface</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query here..."
        />
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      <pre id="result">{result}</pre>
    </div>
  );
}

export default App;
