import { toNumber } from '..';

/** 
 * Возвращает цифру или 0, если undefined
 * НЕ ПРОВЕРЯЕТ на строку с символами
 */
export const getValueOrZero = (value: number | undefined): number => {
  return value ? toNumber(value) : 0;
};
