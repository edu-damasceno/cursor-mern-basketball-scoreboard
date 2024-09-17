import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const GameContext = createContext();

const socket = io(`https://cursor-mern-basketball-scoreboard.onrender.com`, {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

const initialGameState = {
  homeTeam: 'Home',
  awayTeam: 'Away',
  homeScore: 0,
  awayScore: 0,
  homeFouls: 0,
  awayFouls: 0,
  quarter: 1,
  possessionTeam: 'home',
  timeRemaining: 720,
  shotClock: 24,
  isRunning: false,
  isShotClockRunning: false,
  homeTimeouts: 7,
  awayTimeouts: 7,
  showShotClockOnScoreboard: true,
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialGameState);
  const timerRef = useRef(null);

  const updateGameState = useCallback((updatedState) => {
    setGameState(prevState => {
      const newState = { ...prevState, ...updatedState };
      console.log('Updating game state:', newState);
      socket.emit('updateGame', newState);
      return newState;
    });
  }, []);

  const handleScoreChange = useCallback((team, change) => {
    console.log(`Score change: ${team} ${change}`);
    updateGameState({
      [`${team}Score`]: gameState[`${team}Score`] + change,
      shotClock: 24 // Reset shot clock on score
    });
  }, [gameState, updateGameState]);

  const handleFoulChange = useCallback((team, change) => {
    updateGameState({ [`${team}Fouls`]: Math.max(0, gameState[`${team}Fouls`] + change) });
  }, [gameState, updateGameState]);

  const handleTimeoutChange = useCallback((team, change) => {
    updateGameState({ [`${team}Timeouts`]: Math.max(0, gameState[`${team}Timeouts`] + change) });
  }, [gameState, updateGameState]);

  const resetShotClock = useCallback((time) => {
    updateGameState({ shotClock: time });
  }, [updateGameState]);

  const toggleShotClock = useCallback(() => {
    updateGameState(prevState => ({ isShotClockRunning: !prevState.isShotClockRunning }));
  }, [updateGameState]);

  const updateShotClock = useCallback((time) => {
    updateGameState({ shotClock: time });
  }, [updateGameState]);

  const startClientTimer = useCallback(() => {
    console.log('Starting client timer');
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setGameState(prevState => {
        const newTimeRemaining = Math.max(0, prevState.timeRemaining - 0.1);
        const newShotClock = prevState.isShotClockRunning ?
          Math.max(0, prevState.shotClock - 0.1) :
          prevState.shotClock;

        if (newShotClock === 0) {
          console.log('Shot clock expired');
          return {
            ...prevState,
            timeRemaining: newTimeRemaining,
            shotClock: 24,
            isShotClockRunning: false,
          };
        }

        return {
          ...prevState,
          timeRemaining: newTimeRemaining,
          shotClock: newShotClock,
        };
      });
    }, 100);
  }, []);

  const stopClientTimer = useCallback(() => {
    console.log('Stopping client timer');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggleTimer = useCallback(() => {
    const newIsRunning = !gameState.isRunning;
    console.log(`Toggling timer: ${newIsRunning ? 'Start' : 'Stop'}`);
    updateGameState({
      isRunning: newIsRunning,
      isShotClockRunning: newIsRunning // Sync shot clock with main timer
    });
    if (newIsRunning) {
      socket.emit('startTimer');
      startClientTimer();
    } else {
      socket.emit('stopTimer');
      stopClientTimer();
    }
  }, [gameState.isRunning, updateGameState, startClientTimer, stopClientTimer]);

  useEffect(() => {
    const handleGameUpdate = (updatedGame) => {
      console.log('Client received game update:', updatedGame);
      setGameState(prevState => ({
        ...prevState,
        ...updatedGame,
        timeRemaining: Number(updatedGame.timeRemaining.toFixed(1)),
        shotClock: Number(updatedGame.shotClock.toFixed(1))
      }));

      if (updatedGame.isRunning) {
        startClientTimer();
      } else {
        stopClientTimer();
      }
    };

    socket.on('gameUpdated', handleGameUpdate);

    return () => {
      socket.off('gameUpdated', handleGameUpdate);
      stopClientTimer();
    };
  }, [startClientTimer, stopClientTimer]);

  return (
    <GameContext.Provider value={{
      gameState,
      updateGameState,
      handleScoreChange,
      handleFoulChange,
      handleTimeoutChange,
      toggleTimer,
      resetShotClock,
      toggleShotClock,
      updateShotClock,
    }}>
      {children}
    </GameContext.Provider>
  );
};