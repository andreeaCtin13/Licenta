// AuthProvider.js
import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userC, setUserC] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const login = (userData) => {
    setUserC(userData);
  };

  const logout = () => {
    setUserC(false);
  };

  return (
    <AuthContext.Provider value={{ userC, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
