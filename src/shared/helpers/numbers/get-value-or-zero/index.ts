
/** 
 * Возвращает цифру или 0, если undefined
 * НЕ ПРОВЕРЯЕТ на строку с символами
 */
export const getValueOrZero = (value: number | undefined) => {
  return value ? +value : 0;
};
