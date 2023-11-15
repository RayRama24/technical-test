import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonList from './components/PersonList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PersonList />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
