/**
 * Удаляет нули в начале строки
 */
export function removeLeadingZeros(value: string): string {
  // Проверка на пустое значение
  if (! value) return '';
  
  // Удаляем ведущие нули, но оставляем хотя бы один ноль
  const result = value.replace(/^0+/, '');
  
  return result === '' ? '0' : result;
}
