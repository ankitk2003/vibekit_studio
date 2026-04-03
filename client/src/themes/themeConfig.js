/**
 * VibeKit Studio Theme System
 * CSS variables-based design tokens for consistent theming
 * Each theme defines: colors, typography, spacing, radius, shadows
 */

export const THEMES = {
  minimal: {
    name: "Minimal",
    colors: {
      background: "#FFFFFF",
      surface: "#F5F5F5",
      text: "#1A1A1A",
      textSecondary: "#666666",
      accent: "#000000",
      accentLight: "#E8E8E8",
      border: "#D9D9D9",
    },
    typography: {
      headingFont: "system-ui, -apple-system, sans-serif",
      bodyFont: "system-ui, -apple-system, sans-serif",
      headingWeight: "700",
      bodyWeight: "400",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "3rem",
      xxl: "4rem",
    },
    radius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
      full: "9999px",
    },
    button: {
      style: "solid",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
    },
  },

  "neo-brutal": {
    name: "Neo-Brutal",
    colors: {
      background: "#FFFBF0",
      surface: "#FFF8F3",
      text: "#0F0F0F",
      textSecondary: "#555555",
      accent: "#FF006E",
      accentLight: "#FFC2D1",
      border: "#000000",
    },
    typography: {
      headingFont: '"Courier New", monospace',
      bodyFont: '"Courier New", monospace',
      headingWeight: "900",
      bodyWeight: "400",
    },
    spacing: {
      xs: "0.75rem",
      sm: "1.5rem",
      md: "2rem",
      lg: "2.5rem",
      xl: "3rem",
      xxl: "4rem",
    },
    radius: {
      sm: "0px",
      md: "0px",
      lg: "0px",
      full: "0px",
    },
    button: {
      style: "solid",
      padding: "14px 28px",
      fontSize: "18px",
      fontWeight: "900",
      border: "3px solid #000000",
    },
  },

  "dark-neon": {
    name: "Dark Neon",
    colors: {
      background: "#0A0E27",
      surface: "#16213E",
      text: "#00D9FF",
      textSecondary: "#00D9FF",
      accent: "#FF006E",
      accentLight: "#FF00BB",
      border: "#00D9FF",
    },
    typography: {
      headingFont: '"Courier New", monospace',
      bodyFont: '"Courier New", monospace',
      headingWeight: "700",
      bodyWeight: "400",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "3rem",
      xxl: "4rem",
    },
    radius: {
      sm: "2px",
      md: "4px",
      lg: "8px",
      full: "9999px",
    },
    button: {
      style: "solid",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "700",
      boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)",
    },
  },

  "pastel-soft": {
    name: "Pastel Soft",
    colors: {
      background: "#FFF5F9",
      surface: "#FFFAFB",
      text: "#6B5B7D",
      textSecondary: "#9B8FB8",
      accent: "#E8B4D1",
      accentLight: "#F5DCED",
      border: "#E8D5E6",
    },
    typography: {
      headingFont: '"Trebuchet MS", sans-serif',
      bodyFont: '"Trebuchet MS", sans-serif',
      headingWeight: "600",
      bodyWeight: "400",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "3rem",
      xxl: "4rem",
    },
    radius: {
      sm: "12px",
      md: "16px",
      lg: "20px",
      full: "9999px",
    },
    button: {
      style: "solid",
      padding: "12px 28px",
      fontSize: "16px",
      fontWeight: "600",
      boxShadow: "0 4px 12px rgba(232, 180, 209, 0.3)",
    },
  },

  "luxury-serif": {
    name: "Luxury Serif",
    colors: {
      background: "#FAF8F3",
      surface: "#FFFFFF",
      text: "#2C2C2C",
      textSecondary: "#6B6B6B",
      accent: "#B8860B",
      accentLight: "#DAA520",
      border: "#D4AF37",
    },
    typography: {
      headingFont: '"Georgia", serif',
      bodyFont: '"Georgia", serif',
      headingWeight: "700",
      bodyWeight: "400",
    },
    spacing: {
      xs: "0.75rem",
      sm: "1.25rem",
      md: "1.75rem",
      lg: "2.5rem",
      xl: "3.5rem",
      xxl: "5rem",
    },
    radius: {
      sm: "2px",
      md: "4px",
      lg: "6px",
      full: "9999px",
    },
    button: {
      style: "solid",
      padding: "14px 32px",
      fontSize: "16px",
      fontWeight: "600",
      border: "2px solid #B8860B",
      letterSpacing: "0.05em",
    },
  },

  "retro-pixel": {
    name: "Retro Pixel",
    colors: {
      background: "#E8D5C4",
      surface: "#FFE8D5",
      text: "#2C1B0E",
      textSecondary: "#5C3D2E",
      accent: "#FF5F5F",
      accentLight: "#FFBFBF",
      border: "#2C1B0E",
    },
    typography: {
      headingFont: '"Press Start 2P", cursive',
      bodyFont: '"VT323", monospace',
      headingWeight: "700",
      bodyWeight: "400",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "3rem",
      xxl: "4rem",
    },
    radius: {
      sm: "0px",
      md: "0px",
      lg: "0px",
      full: "0px",
    },
    button: {
      style: "solid",
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "700",
      border: "3px solid #2C1B0E",
      textTransform: "uppercase",
    },
  },

  editorial: {
    name: "Editorial",
    colors: {
      background: "#FEFEFE",
      surface: "#F9F9F9",
      text: "#1A1A1A",
      textSecondary: "#4A4A4A",
      accent: "#0066CC",
      accentLight: "#CCDEFF",
      border: "#E0E0E0",
    },
    typography: {
      headingFont: '"Playfair Display", serif',
      bodyFont: '"Inter", sans-serif',
      headingWeight: "700",
      bodyWeight: "400",
    },
    spacing: {
      xs: "0.75rem",
      sm: "1.25rem",
      md: "2rem",
      lg: "2.5rem",
      xl: "3.5rem",
      xxl: "4.5rem",
    },
    radius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
      full: "9999px",
    },
    button: {
      style: "outline",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
      border: "2px solid #0066CC",
    },
  },
};

