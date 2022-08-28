import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../stateStore/auth-context";

const Navigation = (props) => {
  //The AuthContext holds our global state variable so we pass it into the useContext instead of using <AuthContext.consumer/>
  //Then instead of using props, we can now access our Global context using the useContext variable
  const cxt = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {cxt.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {cxt.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {cxt.isLoggedIn && (
          <li>
            <button onClick={cxt.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
