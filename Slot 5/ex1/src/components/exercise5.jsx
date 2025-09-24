import React from 'react';
import { exercise5Results } from '../exercise5';

function Exercise5() {
  return (
    <div>
      <h3>{exercise5Results.title}</h3>
      <p>{exercise5Results.label}</p>
      {exercise5Results.results.map((teen, index) => (
        <p key={index}>{teen}</p>
      ))}
    </div>
  );
}

export default Exercise5;
