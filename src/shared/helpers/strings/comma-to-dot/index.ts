
/**
 * В числовой строке заменяет запятую на точку и возвращает в виде строки 
 * correctValid("123")        // "123"
 * correctValid("123,45")     // "123.45"
 * correctValid("123.45")     // "123.45"
 */
export const commaToDot = (str: string): string =>{
  let newStr = str.replace(/,/, '.');
  const idx = newStr.indexOf('.');
  
  if (idx !== -1) {
    let endStr = newStr.slice(idx + 1);
    const e = endStr.replace(/\./, '');
    newStr = newStr.slice(0, idx + 1) + e;
  }
  return newStr;
};
