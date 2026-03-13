import { PaletteMode } from '../../types';

/**
 * Тёмная ли тема (учитывает если выбрана system)
 */
export const isDarkMode = (mode: PaletteMode): boolean => {
  const isSystemModeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return mode === 'dark' || (mode === 'system' && isSystemModeDark);
};
