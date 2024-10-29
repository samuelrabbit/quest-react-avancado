import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");
  console.log(theme);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
