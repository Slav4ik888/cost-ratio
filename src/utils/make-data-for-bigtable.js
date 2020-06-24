/************************************************/
/*   Подготавливаем данные для большой таблицы  */
/************************************************/

export const makeBigArr = (mbSiteId, striteSiteId, arrayOfProject) => {
  let storage = [];
  let objSiteID = {};

  // Заполняем основной массив данными по трафику вне полосы
  for(let st of mbSiteId) {
      objSiteID = {};
      objSiteID.siteID = st.siteID;
      objSiteID.project = '';
      objSiteID.organization = '';
      objSiteID.mbPrice = 0.132;
      objSiteID.mbCostServicies = '';
      objSiteID.mbTraffic = st.trafficMb;
      objSiteID.mbCostTraffic = (objSiteID.mbTraffic * objSiteID.mbPrice);
      objSiteID.mbCostCorrect = '';

      objSiteID.spTraffic = '';
      objSiteID.spCostTraffic = '';
      objSiteID.result = '';

      storage.push(objSiteID);
  }

  // Заполняем данными по трафику в полосе
  for(let st of striteSiteId) {
      objSiteID = {};
      let result = storage.find( obj => obj.siteID === st.siteID);
      if (result) {
          result.spTraffic = st.trafficMb;
      } else {
          objSiteID = {};
          objSiteID.siteID = st.siteID;
          objSiteID.project = '';
          objSiteID.organization = '';
          objSiteID.mbPrice = 0.132;
          objSiteID.mbCostServicies = '';
          objSiteID.mbTraffic = '';
          objSiteID.mbCostTraffic = '';
          objSiteID.mbCostCorrect = '';
          objSiteID.spTraffic = st.trafficMb;
          objSiteID.spCostTraffic = '';
          objSiteID.result = '';

          storage.push(objSiteID);
          
      }
  }


  // Присваиваем данные из сч/фактуры
  let factura = {};
  factura.value = 779797.36;
  console.log('Со сч/ф value: ', factura.value);
  
  factura.sprite = 205887.1;
  console.log('Со сч/ф sprite: ', factura.sprite);

  factura.mb = factura.value - factura.sprite;
  console.log('Со сч/ф mb: ', factura.mb);

  // Подсчёт общих затрат по Мб трафику 
  let mbCostAll = 0;
  for(let stantion of storage) {
      mbCostAll += +stantion.mbCostTraffic;
  };
  console.log('Общие затраты по трафику рассчитанные: ', mbCostAll.toFixed(2));


  // Подсчёт общего трафика полосы
  let spTrafficAll = 0;
  for(let stantion of storage) {
      spTrafficAll += +stantion.spTraffic;
  };
  console.log('Общий трафик в полосе рассчитанный: ', spTrafficAll.toFixed(2));



  // Рассчитываем Затраты скорректированные
  for(let obj of storage) {
      if (obj.mbCostTraffic / mbCostAll * factura.mb) {
          obj.mbCostCorrect = (obj.mbCostTraffic / mbCostAll * factura.mb).toFixed(2);
      }
  }

  // Стоимость пропорционально общей сумме затрат за полосу
  for(let obj of storage) {
      if (obj.spTraffic / spTrafficAll * factura.sprite) {
          obj.spCostTraffic = (obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2);
      }
  }
  
  // Итоговые затраты
  for(let obj of storage) {
      obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2);
  }

  // siteId в arrayOfProject (Это данные по организациям и проектам)
  // console.log('arrayOfProject: ', arrayOfProject);
  if (arrayOfProject) {
      for(let item of storage) {

          let result = arrayOfProject.find( it => it.siteID === item.siteID);
          
          if (result) {
              item.project = result.project;
              item.organization = result.organization;
          }
      }
  }
  // console.log('storage: ', storage);
  mbCostAll = mbCostAll.toFixed(2);
  spTrafficAll = spTrafficAll.toFixed(2);

  return {factura, mbCostAll, spTrafficAll, storage}
  
}