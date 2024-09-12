import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Your existing component
import ProblemView from './pages/ProblemView'; // Your new component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prob" element={<ProblemView />} />
      </Routes>
    </Router>
  );
}

export default App;
