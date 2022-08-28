import React from "react";

//Pass in App or component wide state, the state that reqires it use
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
});

export default AuthContext;
