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

/**
 * Pomodoro Garden App
 *
 */
function App() {
  const initialUser = {
    data: null,
    isLoading: true,
  };
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [modals, setModals] = useState({
    showSettings: false,
    showLogin: false,
    showSignup: false,
    showShop: false,
  });

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

  /** Logs user into application
   *
   * data: {email, password}
   */
  async function login(data) {
    const response = await GardenAPI.login(data);
    if (response) {
      setToken(response);
      setModals({ ...modals, showLogin: false });
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
      setModals({ ...modals, showSignup: false });
    }
  }
  /** Logs user out of application */
  function logout() {
    setToken(null);
  }

  /** Ages watered plants by a day and updates user plants */
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
          toggleSettings={() =>
            setModals({ ...modals, showSettings: !modals.showSettings })
          }
          toggleLogin={() =>
            setModals({ ...modals, showLogin: !modals.showLogin })
          }
          toggleSignup={() =>
            setModals({ ...modals, showSignup: !modals.showSignup })
          }
          toggleShop={() =>
            setModals({ ...modals, showShop: !modals.showShop })
          }
        />
        {modals.showSettings && (
          <SettingsModal
            settings={settings}
            saveSettings={setSettings}
            closeModal={() =>
              setModals({ ...modals, showSettings: !modals.showSettings })
            }
          />
        )}
        {modals.showLogin && (
          <Login
            closeModal={() =>
              setModals({ ...modals, showLogin: !modals.showLogin })
            }
            login={login}
          />
        )}
        {modals.showSignup && (
          <Signup
            closeModal={() =>
              setModals({ ...modals, showSignup: !modals.showSignup })
            }
            signup={signup}
          />
        )}
        {modals.showShop && (
          <Shop
            closeModal={() =>
              setModals({ ...modals, showShop: !modals.showShop })
            }
          />
        )}
        <div className="m-2 relative w-full min-w-[500px]">
          <Pomodoro
            minutes={settings.pomodoro}
            settings={settings}
            agePlants={agePlants}
          />
          {user.data && <Garden user={user} />}
        </div>

      </userContext.Provider>
    </div>
  );
}

export default App;
