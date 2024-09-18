import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

import { LOCAL_STORAGE, THEME } from '@shared/constants';
import { getTheme } from '@shared/lib';

import type { Theme } from '../types';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(getTheme());

  const toggle = () => (theme.value = theme.value === THEME.DARK ? THEME.LIGHT : THEME.DARK);
  const set = (value: Theme) => (theme.value = value);

  document.body.dataset.theme = theme.value;
  localStorage.setItem(LOCAL_STORAGE.THEME, theme.value);

  watch(theme, () => {
    document.body.dataset.theme = theme.value;
    localStorage.setItem(LOCAL_STORAGE.THEME, theme.value);
  });

  return { theme, toggle, set };
});
