import { THEME } from '@shared/config';
import type { Theme } from '@shared/model';

export const isThemeValid = (value: unknown): value is Theme =>
  Object.values(THEME).some((theme) => theme === value);
