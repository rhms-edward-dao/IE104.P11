import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Variables here
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // Initialize the context state based on sessionStorage when the app is loaded
  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    const storedUserInfo = sessionStorage.getItem("userInfo");

    if (storedIsLoggedIn === "true" && storedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      setIsLoggedIn(false); // If hasnt been logged yet, this value will be false
    }
  }, []);

  // Functions here
  const login = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userInfo", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserInfo({});
    // Clear session storage
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userInfo");
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
