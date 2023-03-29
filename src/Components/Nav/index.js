import { DefaultButton, SettingsButton } from "../Buttons";
import { useContext } from "react";
import userContext from "../../userContext";

function Nav({ toggleSettings, toggleLogin, toggleSignup, toggleShop, logout, shop }) {
  const { user } = useContext(userContext)
  return (
    <nav className="w-full fixed top-0 p-4 flex justify-end">
      {!user ? (
        <>
          <DefaultButton
            classes={`text-sm font-medium px-4`}
            label="Login"
            event={toggleLogin}
          />
          <DefaultButton
            classes={`text-sm font-medium px-4`}
            label="Sign Up"
            event={toggleSignup}
          />
        </>
      ) : (
        <>
          <DefaultButton
            classes={`text-sm font-medium px-4`}
            label="Shop"
            event={toggleShop}
          />
          <DefaultButton
            classes={`text-sm font-medium px-4`}
            label="Logout"
            event={logout}
          />
        </>
      )}
      <SettingsButton event={toggleSettings} />
    </nav>
  );
}

export default Nav;
