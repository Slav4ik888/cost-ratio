import { AltergaItem } from 'entities/altegra';



/**
 * Объединяем входящий и исходящий трафик
 */
export const joinTraffic = (
  arrFromAltegra: AltergaItem[] // массив из необработанных данных от Алтегры
) => {
  let arr = arrFromAltegra;
  let arrNew: AltergaItem[] = [];
  let sum = 0;
  let obj: AltergaItem = {} as AltergaItem;

  for(let i=0; i < arr.length; i++) {
    sum = +arr[i].trafficMb; // начальное значение
    // если уже обработали этот siteID, то пропускаем
    if (! arrNew.find( item => item.siteID === arr[i].siteID) ) {
      for(let j = i + 1; j < arr.length; j++) {
        if (arr[i].siteID === arr[j].siteID) sum += +arr[j].trafficMb;
      }
      obj = arr[i];
      obj.trafficMb = sum.toFixed(2);
      arrNew.push(obj);
      obj = {} as AltergaItem;
    }
  }
  return arrNew
}


/**
 * Возвращает массив помегабайтного mbSiteId
 */
export const returnArrMb = (
  arrFromAltegra: AltergaItem[] // массив из данных от Алтегры с посчитанным trafficMb
): AltergaItem[] => {
  let arr = arrFromAltegra;
  let newArr = [];

  for(let item of arr) {
    if (! item.siteID.endsWith('-2') ) newArr.push(item);
  }
  return newArr
};


/**
 * Возвращает массив полосного трафика striteSiteId
 */
export const returnArrSprite = (
  arrFromAltegra: AltergaItem[] // массив из данных от Алтегры с посчитанным trafficMb
): AltergaItem[] => {
  let arr = arrFromAltegra;
  let newArr = [];

  for(let item of arr) {
    if (item.siteID.endsWith('-2') ) {
      item.siteID = item.siteID.slice(0,-2);
      newArr.push(item);
    }
  }
  return newArr
};
