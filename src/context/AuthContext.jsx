// AuthContext.js
import { createContext, useContext, useState } from "react";
import { setAuthToken } from "../api/axiosInstance";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setAuthToken(userData.token); // set token in axios
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null); // remove token from axios
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
