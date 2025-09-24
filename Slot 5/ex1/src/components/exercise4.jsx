import React from 'react';
import { exercise4Results } from '../exercise4';

function Exercise4() {
  return (
    <div>
      <h3>{exercise4Results.title}</h3>
      <p>{exercise4Results.label}</p>
      <p>{exercise4Results.result1}</p>
      <p>{exercise4Results.result2}</p>
      <p>{exercise4Results.result3}</p>
      <p>{exercise4Results.result4}</p>
    </div>
  );
}

export default Exercise4;
