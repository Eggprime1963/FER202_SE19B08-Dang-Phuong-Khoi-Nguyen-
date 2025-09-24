import './App.css';
import { integerResults } from './js/integers';
import { nameResults } from './js/names';
import { personResults } from './js/persons';

function App() {
  return (
    <div className="App">
      <h1>Array Operations - FER202</h1>
      
      <section>
        <h2>1. Original Arrays</h2>
        
        <div className="grid-container">
          <div className="grid-item">
            <h3>Integer Array:</h3>
            <ul>
              {integerResults.originalArray.map((num, index) => (
                <li key={index}>{num}</li>
              ))}
            </ul>
          </div>
          
          <div className="grid-item">
            <h3>Name Array:</h3>
            <ul>
              {nameResults.originalArray.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
          
          <div className="grid-item">
            <h3>Person Array:</h3>
            <ul>
              {personResults.originalArray.map((person, index) => (
                <li key={index}>ID: {person.id} - {person.name} (Age: {person.age})</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>2. Sum of Integers</h2>
        <p>Sum of all integers: {integerResults.sum}</p>
      </section>

      <section>
        <h2>3. Sorted Integer Array</h2>
        <ul className="sorted-array">
          {integerResults.sortedArray.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>4. Sorted Name Array (by first letter, then length)</h2>
        <ul className="sorted-array">
          {nameResults.sortedArray.map((name, index) => (
            <li key={index}>{name} (Length: {name.length})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>5. Teenagers (Age 13-19)</h2>
        <ul>
          {personResults.teenagers.map((person, index) => (
            <li key={index}>ID: {person.id} - {person.name} (Age: {person.age})</li>
          ))}
        </ul>
        <p>Number of teenagers: {personResults.teenagerCount}</p>
        <p>Sum of teenager ages: {personResults.teenagerAgeSum}</p>
      </section>
    </div>
  );
}

export default App;
