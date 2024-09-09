import type { Theme } from '@shared/model';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const THEME_DEFAULT: Theme = 'dark';
