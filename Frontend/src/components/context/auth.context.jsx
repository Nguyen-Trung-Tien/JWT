import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    email: "",
    name: "",
  },
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
    appLoading: true,
  });

  const [appLoading, setAppLoading] = useState(true);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        appLoading,
        setAppLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
