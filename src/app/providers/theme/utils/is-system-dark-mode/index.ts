/**
 * Проверяет выбрана ли в системе браузера тёмная тема
 */
export const isSystemDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
