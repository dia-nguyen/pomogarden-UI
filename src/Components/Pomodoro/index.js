import { useState, useEffect } from "react";
import { ButtonStartPause, ButtonTimer } from "../Buttons";

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
 *  - activeBtn: str - iden
 *
 * App -> Pomodoro
 */
function Pomodoro({ minutes, seconds = 10, agePlants }) {
  const [time, setTime] = useState({ minutes, seconds });
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [activeBtn, setActiveBtn] = useState("pomodoro");

  useEffect(() => {
    let timer;
    if (isCountingDown) {
      timer = setInterval(async () => {
        if (time.seconds === 0) {
          if (time.minutes === 0) {
            if (activeBtn === "pomodoro") {
              await agePlants();
              short();
            } else if (activeBtn === "short") {
              reset();
            }
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
  }, [activeBtn, agePlants, isCountingDown, time]);

  const start = () => setIsCountingDown(true);
  const pause = () => setIsCountingDown(false);

  const reset = () => {
    pause();
    setActiveBtn("pomodoro");
    setTime({ minutes, seconds });
  };

  const long = () => {
    pause();
    setActiveBtn("long");
    setTime({ minutes: 15, seconds });
  };

  const short = () => {
    pause();
    setActiveBtn("short");
    setTime({ minutes: 5, seconds });
  };

  return (
    <div className="pb-[3rem] rounded-lg text-white min-w-fit flex flex-col justify-center text-center items-center">
      <div className="grid grid-cols-3 gap-2">
        <ButtonTimer
          label="Pomodoro"
          event={reset}
          isActive={activeBtn === "pomodoro"}
        />
        <ButtonTimer
          label="Long Break"
          event={long}
          isActive={activeBtn === "long"}
        />
        <ButtonTimer
          label="Short Break"
          event={short}
          isActive={activeBtn === "short"}
        />
      </div>
      <p className="text-5xl font-extrabold my-5">
        {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </p>
      <ButtonStartPause
        label={isCountingDown ? "Pause" : "Start"}
        event={isCountingDown ? pause : start}
      />
    </div>
  );
}

export default Pomodoro;
