import React, { useContext } from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { ThemeContext } from "./ThemeContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext); // ✅ Use `useContext`

  return (
    <header className={`header ${theme}`}>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Header;
