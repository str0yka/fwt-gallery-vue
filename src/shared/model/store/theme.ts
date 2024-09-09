import { LOCAL_STORAGE, THEME } from '@shared/constants';
import { getTheme } from '@shared/lib';
import { defineStore } from 'pinia';
import type { Theme } from '../types';
import { ref, watch } from 'vue';

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
