import { useState, useEffect, useCallback } from "react";
import { ButtonStartPause, ButtonTimer } from "../Buttons";
import { TIMER_TYPES } from "../../constants";

/**
 * Pomodoro timer
 * Timer that counts down from several presets or custom times.
 * Allows for starting, pausing and resetting timer.
 *
 * Props:
 *  - minutes: int representing minutes (default 25)
 *  - seconds: int representing seconds (default 0)
 *
 * States:
 *  - time: {minutes, seconds}
 *  - isCountingDown: boolean
 *  - currentTimer: str - iden
 *
 * App -> Pomodoro
 */
function Pomodoro({ minutes = 25, seconds = 0, settings, agePlants }) {
  const [time, setTime] = useState({ minutes, seconds });
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("pomodoro");

  const { pomodoro, long, short } = settings;

  const handleTimerChange = useCallback(
    (type, minutes) => {
      pauseTimer();
      setCurrentTimer(type);
      setTime({ minutes, seconds });
    },
    [seconds]
  );

  const reset = useCallback(() => {
    handleTimerChange(TIMER_TYPES.POMODORO, pomodoro);
  }, [handleTimerChange, pomodoro]);

  const handleLongBreak = useCallback(() => {
    handleTimerChange(TIMER_TYPES.LONG, long);
  }, [handleTimerChange, long]);

  const handleShortBreak = useCallback(() => {
    handleTimerChange(TIMER_TYPES.SHORT, short);
  }, [handleTimerChange, short]);

  const handleFinishTimer = useCallback(async () => {
    handleTimerChange(TIMER_TYPES.POMODORO, pomodoro);
    if (currentTimer === TIMER_TYPES.POMODORO) {
      await agePlants();
      handleShortBreak();
    } else if (currentTimer === TIMER_TYPES.SHORT) {
      reset();
    }
  }, [agePlants, currentTimer, handleShortBreak, handleTimerChange, pomodoro, reset]);

  const start = () => setIsCountingDown(true);
  const pauseTimer = () => setIsCountingDown(false);

  useEffect(() => {
    let timer;

    if (isCountingDown) {
      timer = setInterval(async () => {
        if (time.seconds === 0) {
          if (time.minutes === 0) {
            handleFinishTimer();
            return clearInterval(timer);

          } else {
            setTime({ minutes: time.minutes - 1, seconds: 59 });
          }
        } else {
          setTime({ ...time, seconds: time.seconds - 1 });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [handleFinishTimer, isCountingDown, time]);


  return (
    <div className="pb-[3rem] rounded-lg text-white min-w-fit flex flex-col justify-center text-center items-center">
      <div className="grid grid-cols-3 gap-2">
        <ButtonTimer
          label="Pomodoro"
          event={reset}
          isActive={currentTimer === "pomodoro"}
        />
        <ButtonTimer
          label="Long Break"
          event={handleLongBreak}
          isActive={currentTimer === "long"}
        />
        <ButtonTimer
          label="Short Break"
          event={handleShortBreak}
          isActive={currentTimer === "short"}
        />
      </div>
      <p className="text-5xl font-extrabold my-5">
        {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </p>
      <ButtonStartPause
        label={isCountingDown ? "Pause" : "Start"}
        event={isCountingDown ? pauseTimer : start}
      />
    </div>
  );
}

export default Pomodoro;
