import React, { useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import PokemonList from "./components/PokemosList/PokemonsList";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import ThemeToggleButton from "./contexts/ThemeToggleButton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

const ThemedApp = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={{ mode: theme }}>
      <GlobalStyle theme={theme} />
      <Router>
        <ThemeToggleButton />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />{" "}
        </Routes>
      </Router>
    </StyledThemeProvider>
  );
};

export default App;
