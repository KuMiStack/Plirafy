import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  accentOptions,
  backgroundOptions,
  createPlirafyTheme,
  defaultThemeSettings,
  type AccentColorId,
  type BackgroundThemeId,
  type PlirafyThemeSettings,
} from "./theme";

type PlirafyThemeContextValue = {
  settings: PlirafyThemeSettings;
  setBackground: (background: BackgroundThemeId) => void;
  setAccentStart: (accentStart: AccentColorId) => void;
  setAccentEnd: (accentEnd: AccentColorId) => void;
};

const PlirafyThemeContext = createContext<PlirafyThemeContextValue | null>(null);
const storageKey = "plirafy-theme-settings";

const backgroundIds = new Set(backgroundOptions.map((option) => option.id));
const accentIds = new Set(accentOptions.map((option) => option.id));

const isBackgroundId = (value: unknown): value is BackgroundThemeId =>
  typeof value === "string" && backgroundIds.has(value as BackgroundThemeId);

const isAccentId = (value: unknown): value is AccentColorId =>
  typeof value === "string" && accentIds.has(value as AccentColorId);

const loadThemeSettings = (): PlirafyThemeSettings => {
  if (typeof window === "undefined") {
    return defaultThemeSettings;
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      return defaultThemeSettings;
    }

    const parsedValue = JSON.parse(storedValue) as Partial<PlirafyThemeSettings>;

    return {
      background: isBackgroundId(parsedValue.background)
        ? parsedValue.background
        : defaultThemeSettings.background,
      accentStart: isAccentId(parsedValue.accentStart)
        ? parsedValue.accentStart
        : defaultThemeSettings.accentStart,
      accentEnd: isAccentId(parsedValue.accentEnd)
        ? parsedValue.accentEnd
        : defaultThemeSettings.accentEnd,
    };
  } catch {
    return defaultThemeSettings;
  }
};

type PlirafyThemeProviderProps = {
  children: ReactNode;
};

export function PlirafyThemeProvider({ children }: PlirafyThemeProviderProps) {
  const [settings, setSettings] = useState<PlirafyThemeSettings>(loadThemeSettings);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings]);

  const theme = useMemo(() => createPlirafyTheme(settings), [settings]);

  const value = useMemo<PlirafyThemeContextValue>(
    () => ({
      settings,
      setBackground: (background) =>
        setSettings((current) => ({ ...current, background })),
      setAccentStart: (accentStart) =>
        setSettings((current) => ({ ...current, accentStart })),
      setAccentEnd: (accentEnd) =>
        setSettings((current) => ({ ...current, accentEnd })),
    }),
    [settings]
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
