import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CallbackPage from './pages/CallbackPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/callback" element={<CallbackPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
