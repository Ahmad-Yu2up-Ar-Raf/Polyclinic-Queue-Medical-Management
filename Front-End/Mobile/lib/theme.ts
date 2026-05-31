import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(210, 20%, 15%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(210, 20%, 15%)',
    primary: 'hsl(184, 68%, 56%)',
    primaryForeground: 'hsl(187, 60%, 97%)',
    secondary: 'hsl(210, 20%, 96%)',
    secondaryForeground: 'hsl(210, 20%, 20%)',
    muted: 'hsl(210, 20%, 94%)',
    mutedForeground: 'hsl(210, 10%, 45%)',
    border: 'hsl(210, 20%, 90%)',
    destructive: 'hsl(4, 76%, 54%)',
  },
  dark: {
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(210, 20%, 15%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(210, 20%, 15%)',
    primary: 'hsl(184, 68%, 56%)',
    primaryForeground: 'hsl(187, 60%, 97%)',
    secondary: 'hsl(210, 20%, 96%)',
    secondaryForeground: 'hsl(210, 20%, 20%)',
    muted: 'hsl(210, 20%, 94%)',
    mutedForeground: 'hsl(210, 10%, 45%)',
    border: 'hsl(210, 20%, 90%)',
    destructive: 'hsl(4, 76%, 54%)',
  },
} as const;

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
