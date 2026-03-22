
/**
 * Возвращает пустую строку, если значение undefined или само значение
 * @param value 
 */
export const emptyIfUndefined = (
  value: number | string | undefined
): number | string => value === undefined ? '' : value;
