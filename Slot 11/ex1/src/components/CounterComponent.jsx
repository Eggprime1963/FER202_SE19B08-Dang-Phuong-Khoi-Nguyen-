
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function CounterComponent () {
    
    const [count, setCount] = useState(0);
    
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);
      
    const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };
    return (
       <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Multi-Purpose Counter</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Current value: {count}</p>
      
      <Button
        onClick={increment}
        style={{ ...buttonStyle, background: '#007bff', color: 'white' }}
      >
        Increment (+1)
      </Button>
      <Button
        onClick={decrement}
        style={{ ...buttonStyle, background: '#ffc107', color: '#333' }}
      >
        Decrement (-1)
      </Button>
      <Button
        onClick={reset}
        style={{ ...buttonStyle, background: 'red', color: 'white' }}
      >
        Reset
      </Button>
    </div>
    );
}
export default CounterComponent;