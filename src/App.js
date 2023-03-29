import { useState, useEffect } from "react";
import userContext from "./userContext";
import Garden from "./Components/Garden";
import Nav from "./Components/Nav";
import Pomodoro from "./Components/Pomodoro";
import SettingsModal from "./Components/Settings";
import Login from "./Components/AuthForms/Login";
import Signup from "./Components/AuthForms/Signup";
import GardenAPI from "./api";
import decode from "jwt-decode";
import Shop from "./Components/Shop";
import Cursor from "./Components/Cursor";

function App() {
  const initialUser = {
    data: null,
    isLoading: true,
  };
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      pomodoro: 25,
      long: 15,
      short: 5,
    }
  );

  useEffect(
    function updateLocalStorage() {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },
    [token]
  );

  useEffect(
    function fetchUserWhenMounted() {
      async function fetchUserPlants() {
        if (token) {
          const { sub } = decode(token);
          GardenAPI.token = token;
          const user = await GardenAPI.getUser(sub);
          try {
            const res = await GardenAPI.getPlants();
            setUser({
              data: {
                ...user,
                plants: res.plants,
              },
              isLoading: false,
            });
          } catch (err) {
            //handle error
            setUser({
              data: null,
              isLoading: false,
            });
          }
        } else {
          setUser({
            data: null,
            isLoading: false,
          });
        }
      }
      fetchUserPlants();
    },
    [token]
  );

  console.log('user',user);

  /** Logs user into application
   *
   * data: {email, password}
   */
  async function login(data) {
    const response = await GardenAPI.login(data);
    if (response) {
      setToken(response);
      setShowLogin(false);
    }
  }

  /** Logs user into application
   *
   * data: {email, password}
   */
  async function signup(data) {
    const response = await GardenAPI.signup(data);
    if (response) {
      setToken(response);
      setShowLogin(false);
    }
  }

  /** Logs user out of application */
  function logout() {
    setToken(null);
  }

  async function agePlants() {
    const response = await GardenAPI.agePlants();
    if (response) {
      setUser({
        data: {
          ...user,
          plants: response.plants,
        },
        isLoading: false,
      });
    }
  }

  if (user.isLoading) return <h1>Loading</h1>;

  return (
    <div className="App">
      <userContext.Provider value={{ user: user.data, setUser }}>
        <Nav
          user={user}
          logout={logout}
          toggleSettings={() => setShowSettings(!showSettings)}
          toggleLogin={() => setShowLogin(!showLogin)}
          toggleSignup={() => setShowSignup(!showSignup)}
          toggleShop={() => setShowShop(!showShop)}
        />
        <div className="m-2 relative w-4/12 min-w-[500px]">
          <Pomodoro key={settings.pomodoro} minutes={settings.pomodoro} agePlants={agePlants}/>
          {user.data && <Garden user={user} />}
        </div>
        {showSettings && (
          <SettingsModal
            settings={settings}
            saveSettings={setSettings}
            closeModal={() => setShowSettings(!showSettings)}
          />
        )}
        {showLogin && (
          <Login closeModal={() => setShowLogin(!showLogin)} login={login} />
        )}
        {showSignup && (
          <Signup
            closeModal={() => setShowSignup(!showSignup)}
            signup={signup}
          />
        )}
        {showShop && <Shop closeModal={() => setShowShop(!showShop)} />}
      </userContext.Provider>
    </div>
  );
}

export default App;
