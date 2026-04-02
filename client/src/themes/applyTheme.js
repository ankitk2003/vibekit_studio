import { themes } from "./themeTokens";

export const applyTheme = (themeName) => {
  const theme = themes[themeName];
  if (!theme) return;

  Object.entries(theme.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};