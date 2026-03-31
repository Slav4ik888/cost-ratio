

export const remap = <T>(prevArr: T[], index: number, newValue: T): T[] => prevArr.map((item, i) => {
  if (i === index) {
    // Создаем копию объекта с новым значением
    return newValue;
  }
  return item;
})
