import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [careers, setCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Backend API se careers ka data fetch ho raha hai
    axios.get('http://localhost:5000/api/careers')
      .then(res => setCareers(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const filteredCareers = careers.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>🎓 Career Finder App</h1>
      
      {/* Search Input Box */}
      <input
        type="text"
        placeholder="Search career (e.g., Developer, Designer)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          margin: '20px 0',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      />

      {/* Career Cards List */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredCareers.length > 0 ? (
          filteredCareers.map((item) => (
            <div key={item._id} style={{
              border: '1px solid #e0e0e0',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              backgroundColor: '#f9f9f9'
            }}>
              <h2 style={{ color: '#007bff', marginTop: 0 }}>{item.title}</h2>
              <p><strong>Description:</strong> {item.description}</p>
              
              {/* Skills Formatting with Proper Spacing */}
              <p>
                <strong>Skills Needed:</strong>{' '}
                {Array.isArray(item.skills) 
                  ? item.skills.join(', ') 
                  : item.skills 
                    ? String(item.skills)
                        .replace(/([a-z])([A-Z])/g, '$1, $2')
                        .replace(/,/g, ', ')
                        .replace(/,\s+,/g, ',')
                    : 'HTML, CSS, JavaScript'}
              </p>

              {/* Salary Formatting */}
              <p>
                <strong>Average Salary:</strong>{' '}
                {item.averageSalary || item.salary || '6-8 LPA'}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>No careers found.</p>
        )}
      </div>
    </div>
  );
}

export default App;