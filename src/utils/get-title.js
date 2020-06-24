// 
// field - полученный title 
// title - массив заголовков
// titleValue - массив значений этих заголовков
//
// возвращает значение заголовка
//
export const getTitle = (field, title, titleValue) => {
  return  titleValue[title.indexOf(field)];
};