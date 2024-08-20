import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SchoolListPage from './SchoolListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schools/:country" element={<SchoolListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
