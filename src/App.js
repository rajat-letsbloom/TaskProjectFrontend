import React, { useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [details, setDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [fillDetails, setFillDetails] = useState(false);

  const baseDir = process.env.REACT_APP_BASE_DIR;

  const fetchDetails = async (e) => {
    e.preventDefault();
    const response = await fetch( baseDir + "/api/user", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    console.log(data.data);
    if (data.data.length === 0){
      alert("No data!")
    }
    else setDetails(data.data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    if (!name || !designation) {
      setFillDetails(true);
      setError('Details Daal dijiyee, please :)');
      return;
    }

    if (editIndex !== null) {
      // Update existing entry
      const person = { name, designation}
      const response = await fetch( baseDir + "/api/user/" + details[editIndex].id , {
        method: 'PUT',
        body: JSON.stringify(person),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      const id = details[editIndex].id
      const updatedDetails = details.map((detail, index) =>
        index === editIndex ? { id ,name, designation } : detail
      );
      setDetails(updatedDetails);
      setEditIndex(null);
    } 
    else {
      // Add new entry
      const person = {"name" : name, "designation" : designation}
      const response = await fetch( baseDir + "/api/user", {
        method: 'POST',
        body: JSON.stringify(person),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      // console.log(data.data.id);
      setDetails([{ "id" : data.data.id , "name" : data.data.name, "designation" : data.data.designation}, ...details]);
    }

    setName('');
    setDesignation('');
    setFillDetails(false);
  };

  const handleEdit = (index) => {
    const detail = details[index];
    setName(detail.name);
    setDesignation(detail.designation);
    setEditIndex(index);
  };
  
  const handleDelete = async (index) => {
    const person = {"id" : details[index].id}
      const response = await fetch( baseDir + "/api/user/" + details[index].id , {
        method: 'DELETE',
        body: JSON.stringify(person),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
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

        {error && fillDetails && <p style={{ fontWeight: "bolder", color: '#fa5407' }}>{error}</p>}

        <button type="submit"  onClick = {fetchDetails} className='fetchButton'> Fetch all Data</button>

      {details.length > 0 && (
        <table className="details-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
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
