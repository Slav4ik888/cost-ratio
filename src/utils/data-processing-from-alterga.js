/**
 * Объединяем входящий и исходящий трафик
 * 
 * @param {array} arrFromAltegra - массив из необработанных данных от Алтегры
 * 
 * @return {array} arrNew -  
 */

export const joinTraffic = arrFromAltegra => {
  let arr = arrFromAltegra;
  let arrNew = [];
  let sum = 0;
  let obj = {};

  for(let i=0; i<arr.length; i++) {
    sum = +arr[i].trafficMb; // начальное значение
    // если уже обработали этот siteID, то пропускаем
    if (!arrNew.find( item => item.siteID === arr[i].siteID) ) {
      for(let j=i+1; j<arr.length; j++) {
        if (arr[i].siteID === arr[j].siteID) sum += +arr[j].trafficMb;
      }
      obj = arr[i];
      obj.trafficMb = sum.toFixed(2);
      arrNew.push(obj);
      obj = {};
    }
  }
  return arrNew
}


/**
 * Возвращает массив помегабайтного
 * 
 * @param {array} arrFromAltegra - массив из данных от Алтегры с посчитанным trafficMb
 * 
 * @return {array} mbSiteId - массив помегабайтного трафика
 */

export const returnArrMb = arrFromAltegra => {
  let arr = arrFromAltegra;
  let newArr = [];

  for(let item of arr) {
    if (!item.siteID.endsWith("-2") ) newArr.push(item);
  }
  return newArr
};


/**
 * Возвращает массив полосной
 * 
 * @param {array} arrFromAltegra - массив из данных от Алтегры с посчитанным trafficMb
 * 
 * @return {array} striteSiteId - массив полосного трафика
 */

export const returnArrSprite = arrFromAltegra => {
  let arr = arrFromAltegra;
  let newArr = [];

  for(let item of arr) {
    if (item.siteID.endsWith("-2") ) {
      item.siteID = item.siteID.slice(0,-2);
      newArr.push(item);
    }
  }
  return newArr
};
