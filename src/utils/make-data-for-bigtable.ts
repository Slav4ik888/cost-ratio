/************************************************************/
/*  ПЕРВОНАЧАЛЬНАЯ ПОДГОТОВКА ДАННЫХ ДЛЯ "СВОДНОЙ ТАБЛИЦЫ"  */
/************************************************************/

import { MainItem } from 'entities/automatization';
import { Factura } from 'entities/factura';
import { ServiceDeskType } from 'entities/service-desk';
import { getValueOrZero as gv, toNumber } from 'shared/helpers/numbers';

/**
 * Создаём первоначальную "Сводную таблицу", наполняем её данными
 *
 * @param {array} mbSiteId - массив помегаб трафика
 * @param {array} striteSiteId - массив полосного трафика
 * @param {number} mbPrice - базовая стоимость трафика
 * @param {array} arrayServiceDesk - массив из Гугл service desk
 * @param {object} factura - данные счёт фактуры
 * 
 * 
 * @return {array} newArr  
 */


// Первоначальное наполнение пустого массива данными по трафику Мб и полосному
export const pushArrBmAndStriteTraffic = (mbSiteId: any[], striteSiteId: any[], mbPrice: number) => {

  let newArr = [];
  let objSiteID = {} as MainItem;
  // Заполняем основной массив данными по  Мб трафик
  for(let obj of mbSiteId) {
    objSiteID.siteID = obj.siteID;
    objSiteID.project = 0;
    objSiteID.organization = '';
    objSiteID.mbPrice = mbPrice;
    objSiteID.mbCostServicies = 0;
    objSiteID.mbTraffic = obj.trafficMb;
    objSiteID.mbCostTraffic = Number((objSiteID.mbTraffic * objSiteID.mbPrice).toFixed(2));
    objSiteID.mbCostCorrect = undefined;
    objSiteID.spTraffic = undefined;
    objSiteID.spCostTraffic = undefined;
    objSiteID.result = undefined;

    newArr.push(objSiteID);
    objSiteID = {} as MainItem;
  }

  // Заполняем данными по трафику в полосе
  for(let obj of striteSiteId) {
    objSiteID = {} as MainItem;
    let result = newArr.find( it => it.siteID === obj.siteID);
    if (result) {
      result.spTraffic = obj.trafficMb;
    }
    else {
      objSiteID = {} as MainItem;
      objSiteID.siteID = obj.siteID;
      objSiteID.project = 0;
      objSiteID.organization = '';
      objSiteID.mbPrice = mbPrice;
      objSiteID.mbCostServicies = 0;
      objSiteID.mbTraffic = 0;
      objSiteID.mbCostTraffic = undefined;
      objSiteID.mbCostCorrect = undefined;
      objSiteID.spTraffic = obj.trafficMb;
      objSiteID.spCostTraffic = undefined;
      objSiteID.result = undefined;

      newArr.push(objSiteID);
    }
  };
  return newArr;
};



// Подсчёт общих затрат по Мб трафику + сч/ф
export const calcMbCostAll = (arr: MainItem[]): number => {
  let mbCostAll = arr.reduce((sum, obj) => sum + gv(obj.mbCostTraffic) + gv(obj.mbCostServicies), 0);

  return Number(mbCostAll.toFixed(2));
};


// Подсчёт общего трафика полосы
export const calcSpTrafficAll = (arr: MainItem[]): number => {
  let spTrafficAll = arr.reduce((sum, obj) => sum + gv(obj.spTraffic), 0);
  
  return Number(spTrafficAll.toFixed(2));
};


interface Result {
  newArrForBigTable: MainItem[];
}

/** Рассчитываем Затраты скорректированные для "Сводной таблицы */
export const makeDataForBigTable = (
  arrForBigTable : MainItem[], // массив из Алтегры или из гугл service desk
  factura        : Factura,    // данные счёт фактуры
  mbCostAll      : number,
  spTrafficAll   : number
): Result => {
  
  const afbt = [] as MainItem[];
  arrForBigTable.forEach(item => {
    let obj = {} as MainItem;
    obj = { ...item };
    
    // Рассчитываем Затраты скорректированные
    if ((gv(obj.mbCostTraffic) + gv(obj.mbCostServicies)) / mbCostAll * gv(factura.mb)) {
      //Затраты скорректир-е = (Вх. затраты по трафику + Затраты из сч/ф) / Общ.затрМб * сч.ф Мб
      obj.mbCostCorrect = Number(((gv(obj.mbCostTraffic) + gv(obj.mbCostServicies)) / mbCostAll * gv(factura.mb)).toFixed(2));
    }
    // Стоимость пропорционально общей сумме затрат за полосу
    obj.spCostTraffic = Number((gv(obj.spTraffic) / spTrafficAll * gv(factura.sprite)).toFixed(2));
    
    // Итоговые затраты
    obj.result = Number((gv(obj.spCostTraffic) + gv(obj.mbCostCorrect)).toFixed(2));
    
    afbt.push(obj);
  });
  
  return { newArrForBigTable: afbt };
};



/** 
 * Обновляем полученный массив, данными из массива от Гугл
 *   obj.project = result.project;
 *   obj.organization = result.organization;
 */
export const makeDataFromGoogle = (arrForBigTable: MainItem[], arrayServiceDesk: ServiceDeskType[]): MainItem[] => {
  let arr = [] as MainItem[];
  
  // siteId в arrayServiceDesk (Это данные по организациям и проектам)
  if (arrayServiceDesk) {
    for(let obj of arrForBigTable) {
      let newObj = {
        ...obj,
        spTraffic: toNumber(obj.spTraffic),
        mbTraffic: toNumber(obj.mbTraffic),
      } as MainItem;

      let result = arrayServiceDesk.find( it => it.siteID === obj.siteID);
      
      if (result) {
        newObj.project = result.project;
        newObj.organization = result.organization;
      }
      
      arr.push(newObj);
    }
  }
  return arr;
};


// Обновляем "Сводную таблицу"  обновлёнными значениями из данных сч/ф mbCostServicies
// пересчитываем
// export const updateBigArr = (arrForBigTable, spTrafficAll, factura)  => {

//   let mbCostAll = calcMbCostAll(arrForBigTable);
//   // console.log('Общие затраты по трафику рассчитанные: ', mbCostAll);

//   // Рассчитываем Затраты скорректированные
//   for(let obj of arrForBigTable) {
//     if (!obj.mbCostTraffic) obj.mbCostTraffic = 0;
//     // if (!obj.mbCostServicies) obj.mbCostServicies = 0;
//     if (!factura.mb) factura.mb = 1;
//     if (!mbCostAll) mbCostAll = 1;

//     if (obj.mbCostTraffic / mbCostAll * factura.mb) {
//       //Затраты скорректир-е = (Вх. затраты по трафику + Затраты из сч/ф) / Общ.затрМб * сч.ф Мб
//         obj.mbCostCorrect = ((+obj.mbCostTraffic + +obj.mbCostServicies) / mbCostAll * factura.mb).toFixed(2);
//       }
//   }

//   // Стоимость пропорционально общей сумме затрат за полосу
//   arrForBigTable.forEach(obj => obj.spCostTraffic = (+obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2));

//   // Итоговые затраты
//   arrForBigTable.forEach( obj => obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2));

//   return arrForBigTable
// };
