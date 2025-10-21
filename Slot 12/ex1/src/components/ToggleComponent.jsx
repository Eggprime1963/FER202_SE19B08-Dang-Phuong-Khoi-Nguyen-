import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { 
  isOn: false,
  message: 'Trạng thái: TẮT' 
};

// 2. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { 
        isOn: !state.isOn, 
        message: !state.isOn ? 'Trạng thái: BẬT' : 'Trạng thái: TẮT'
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function ToggleComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action handlers
  const handleToggle = () => dispatch({ type: 'toggle' });
  const handleReset = () => dispatch({ type: 'reset' });
   
  // Style chung cho component
  const containerStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    marginTop: '20px'
  };

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
    <div style={containerStyle}>
      <h2>Bật/Tắt Trạng Thái</h2>
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: state.isOn ? '#28a745' : '#dc3545',
        margin: '20px auto',
        transition: 'background-color 0.3s ease'
      }}>
      </div>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {state.message}
      </p>
      
      <Button
        onClick={handleToggle}
        style={{ 
          ...buttonStyle, 
          background: state.isOn ? '#dc3545' : '#28a745', 
          color: 'white' 
        }}
      >
        {state.isOn ? 'Tắt' : 'Bật'}
      </Button>
      <Button
        onClick={handleReset}
        style={{ ...buttonStyle, background: '#6c757d', color: 'white' }}
      >
        Reset
      </Button>
    </div>
  );
}

export default ToggleComponent;