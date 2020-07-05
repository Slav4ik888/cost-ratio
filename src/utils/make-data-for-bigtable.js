/************************************************/
/*   Подготавливаем данные для большой таблицы  */
/************************************************/


// Обновляем "Сводную таблицу"  обновлёнными значениями из данных сч/ф mbCostServicies
// пересчитываем
export const updateBigArr = (arr, factura)  => {

  let mbCostAll = calcMbCostAll(arr);
  console.log('Общие затраты по трафику рассчитанные: ', mbCostAll);

  // Рассчитываем Затраты скорректированные
  for(let obj of arr) {
    if (!obj.mbCostTraffic) obj.mbCostTraffic = 0;
    // if (!obj.mbCostServicies) obj.mbCostServicies = 0;
    if (!factura.mb) factura.mb = 1;
    if (!mbCostAll) mbCostAll = 1;

    //Затраты скорректир-е = (Вх. затраты по трафику + Затраты из сч/ф) / Общ.затрМб * сч.ф Мб
      obj.mbCostCorrect = ((+obj.mbCostTraffic + +obj.mbCostServicies) / mbCostAll * factura.mb).toFixed(2);
  }

  // Итоговые затраты
  arr.forEach( obj => obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2));

  return arr
};



// Подсчёт общих затрат по Мб трафику + сч/ф
const calcMbCostAll = arr => {
  let mbCostAll = arr.reduce((sum, obj) => sum + +obj.mbCostTraffic + (+obj.mbCostServicies || 0), 0);
  mbCostAll = mbCostAll.toFixed(2);
  return mbCostAll;
}



// Создаём первоначальную "Сводную таблицу", наполняем её данными
export const makeBigArr = (mbSiteId, striteSiteId, arrayOfProject, factura) => {
  let storage = [];
  let objSiteID = {};

  // Заполняем основной массив данными по  Мб трафик
  for(let obj of mbSiteId) {
      
      objSiteID.siteID = obj.siteID;
      objSiteID.project = '';
      objSiteID.organization = '';
      objSiteID.mbPrice = 0.132;
      objSiteID.mbCostServicies = '';
      objSiteID.mbTraffic = obj.trafficMb;
      objSiteID.mbCostTraffic = (objSiteID.mbTraffic * objSiteID.mbPrice);
      objSiteID.mbCostCorrect = '';

      objSiteID.spTraffic = '';
      objSiteID.spCostTraffic = '';
      objSiteID.result = '';

      storage.push(objSiteID);
      objSiteID = {};
  }

  // Заполняем данными по трафику в полосе
  for(let obj of striteSiteId) {
    objSiteID = {};
    let result = storage.find( it => it.siteID === obj.siteID);
    if (result) {
      result.spTraffic = obj.trafficMb;
    } else {
      objSiteID = {};
      objSiteID.siteID = obj.siteID;
      objSiteID.project = '';
      objSiteID.organization = '';
      objSiteID.mbPrice = 0.132;
      objSiteID.mbCostServicies = '';
      objSiteID.mbTraffic = '';
      objSiteID.mbCostTraffic = '';
      objSiteID.mbCostCorrect = '';
      objSiteID.spTraffic = obj.trafficMb;
      objSiteID.spCostTraffic = '';
      objSiteID.result = '';

      storage.push(objSiteID);
        
    }
  }

  // Подсчёт общих затрат по Мб трафику + сч/ф
  let mbCostAll = calcMbCostAll(storage);
  console.log('Общие затраты по трафику рассчитанные: ', mbCostAll);

  // Подсчёт общего трафика полосы
  let spTrafficAll = storage.reduce((sum, obj) => sum + +obj.spTraffic, 0);
  spTrafficAll = spTrafficAll.toFixed(2);
  console.log('Общий трафик в полосе рассчитанный: ', spTrafficAll);
 


  // Рассчитываем Затраты скорректированные
  for(let obj of storage) {
    if (obj.mbCostTraffic / mbCostAll * factura.mb) {
    //Затраты скорректир-е = (Вх. затраты по трафику + Затраты из сч/ф) / Общ.затрМб * сч.ф Мб
      obj.mbCostCorrect = ((+obj.mbCostTraffic + +obj.mbCostServicies) / mbCostAll * factura.mb).toFixed(2);
    }
  }

  // Стоимость пропорционально общей сумме затрат за полосу
  for(let obj of storage) {
    if (obj.spTraffic / spTrafficAll * factura.sprite) {
      obj.spCostTraffic = (obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2);
    }
  }
  
  // Итоговые затраты
  storage.forEach( obj => obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2));

  // siteId в arrayOfProject (Это данные по организациям и проектам)
  if (arrayOfProject) {
    for(let obj of storage) {

      let result = arrayOfProject.find( it => it.siteID === obj.siteID);
      
      if (result) {
        obj.project = result.project;
        obj.organization = result.organization;
      }
    }
  }

  return {factura, mbCostAll, spTrafficAll, storage}
};
