import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import './Scoreboard.css';

function Scoreboard() {
  const { gameState } = useContext(GameContext);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const tenths = Math.floor((remainingSeconds % 1) * 10);
    return `${minutes.toString().padStart(2, '0')}:${Math.floor(remainingSeconds).toString().padStart(2, '0')}.${tenths}`;
  };

  return (
    <div className="scoreboard">
      <div className="arena-name">Marine Arena</div>
      <div className="main-display">
        <div className="team home">
          <img src="/path-to-shark-logo.png" alt="Boston Sharks" className="team-logo" />
          <div className="team-name">Boston Sharks</div>
          <div className="score">{gameState.homeScore}</div>
          <div className="bonus">BONUS</div>
          <div className="team-foul">
            <div className="label">Team Foul</div>
            <div className="value">{gameState.homeFouls}</div>
          </div>
          <div className="timeout">
            <div className="label">Time-out</div>
            <div className="value">{gameState.homeTimeouts}</div>
          </div>
        </div>
        <div className="center-panel">
          <div className="game-clock">{formatTime(gameState.timeRemaining)}</div>
          <div className="shot-clock">{Math.ceil(gameState.shotClock)}</div>
          <div className="period">
            <div className="label">Period</div>
            <div className="value">{gameState.quarter}</div>
          </div>
        </div>
        <div className="team away">
          <img src="/path-to-eagle-logo.png" alt="Chicago Eagles" className="team-logo" />
          <div className="team-name">Chicago Eagles</div>
          <div className="score">{gameState.awayScore}</div>
          <div className="bonus">BONUS</div>
          <div className="team-foul">
            <div className="label">Team Foul</div>
            <div className="value">{gameState.awayFouls}</div>
          </div>
          <div className="timeout">
            <div className="label">Time-out</div>
            <div className="value">{gameState.awayTimeouts}</div>
          </div>
        </div>
      </div>
      <div className="player-fouls home">
        {/* Player foul displays for home team */}
      </div>
      <div className="player-fouls away">
        {/* Player foul displays for away team */}
      </div>
    </div>
  );
}

export default Scoreboard;