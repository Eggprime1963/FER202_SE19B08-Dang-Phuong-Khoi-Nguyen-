import React from 'react';
import { exercise3Results } from '../exercise3';

function Exercise3() {
  return (
    <div>
      <h3>{exercise3Results.title}</h3>
      <p>{exercise3Results.label}</p>
      <p>{exercise3Results.result1}</p>
      <p>{exercise3Results.label2}</p>
      <p>{exercise3Results.result2}</p>
    </div>
  );
}

export default Exercise3;
