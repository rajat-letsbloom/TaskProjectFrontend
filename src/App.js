import React, { useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [details, setDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !designation) {
      setError('Details Daal dijiyee, please :)');
      return;
    }

    if (editIndex !== null) {
      // Update existing entry
      const updatedDetails = details.map((detail, index) =>
        index === editIndex ? { name, designation } : detail
      );
      setDetails(updatedDetails);
      setEditIndex(null);
    } else {
      // Add new entry
      setDetails([{ name, designation}, ...details]);
    }

    setName('');
    setDesignation('');
  };
  
  const handleEdit = (index) => {
    const detail = details[index];
    setName(detail.name);
    setDesignation(detail.occupation);
    setEditIndex(index);
  };
  
  const handleDelete = (index) => {
    const updatedDetailsList = details.filter((_, i) => i !== index);
    setDetails(updatedDetailsList);
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
        <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
        </form>

        {error && <p style={{ fontWeight: "bolder", color: '#fa5407' }}>{error}</p>}

      {details.length > 0 && (
        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.designation}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
