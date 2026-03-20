import { AltergaItem } from 'entities/altegra';



/**
 * Преобразовываем полученные от Алтегра данные в массив объектов
 */
export const makeArray = (str: string): AltergaItem[] => {
  str = str.replace(/\n/g,'*'); // добавляем * в конце строки
  
  let arr: AltergaItem[] = [];
  let obj: AltergaItem = {
    siteID      : '',
    trafficType : '', 
    trafficMb   : '', 
    price       : '',
  }

  while (true) {
    if (str.indexOf('\t') === -1) break; //если нет табуляции, значит строки закончились

    obj.siteID = str.slice(0, str.indexOf('\t') );
    str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки

    obj.trafficType = str.slice(0, str.indexOf('\t') );
    str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки

    obj.trafficMb = str.slice(0, str.indexOf('\t'));
    obj.trafficMb = transformSpace(obj.trafficMb); // удаляем пробелы из трафика
    str = str.slice(str.indexOf('\t') + 1); // удаляем его из строки

    // ищем и сохраняем прайс
    // если последняя строка, отдаём всё слово до конца, тк не даёт последний символ
    if (str.indexOf('*') === -1) { 
      obj.price = str;
    }
    else {
      // Последнее слово берём всё до звёздочки
      obj.price = str.slice(0, str.indexOf('*'));
      str = str.slice( str.indexOf('*') + 1 ); // удаляем его из строки
    }
    arr.push(obj); // результат obj добавляем в массив
    obj = {} as AltergaItem;
  };
  
  return arr
}

/** убираем пробелы */
function transformSpace(text: string): string {
  let value;
  value = text.replace(/\s/g,'');
  return value;
}
