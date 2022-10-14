import React from 'react';
import Select from './components/Select';
import './App.css';

function App() {

  return (
    <div className="App">
      <div className='App-header'>
        <h3>College Football</h3>
        <p>Weekly webscraper</p>
      </div>
      <header className="App-body">
        <Select />
      </header>
    </div>
  );
}

export default App;