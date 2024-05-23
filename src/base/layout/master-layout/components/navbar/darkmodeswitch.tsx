import { useTheme } from "@base/layout/contexts/ThemeContext";
import { Switch } from "@nextui-org/react";
import { Icon } from "@iconify/react";
export const DarkModeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Switch
      isSelected={theme === "dark"}
      onValueChange={() => {
        toggleTheme(theme === "dark" ? "light" : "dark");
      }}
      thumbIcon={({ isSelected }) =>
        isSelected ? (
          <Icon icon="ph:sun-bold" className="text-default-100" />
        ) : (
          <Icon icon="ph:moon-bold" className="text-default-900" />
        )
      }
    />
  );
};
