import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ name, designation }), 1000)
      );

      // response = response.json();
      setDetails(before => {
        return [response, ...before]
      });
      // setDetails((prev) => [...prev, response]);
      console.log(details)
    } catch (err) {
      setError('Error fetching details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      fetchDetails();
    } else {
      setError('Naam daaliye zara!!');
    }
  };

  return (
    <div className="App">
      <h1>Fetch Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <button type = "submit" disabled = {loading}>{loading ? 'Fetching...' : 'Submit'}</button>
      </form>

      {error && <p style={{ fontWeight: "bolder", color: '#fa5407' }}>{error}</p>}

      {details.length > 0 && (
        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Occupation</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
