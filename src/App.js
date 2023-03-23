import { useState } from "react";
import { SettingsButton } from "./Components/Buttons";
import Pomodoro from "./Components/Pomodoro";
import SettingsModal from "./Components/Settings";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    pomodoro: 25,
    long: 15,
    short: 5,
  });
  return (
    <div className="App bg-purple-300">
      <Pomodoro key={settings.pomodoro} minutes={settings.pomodoro} />
      {/* <button onClick={() => setShowSettings(!showSettings)}>
        show settings
      </button> */}
      <SettingsButton event={() => setShowSettings(!showSettings)} />
      {showSettings && <SettingsModal settings={setSettings} closeModal={() => setShowSettings(!showSettings)}/>}
    </div>
  );
}

export default App;
