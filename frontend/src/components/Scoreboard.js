import React, { useContext, useState } from 'react';
import { GameContext } from '../GameContext';
import './Scoreboard.css';
import { formatTime } from '../utils/timeUtils';

function Scoreboard() {
  const { gameState } = useContext(GameContext);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="scoreboard">
      <button className="fullscreen-toggle" onClick={toggleFullScreen}>
        {isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </button>
      <div className="main-display">
        <div className="team home">
          {gameState.homeLogo ? (
            <img src={gameState.homeLogo} alt={gameState.homeTeam} className="team-logo" />
          ) : (
            <div className="team-logo-placeholder">{gameState.homeTeam[0]}</div>
          )}
          <div className="team-name">{gameState.homeTeam}</div>
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
          {gameState.awayLogo ? (
            <img src={gameState.awayLogo} alt={gameState.awayTeam} className="team-logo" />
          ) : (
            <div className="team-logo-placeholder">{gameState.awayTeam[0]}</div>
          )}
          <div className="team-name">{gameState.awayTeam}</div>
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