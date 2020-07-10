/**********************************************************/
/*   Ищем совпадения проектов и создаём итоговую таблицу  */
/**********************************************************/


// Расчёт данных для таблицы "Итоговой таблицы Анализа и 1C"
export const makeResultForFinishTable = arr => {
  let lastBigStore = [], newStorage = [];
  
  for(let i=0; i<arr.length; i++) {
    let obj = {};
    obj.project = arr[i].project;
    obj.organization = arr[i].organization; // Название организации берём только первое


    let sumMbCost = +arr[i].mbCostCorrect;
    let sumSpCost = +arr[i].spCostTraffic;

    let sumResult = +arr[i].result;

    if (!newStorage.find( it => it.project === arr[i].project)) {
      for(let j=i+1; j<arr.length; j++) {
        if (arr[i].project === arr[j].project) {

          sumMbCost += +arr[j].mbCostCorrect;
          sumSpCost += +arr[j].spCostTraffic;
          sumResult += +arr[j].result;
        }
      }

      obj.sumMbCost = sumMbCost.toFixed(2);
      obj.sumSpCost = sumSpCost.toFixed(2);
      obj.result = sumResult.toFixed(2);

      newStorage.push(obj);
      obj = {};
    }
  }
  // Меняем точку на запятую в итоговой ячейке
  lastBigStore = arr.concat();
  lastBigStore.forEach( item => item.result = item.result.replace(/\./g,','));
  
  // newStorage.forEach( item => {
  //   item.sumMbCost = item.sumMbCost.replace(/\./g,',');
  //   item.sumSpCost = item.sumSpCost.replace(/\./g,',');
  //   item.result = item.result.replace(/\./g,',');
  // });

  return {lastBigStore, newStorage}
}
