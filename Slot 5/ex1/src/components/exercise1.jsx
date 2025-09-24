import React from 'react';
import { exercise1Results } from '../exercise1';

function Exercise1() {
  return (
    <div>
      <h3>{exercise1Results.title}</h3>
      <p>{exercise1Results.label}</p>
      <p>{exercise1Results.result1}</p>
      <p>{exercise1Results.result2}</p>
      <p>{exercise1Results.result3}</p>
    </div>
  );
}

export default Exercise1;
