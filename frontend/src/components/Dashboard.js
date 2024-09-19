import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../GameContext';
import './Dashboard.css';
import { formatTime } from '../utils/timeUtils';

function Dashboard() {
  const navigate = useNavigate();
  const {
    gameState,
    updateGameState,
    handleScoreChange,
    handleFoulChange,
    handleTimeoutChange,
    toggleTimer,
    resetShotClock,
    toggleShotClock,
    updateShotClock
  } = useContext(GameContext);

  const [editableTime, setEditableTime] = useState({
    minutes: 0,
    seconds: 0,
    tenths: 0
  });

  const [shotClockCorrection, setShotClockCorrection] = useState({
    seconds: 0,
    tenths: 0
  });

  useEffect(() => {
    setEditableTime({
      minutes: Math.floor(gameState.timeRemaining / 60),
      seconds: Math.floor(gameState.timeRemaining % 60),
      tenths: Math.floor((gameState.timeRemaining % 1) * 10)
    });
  }, [gameState.timeRemaining]);

  const handleTimeChange = (field, value) => {
    setEditableTime(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeCorrection = () => {
    const newTime =
      (editableTime.minutes * 60) +
      editableTime.seconds +
      (editableTime.tenths / 10);
    updateGameState({ timeRemaining: newTime });
  };

  const handleShotClockCorrection = () => {
    const newTime = shotClockCorrection.seconds + (shotClockCorrection.tenths / 10);
    updateShotClock(newTime);
  };

  const handleTeamNameEdit = (team) => {
    const currentName = gameState[`${team}Team`];
    const newName = prompt(`Enter new name for ${team} team:`, currentName);
    if (newName !== null && newName !== currentName) {
      updateGameState({ [`${team}Team`]: newName });
    }
  };

  const handleLogoUpload = (team, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateGameState({ [`${team}Logo`]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const TeamControl = ({ team }) => (
    <div className={`team-section ${team}`}>
      <div className="logo-upload">
        <label htmlFor={`${team}-logo-upload`}>
          {gameState[`${team}Logo`] ? (
            <img src={gameState[`${team}Logo`]} alt={`${team} logo`} className="team-logo-preview" />
          ) : (
            <span>Upload Logo</span>
          )}
        </label>
        <input
          id={`${team}-logo-upload`}
          type="file"
          accept=".svg,.png,.jpg,.jpeg"
          onChange={(e) => handleLogoUpload(team, e)}
          style={{ display: 'none' }}
        />
      </div>
      <h2 onClick={() => handleTeamNameEdit(team)} style={{ cursor: 'pointer' }}>
        {gameState[`${team}Team`]}
      </h2>
      <div className="score-buttons">
        <button onClick={() => handleScoreChange(team, 3)}>+3</button>
        <button onClick={() => handleScoreChange(team, 2)}>+2</button>
        <button onClick={() => handleScoreChange(team, 1)}>+1</button>
      </div>
      <div className="score-display">
        <div className="digital-display large">{gameState[`${team}Score`]}</div>
      </div>
      <button className="correction-btn" onClick={() => handleScoreChange(team, -1)}>Correction (-1)</button>
      <div className="foul-section">
        <div className="section-label">Team Foul</div>
        <div className="digital-display-container">
          <div className="digital-display medium">{gameState[`${team}Fouls`]}</div>
          <div className="vertical-buttons">
            <button onClick={() => handleFoulChange(team, 1)}>+</button>
            <button onClick={() => handleFoulChange(team, -1)}>-</button>
          </div>
        </div>
      </div>
      <div className="timeout-section">
        <div className="section-label">Time-out</div>
        <div className="digital-display-container">
          <div className="digital-display medium">{gameState[`${team}Timeouts`]}</div>
          <div className="vertical-buttons">
            <button onClick={() => handleTimeoutChange(team, 1)}>+</button>
            <button onClick={() => handleTimeoutChange(team, -1)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <TeamControl team="home" />

        <div className="central-controls">
          <div className="game-clock">
            <div className="digital-display large">{formatTime(gameState.timeRemaining)}</div>
            <div className="clock-controls">
              <button onClick={toggleTimer}>{gameState.isRunning ? 'Pause' : 'Start'}</button>
              <button onClick={() => updateGameState({ timeRemaining: 720 })}>Reset</button>
            </div>
          </div>
          <div className="time-correction">
            <h3>Time Correction</h3>
            <div className="time-inputs">
              <input
                type="number"
                min="0"
                max="59"
                value={editableTime.minutes}
                onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value))}
                disabled={gameState.isRunning}
              />
              <label>Min</label>
              <input
                type="number"
                min="0"
                max="59"
                value={editableTime.seconds}
                onChange={(e) => handleTimeChange('seconds', parseInt(e.target.value))}
                disabled={gameState.isRunning}
              />
              <label>Sec</label>
              <input
                type="number"
                min="0"
                max="9"
                value={editableTime.tenths}
                onChange={(e) => handleTimeChange('tenths', parseInt(e.target.value))}
                disabled={gameState.isRunning}
              />
              <label>Tent</label>
            </div>
            <button onClick={handleTimeCorrection} disabled={gameState.isRunning}>Enter</button>
          </div>
          <div className="shot-clock-section">
            <h3>Shot Clock</h3>
            <div className="digital-display medium">{Math.ceil(gameState.shotClock)}</div>
            <div className="shot-clock-controls">
              <button onClick={() => resetShotClock(24)}>Reset (24)</button>
              <button onClick={() => resetShotClock(14)}>Reset (14)</button>
              <button onClick={toggleShotClock}>
                {gameState.isShotClockRunning ? 'Pause' : 'Start'}
              </button>
            </div>
            <div className="shot-clock-correction">
              <input
                type="number"
                min="0"
                max="24"
                value={shotClockCorrection.seconds}
                onChange={(e) => setShotClockCorrection(prev => ({ ...prev, seconds: parseInt(e.target.value) }))}
                disabled={gameState.isShotClockRunning}
              />
              <label>Sec</label>
              <input
                type="number"
                min="0"
                max="9"
                value={shotClockCorrection.tenths}
                onChange={(e) => setShotClockCorrection(prev => ({ ...prev, tenths: parseInt(e.target.value) }))}
                disabled={gameState.isShotClockRunning}
              />
              <label>Tent</label>
              <button onClick={handleShotClockCorrection} disabled={gameState.isShotClockRunning}>
                Enter
              </button>
            </div>
            <div className="shot-clock-visibility">
              <button onClick={() => updateGameState({ showShotClockOnScoreboard: !gameState.showShotClockOnScoreboard })}>
                {gameState.showShotClockOnScoreboard ? 'Hide' : 'Show'} Shotclock on Scoreboard
              </button>
            </div>
          </div>
          <div className="period-control">
            <div className="section-label">Period</div>
            <div className="digital-display small">{gameState.quarter}</div>
            <div className="period-buttons">
              <button onClick={() => updateGameState({ quarter: Math.max(1, gameState.quarter - 1) })}>-</button>
              <button onClick={() => updateGameState({ quarter: gameState.quarter + 1 })}>+</button>
            </div>
          </div>
          <div className="possession-control">
            <button onClick={() => updateGameState({ possessionTeam: gameState.possessionTeam === 'home' ? 'away' : 'home' })}>
              Switch Possession
            </button>
            <div>Possession: {gameState.possessionTeam === 'home' ? gameState.homeTeam : gameState.awayTeam}</div>
          </div>
        </div>

        <TeamControl team="away" />
      </div>

      <div className="dashboard-bottom">
        <button onClick={() => updateGameState({
          homeTimeouts: 7,
          awayTimeouts: 7
        })}>Reset Timeouts</button>
        <button onClick={() => navigate('/scoreboard')}>Go to Scoreboard</button>
      </div>
    </div>
  );
}

export default Dashboard;