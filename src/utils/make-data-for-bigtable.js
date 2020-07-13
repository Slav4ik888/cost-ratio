/************************************************************/
/*  ПЕРВОНАЧАЛЬНАЯ ПОДГОТОВКА ДАННЫХ ДЛЯ "СВОДНОЙ ТАБЛИЦЫ"  */
/************************************************************/

/**
 * Создаём первоначальную "Сводную таблицу", наполняем её данными
 *
 * @param {array} mbSiteId - массив помегаб трафика
 * @param {array} striteSiteId - массив полосного трафика
 * @param {number} mbPrice - базовая стоимость трафика
 * @param {array} arrayOfProject - массив из Гугл service desk
 * @param {object} factura - данные счёт фактуры
 * 
 * 
 * @return {array} newArr  
 */


// Первоначальное наполнение пустого массива данными по трафику Мб и полосному
export const pushArrBmAndStriteTraffic = (mbSiteId, striteSiteId, mbPrice) => {

  let newArr = [];
  let objSiteID = {};
  // Заполняем основной массив данными по  Мб трафик
  for(let obj of mbSiteId) {
    objSiteID.siteID = obj.siteID;
    objSiteID.project = '';
    objSiteID.organization = '';
    objSiteID.mbPrice = mbPrice;
    objSiteID.mbCostServicies = '';
    objSiteID.mbTraffic = obj.trafficMb;
    objSiteID.mbCostTraffic = (objSiteID.mbTraffic * objSiteID.mbPrice).toFixed(2);
    objSiteID.mbCostCorrect = '';
    objSiteID.spTraffic = '';
    objSiteID.spCostTraffic = '';
    objSiteID.result = '';

    newArr.push(objSiteID);
    objSiteID = {};
  }

  // Заполняем данными по трафику в полосе
  for(let obj of striteSiteId) {
    objSiteID = {};
    let result = newArr.find( it => it.siteID === obj.siteID);
    if (result) {
      result.spTraffic = obj.trafficMb;
    } else {
      objSiteID = {};
      objSiteID.siteID = obj.siteID;
      objSiteID.project = '';
      objSiteID.organization = '';
      objSiteID.mbPrice = mbPrice;
      objSiteID.mbCostServicies = '';
      objSiteID.mbTraffic = '';
      objSiteID.mbCostTraffic = '';
      objSiteID.mbCostCorrect = '';
      objSiteID.spTraffic = obj.trafficMb;
      objSiteID.spCostTraffic = '';
      objSiteID.result = '';

      newArr.push(objSiteID);
    }
  };
  return newArr;
};



// Подсчёт общих затрат по Мб трафику + сч/ф
export const calcMbCostAll = arr => {
  let mbCostAll = arr.reduce((sum, obj) => sum + +obj.mbCostTraffic + (+obj.mbCostServicies || 0), 0);
  mbCostAll = mbCostAll.toFixed(2);
  return mbCostAll;
};

// Подсчёт общего трафика полосы
export const calcSpTrafficAll = arr => {
  let spTrafficAll = arr.reduce((sum, obj) => sum + +obj.spTraffic, 0);
  spTrafficAll = spTrafficAll.toFixed(2);
  return spTrafficAll;
};



/**
 * Рассчитываем Затраты скорректированные для "Сводной таблицы
 *
 * @param {array} mbSiteId - массив помегаб трафика
 * @param {array} striteSiteId - массив полосного трафика
 * @param {number} mbPrice - базовая стоимость трафика
 * @param {array} arrayOfProject - массив из Гугл service desk
 * @param {object} factura - данные счёт фактуры
 * 
 * 
 * @return {array} newArr  
 */

export const makeDataForBigTable = (arrForBigTable, factura, mbCostAll, spTrafficAll) => {

  // Рассчитываем Затраты скорректированные
  for(let obj of arrForBigTable) {
    if ((+obj.mbCostTraffic + +obj.mbCostServicies) / mbCostAll * factura.mb) {
    //Затраты скорректир-е = (Вх. затраты по трафику + Затраты из сч/ф) / Общ.затрМб * сч.ф Мб
      obj.mbCostCorrect = ((+obj.mbCostTraffic + +obj.mbCostServicies) / mbCostAll * factura.mb).toFixed(2);
    }
  }

  // Стоимость пропорционально общей сумме затрат за полосу
  arrForBigTable.forEach(obj => obj.spCostTraffic = (+obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2));
  // for(let obj of arr) {
  //   if (obj.spTraffic / spTrafficAll * factura.sprite) {
  //     obj.spCostTraffic = (+obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2);
  //     console.log('obj.spCostTraffic: ', obj.spCostTraffic);
  //   }
  // }
  
  // Итоговые затраты
  arrForBigTable.forEach( obj => obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2));
  const newArrForBigTable = arrForBigTable.concat();
  return {newArrForBigTable};
};



// Обновляем полученный массив, данными из массива от Гугл
export const makeDataFromGoogle = (arrForBigTable, arrayOfProject) => {
  let arr = arrForBigTable.concat();
  // siteId в arrayOfProject (Это данные по организациям и проектам)
  if (arrayOfProject) {
    for(let obj of arr) {

      let result = arrayOfProject.find( it => it.siteID === obj.siteID);
      
      if (result) {
        obj.project = result.project;
        obj.organization = result.organization;
      }
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