/**
 * Generate CSS variables for a theme
 * Usage: <style>${generateThemeCSS('minimal')}</style>
 */
export const generateThemeCSS = (themeName) => {
  const theme = THEMES[themeName];
  if (!theme) return "";

  return `
    :root {
      /* Colors */
      --vk-bg: ${theme.colors.background};
      --vk-surface: ${theme.colors.surface};
      --vk-text: ${theme.colors.text};
      --vk-text-secondary: ${theme.colors.textSecondary};
      --vk-accent: ${theme.colors.accent};
      --vk-accent-light: ${theme.colors.accentLight};
      --vk-border: ${theme.colors.border};

      /* Typography */
      --vk-heading-font: ${theme.typography.headingFont};
      --vk-body-font: ${theme.typography.bodyFont};
      --vk-heading-weight: ${theme.typography.headingWeight};
      --vk-body-weight: ${theme.typography.bodyWeight};

      /* Spacing */
      --vk-xs: ${theme.spacing.xs};
      --vk-sm: ${theme.spacing.sm};
      --vk-md: ${theme.spacing.md};
      --vk-lg: ${theme.spacing.lg};
      --vk-xl: ${theme.spacing.xl};
      --vk-xxl: ${theme.spacing.xxl};

      /* Radius */
      --vk-radius-sm: ${theme.radius.sm};
      --vk-radius-md: ${theme.radius.md};
      --vk-radius-lg: ${theme.radius.lg};
      --vk-radius-full: ${theme.radius.full};
    }
  `;
};

export const getThemeList = () =>
  Object.entries(THEMES).map(([key, value]) => ({
    id: key,
    name: value.name,
  }));

export default THEMES;
