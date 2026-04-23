import { createTheme } from "@mui/material/styles";

export type BackgroundThemeId = "black" | "gray" | "white" | "darkBlue";
export type AccentColorId =
  | "blue"
  | "purple"
  | "rose"
  | "cyan"
  | "gold"
  | "white";
export type AccentColorValue = AccentColorId | `#${string}`;

export type PlirafyThemeSettings = {
  background: BackgroundThemeId;
  accentStart: AccentColorValue;
  accentEnd: AccentColorValue;
};

type BackgroundOption = {
  id: BackgroundThemeId;
  label: string;
  swatch: string;
  mode: "dark" | "light";
  default: string;
  paper: string;
  paperGlass: string;
  appBar: string;
  drawer: string;
  input: string;
  inputAutofill: string;
  inputBorder: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;
  overlay: string;
  logoShadow: string;
};

type AccentOption = {
  id: AccentColorId;
  label: string;
  main: string;
  hover: string;
  shadow: string;
  contrastText: string;
};

export const isHexColor = (value: unknown): value is `#${string}` =>
  typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);

const hexToRgb = (hex: string) => {
  const normalizedHex = hex.replace("#", "");
  const value = Number.parseInt(normalizedHex, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const getContrastText = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.64 ? "#111827" : "#ffffff";
};

const getColorShadow = (hex: string, opacity = 0.35) => {
  const { r, g, b } = hexToRgb(hex);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const defaultThemeSettings: PlirafyThemeSettings = {
  background: "black",
  accentStart: "purple",
  accentEnd: "blue",
};

export const backgroundOptions: BackgroundOption[] = [
  {
    id: "black",
    label: "Black",
    swatch: "#050816",
    mode: "dark",
    default: "#0b0f1a",
    paper: "#121826",
    paperGlass: "rgba(20, 20, 40, 0.55)",
    appBar: "rgba(10, 10, 30, 0.58)",
    drawer: "rgba(18, 24, 38, 0.96)",
    input: "#1a2233",
    inputAutofill: "#1a2233",
    inputBorder: "#2f3b52",
    textPrimary: "#e5e7eb",
    textSecondary: "#9ca3af",
    divider: "rgba(124, 92, 255, 0.18)",
    overlay:
      "radial-gradient(circle at center, rgba(10,10,30,0.6), rgba(5,5,15,0.9))",
    logoShadow: "rgba(124, 92, 255, 0.45)",
  },
  {
    id: "gray",
    label: "Grayish",
    swatch: "#4b5563",
    mode: "dark",
    default: "#2f3644",
    paper: "#3b4352",
    paperGlass: "rgba(55, 65, 81, 0.64)",
    appBar: "rgba(47, 54, 68, 0.72)",
    drawer: "rgba(49, 57, 70, 0.96)",
    input: "#465062",
    inputAutofill: "#465062",
    inputBorder: "#647084",
    textPrimary: "#f8fafc",
    textSecondary: "#d1d5db",
    divider: "rgba(255, 255, 255, 0.14)",
    overlay:
      "radial-gradient(circle at center, rgba(75,85,99,0.46), rgba(31,41,55,0.86))",
    logoShadow: "rgba(255, 255, 255, 0.18)",
  },
  {
    id: "white",
    label: "White",
    swatch: "#f8fafc",
    mode: "light",
    default: "#f7f8fb",
    paper: "#ffffff",
    paperGlass: "rgba(255, 255, 255, 0.72)",
    appBar: "rgba(255, 255, 255, 0.7)",
    drawer: "rgba(255, 255, 255, 0.96)",
    input: "#f3f5f9",
    inputAutofill: "#f3f5f9",
    inputBorder: "#d6dce8",
    textPrimary: "#111827",
    textSecondary: "#5f6b7a",
    divider: "rgba(17, 24, 39, 0.12)",
    overlay:
      "radial-gradient(circle at center, rgba(255,255,255,0.42), rgba(235,239,247,0.84))",
    logoShadow: "rgba(17, 24, 39, 0.16)",
  },
  {
    id: "darkBlue",
    label: "Dark Blue",
    swatch: "#071d3a",
    mode: "dark",
    default: "#07182f",
    paper: "#0d2442",
    paperGlass: "rgba(8, 31, 59, 0.64)",
    appBar: "rgba(5, 24, 48, 0.68)",
    drawer: "rgba(8, 30, 56, 0.96)",
    input: "#102b4d",
    inputAutofill: "#102b4d",
    inputBorder: "#21476f",
    textPrimary: "#e8f3ff",
    textSecondary: "#a8c0d9",
    divider: "rgba(91, 184, 255, 0.18)",
    overlay:
      "radial-gradient(circle at center, rgba(9,43,82,0.58), rgba(3,12,28,0.9))",
    logoShadow: "rgba(58, 160, 255, 0.38)",
  },
];

export const accentOptions: AccentOption[] = [
  {
    id: "blue",
    label: "Blue",
    main: "#3aa0ff",
    hover: "#2f8ae6",
    shadow: "rgba(58, 160, 255, 0.35)",
    contrastText: "#ffffff",
  },
  {
    id: "purple",
    label: "Purple",
    main: "#7c5cff",
    hover: "#6a4de0",
    shadow: "rgba(124, 92, 255, 0.35)",
    contrastText: "#ffffff",
  },
  {
    id: "rose",
    label: "Rose",
    main: "#ff5c9a",
    hover: "#e84c87",
    shadow: "rgba(255, 92, 154, 0.35)",
    contrastText: "#ffffff",
  },
  {
    id: "cyan",
    label: "Cyan",
    main: "#22d3ee",
    hover: "#12b9d4",
    shadow: "rgba(34, 211, 238, 0.32)",
    contrastText: "#06202a",
  },
  {
    id: "gold",
    label: "Gold",
    main: "#f8c14a",
    hover: "#dfa82f",
    shadow: "rgba(248, 193, 74, 0.34)",
    contrastText: "#201400",
  },
  {
    id: "white",
    label: "White",
    main: "#ffffff",
    hover: "#e5e7eb",
    shadow: "rgba(255, 255, 255, 0.28)",
    contrastText: "#111827",
  },
];

const findBackground = (id: BackgroundThemeId) =>
  backgroundOptions.find((option) => option.id === id) ?? backgroundOptions[0];

const findAccent = (value: AccentColorValue): AccentOption => {
  const preset = accentOptions.find((option) => option.id === value);

  if (preset) {
    return preset;
  }

  if (isHexColor(value)) {
    return {
      id: "blue",
      label: "Custom",
      main: value,
      hover: value,
      shadow: getColorShadow(value),
      contrastText: getContrastText(value),
    };
  }

  return accentOptions[0];
};

export const getPlirafyThemeParts = (settings: PlirafyThemeSettings) => {
  const background = findBackground(settings.background);
  const accentStart = findAccent(settings.accentStart);
  const accentEnd = findAccent(settings.accentEnd);
  const gradient = `linear-gradient(90deg, ${accentStart.main}, ${accentEnd.main})`;
  const hoverGradient = `linear-gradient(90deg, ${accentStart.hover}, ${accentEnd.hover})`;
  const buttonText =
    accentStart.contrastText === "#111827" && accentEnd.contrastText === "#111827"
      ? "#111827"
      : "#ffffff";

  return {
    background,
    accentStart,
    accentEnd,
    gradient,
    hoverGradient,
    buttonText,
  };
};

export const createPlirafyTheme = (settings: PlirafyThemeSettings) => {
  const { background, accentStart, accentEnd, gradient, hoverGradient, buttonText } =
    getPlirafyThemeParts(settings);

  return createTheme({
    palette: {
      mode: background.mode,
      background: {
        default: background.default,
        paper: background.paper,
      },
      primary: {
        main: accentStart.main,
        contrastText: accentStart.contrastText,
      },
      secondary: {
        main: accentEnd.main,
        contrastText: accentEnd.contrastText,
      },
      text: {
        primary: background.textPrimary,
        secondary: background.textSecondary,
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            "--plirafy-gradient": gradient,
            "--plirafy-hover-gradient": hoverGradient,
            "--plirafy-accent-start": accentStart.main,
            "--plirafy-accent-end": accentEnd.main,
            "--plirafy-accent-shadow": accentStart.shadow,
            "--plirafy-paper-glass": background.paperGlass,
            "--plirafy-appbar-bg": background.appBar,
            "--plirafy-drawer-bg": background.drawer,
            "--plirafy-divider": background.divider,
            "--plirafy-background-overlay": background.overlay,
            "--plirafy-logo-shadow": background.logoShadow,
            "--plirafy-input-bg": background.input,
            "--plirafy-input-autofill": background.inputAutofill,
            "--plirafy-input-border": background.inputBorder,
            "--plirafy-button-text": buttonText,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: background.paper,
            backgroundImage: "none",
            boxShadow: `0 0 18px ${accentStart.shadow}`,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: 10,
            textTransform: "none",
            paddingTop: 10,
            paddingBottom: 10,
          },
          contained: {
            color: buttonText,
            background: gradient,
            boxShadow: "none",
          },
        },
        variants: [
          {
            props: { variant: "contained" },
            style: {
              "&:hover": {
                background: hoverGradient,
                boxShadow: `0 0 12px ${accentStart.shadow}`,
              },
            },
          },
        ],
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: background.input,
            borderRadius: 10,
            transition: "all 0.2s ease",

            "& input": {
              color: background.textPrimary,
            },

            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 100px ${background.inputAutofill} inset`,
              WebkitTextFillColor: background.textPrimary,
              borderRadius: "10px",
            },

            "& input:-webkit-autofill:hover": {
              WebkitBoxShadow: `0 0 0 100px ${background.inputAutofill} inset`,
            },

            "& input:-webkit-autofill:focus": {
              WebkitBoxShadow: `0 0 0 100px ${background.inputAutofill} inset`,
            },

            "& fieldset": {
              borderColor: background.inputBorder,
            },
            "&:hover fieldset": {
              borderColor: accentStart.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: accentEnd.main,
              borderWidth: 1.5,
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: background.textSecondary,
            "&.Mui-focused": {
              color: accentEnd.main,
            },
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            color: background.textPrimary,
          },
        },
      },
    },
  });
};

const theme = createPlirafyTheme(defaultThemeSettings);

export default theme;
