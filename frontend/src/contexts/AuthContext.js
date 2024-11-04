import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Variables here
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // Functions here
  const login = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserInfo({});
  };

  const isAdminYes = () => {
    setIsAdmin(true);
  };

  // Return here
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        userInfo,
        login,
        logout,
        isAdminYes,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
