import React from 'react';
import { exercise2Results } from '../exercise2';

function Exercise2() {
  return (
    <div>
      <h3>{exercise2Results.title}</h3>
      <p>{exercise2Results.label}</p>
      <p>{exercise2Results.result1}</p>
      <p>{exercise2Results.result2}</p>
      <p>{exercise2Results.result3}</p>
      <p>{exercise2Results.result4}</p>
    </div>
  );
}

export default Exercise2;
