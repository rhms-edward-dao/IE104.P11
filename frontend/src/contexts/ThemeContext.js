import { createContext, useState, useEffect, useContext } from "react";

// Create Theme Comtext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Variables here
  const [theme, setTheme] = useState("light");

  // Use Effect here
  useEffect(() => {
    // Load theme from localStorage or use 'light' as default
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  //Functions here
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
