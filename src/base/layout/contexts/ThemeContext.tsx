// ThemeContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
  
  type Theme = "light" | "dark";
  
  interface ThemeContextProps {
    theme: Theme;
    toggleTheme: (changedTheme: Theme) => void;
  }
  
  const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
  
  interface ThemeProviderProps {
    children: ReactNode;
  }
  
  export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
      const storedTheme = localStorage.getItem("theme");
  
      const preferredColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";
  
      return storedTheme ? (storedTheme as Theme) : preferredColorScheme;
    });
  
    const toggleTheme = (changedTheme: Theme) => {
      setTheme(changedTheme);
    };
  
    useEffect(() => {
      const handleColorSchemeChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
      };
  
      const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQueryList.addEventListener("change", handleColorSchemeChange);
  
      // set the html tag a class called "dark" if the theme is dark, otherwise remove it
        document.documentElement.classList.toggle("dark", theme === "dark");

      localStorage.setItem("theme", theme);
  
      return () => {
        mediaQueryList.removeEventListener("change", handleColorSchemeChange);
      };
    }, [theme]); // Trigger effect on theme change
  
    useEffect(() => {
       // set the html tag a class called "dark" if the theme is dark, otherwise remove it
       document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);
  
    const contextValue: ThemeContextProps = {
      theme,
      toggleTheme,
    };
  
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };
  