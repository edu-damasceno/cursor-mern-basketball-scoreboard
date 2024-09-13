import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './GameContext';
import Dashboard from './components/Dashboard';
import Scoreboard from './components/Scoreboard';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <GameProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/scoreboard" element={<Scoreboard />} />
            </Routes>
          </div>
        </GameProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
