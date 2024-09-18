import { LOCAL_STORAGE, THEME_DEFAULT } from '@shared/constants';

import { isThemeValid } from './isThemeValid';

export const getTheme = () => {
  const theme = localStorage.getItem(LOCAL_STORAGE.THEME);

  return isThemeValid(theme) ? theme : THEME_DEFAULT;
};
