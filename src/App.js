import "./App.css";
import React, { useState } from "react";
import Audio from "./Timer_Sound_Effect.mp3";
function App() {
  const [timerObj, setTimerObj] = useState({
    minutes: 0,
    seconds: "0" + 0,
    timerId: 0,
  });
  const [buttonsManager, setButtonsManager] = useState({
    start: true,
    pause: false,
    stop: false,
  });

  function soundAlarm() {
    let amount = 3;
    let audio = new Audio(Audio);

    function playSound() {
      audio.pause();
      audio.currentTime = 9;
      audio.play();
    }
    for (let i = 0; i < amount; i++) {
      setTimeout(playSound, 1200 * i);
    }
  }
  function startTimer() {
    setButtonsManager({
      ...buttonsManager,
      start: false,
      pause: true,
      stop: true,
    });

    timerObj.timerId = setInterval(function () {
      timerObj.seconds--;

      if (timerObj.seconds < 0) {
        if (timerObj.minutes === 0) {
          soundAlarm();
          return startTimer();
        }
        timerObj.seconds = 59;
        timerObj.minutes--;
      }
      setTimerObj({
        ...timerObj,
        minutes: timerObj.minutes,
        seconds:
          timerObj.seconds < 10 ? "0" + timerObj.seconds : timerObj.seconds,
      });
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timerObj.timerId);
    setButtonsManager({
      ...buttonsManager,
      start: true,
      pause: false,
      stop: false,
    });
    setTimerObj({
      ...timerObj,
      minutes: timerObj.minutes,
      seconds: timerObj.seconds,
    });
  }

  function pauseTimer() {
    setButtonsManager({
      ...buttonsManager,
      start: true,
      pause: false,
      stop: true,
    });
    clearInterval(timerObj.timerId);
  }
  return (
    <div className="App">
      <h1>ClockWorks</h1>
      <section id="controls">
        <div className="input-group">
          <label htmlFor="minutes-input">Minutes</label>
          <input
            type="number"
            placeholder="0"
            id="minutes-input"
            min="0"
            max="300"
            onChange={(e) =>
              setTimerObj({ ...timerObj, minutes: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="seconds-input">Seconds</label>
          <input
            type="number"
            placeholder="0"
            id="seconds-input"
            min="0"
            max="59"
            step="5"
            value={timerObj.seconds}
            onChange={(e) =>
              setTimerObj({
                ...timerObj,
                seconds:
                  e.target.value < 10 ? "0" + e.target.value : e.target.value,
              })
            }
          />
        </div>
        <button
          type="button"
          id="start-button"
          onClick={() => startTimer()}
          disabled={!buttonsManager.start}
        >
          start
        </button>
        <button
          type="button"
          id="stop-button"
          onClick={() => stopTimer()}
          disabled={buttonsManager.start}
        >
          stop
        </button>
        <button
          type="button"
          id="pause-button"
          onClick={() => pauseTimer()}
          disabled={buttonsManager.start}
        >
          pause
        </button>
      </section>
      <h2>
        <span id="minutes"> {timerObj.minutes}</span>:
        <span id="seconds">{timerObj.seconds}</span>
      </h2>
    </div>
  );
}

export default App;
