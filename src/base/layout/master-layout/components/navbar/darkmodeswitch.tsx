import { useTheme } from "@base/layout/contexts/ThemeContext";
import { Switch } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Switch
      isSelected={theme === "dark"}
      onValueChange={() => {
        toggleTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
};
