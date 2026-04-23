import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useUserStore } from "../../Pages/LoginPage/store/useUserStore";
import {
  createPlirafyTheme,
  type AccentColorValue,
  type BackgroundThemeId,
  type PlirafyThemeSettings,
} from "./theme";

type PlirafyThemeContextValue = {
  settings: PlirafyThemeSettings;
  setBackground: (background: BackgroundThemeId) => void;
  setAccentStart: (accentStart: AccentColorValue) => void;
  setAccentEnd: (accentEnd: AccentColorValue) => void;
};

const PlirafyThemeContext = createContext<PlirafyThemeContextValue | null>(null);

type PlirafyThemeProviderProps = {
  children: ReactNode;
};

export function PlirafyThemeProvider({ children }: PlirafyThemeProviderProps) {
  const settings = useUserStore((state) => state.themeSettings);
  const setThemeSettings = useUserStore((state) => state.setThemeSettings);

  const theme = useMemo(() => createPlirafyTheme(settings), [settings]);

  const value = useMemo<PlirafyThemeContextValue>(
    () => ({
      settings,
      setBackground: (background) =>
        setThemeSettings({ ...settings, background }),
      setAccentStart: (accentStart) =>
        setThemeSettings({ ...settings, accentStart }),
      setAccentEnd: (accentEnd) =>
        setThemeSettings({ ...settings, accentEnd }),
    }),
    [setThemeSettings, settings]
  );

  return (
    <PlirafyThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PlirafyThemeContext.Provider>
  );
}

export const usePlirafyTheme = () => {
  const context = useContext(PlirafyThemeContext);

  if (!context) {
    throw new Error("usePlirafyTheme must be used inside PlirafyThemeProvider");
  }

  return context;
};
