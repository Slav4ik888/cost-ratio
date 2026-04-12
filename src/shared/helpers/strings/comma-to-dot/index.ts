
/**
 * В числовой строке заменяет запятую на точку и возвращает в виде строки 
 * correctValid("123")        // "123"
 * correctValid("123,45")     // "123.45"
 * correctValid("123.45")     // "123.45"
 */
export const commaToDot = (str: string): string => {
  // Шаг 1: Заменяем первую запятую на точку
  let newStr = str.replace(/,/, '.');
  
  // Шаг 2: Удаляем все буквы и недопустимые символы, кроме цифр, точки и минуса
  newStr = newStr.replace(/[^\d.-]/g, '');
  
  // Шаг 3: Обработка минуса (только в начале)
  const minusIndex = newStr.indexOf('-');
  if (minusIndex !== -1 && minusIndex !== 0) {
    newStr = newStr.slice(0, minusIndex) + newStr.slice(minusIndex + 1);
  }
  
  // Шаг 4: Удаляем ВСЕ точки, кроме ПЕРВОЙ
  // Но если точка только одна, оставляем её (даже если после неё ничего нет)
  const parts = newStr.split('.');
  console.log('parts: ', parts);
  if (parts.length > 1) {
    // Оставляем первую часть + точку + все остальные части без точек
    newStr = parts[0] + '.' + parts.slice(1).join('');
    console.log('newStr: ', newStr);
  }
  
  return newStr;
};
