import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 20px',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '100px', marginBottom: '20px' }}>
        🚫
      </div>
      
      <h1 style={{ 
        fontSize: '48px', 
        color: '#e74c3c',
        marginBottom: '15px'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        color: '#2c3e50',
        marginBottom: '20px'
      }}>
        Page Not Found
      </h2>
      
      <p style={{ 
        fontSize: '18px',
        color: '#7f8c8d',
        marginBottom: '30px',
        maxWidth: '500px'
      }}>
        The page you're looking for doesn't exist. 
        It might have been moved, deleted, or you entered the wrong URL.
      </p>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link 
          to="/"
          style={{
            padding: '12px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease'
          }}
        >
          🏠 Go Home
        </Link>
        
        <Link 
          to="/dashboard"
          style={{
            padding: '12px 24px',
            backgroundColor: '#9b59b6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease'
          }}
        >
          📊 Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;