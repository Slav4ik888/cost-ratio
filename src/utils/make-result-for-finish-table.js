/**
 * Ищем совпадения проектов, расчитываем и создаём "Итоговой таблицы Анализа и 1C"
 *
 * @param {array} arrForBigTable - массив "Сводной таблицы"
 * 
 * @return {array} newStorage  
 */

export const makeResultForFinishTable = arrForBigTable => {
  let newStorage = [];
  
  for(let i=0; i<arrForBigTable.length; i++) {
    let obj = {};
    obj.project = arrForBigTable[i].project;
    obj.organization = arrForBigTable[i].organization; // Название организации берём только первое

    let sumMbCost = +arrForBigTable[i].mbCostCorrect;
    let sumSpCost = +arrForBigTable[i].spCostTraffic;
    let sumResult = +arrForBigTable[i].result;

    if (!newStorage.find( it => it.project === arrForBigTable[i].project)) {
      for(let j=i+1; j<arrForBigTable.length; j++) {
        if (arrForBigTable[i].project === arrForBigTable[j].project) {

          sumMbCost += +arrForBigTable[j].mbCostCorrect;
          sumSpCost += +arrForBigTable[j].spCostTraffic;
          sumResult += +arrForBigTable[j].result;
        }
      }

      obj.sumMbCost = sumMbCost.toFixed(2);
      obj.sumSpCost = sumSpCost.toFixed(2);
      obj.result = sumResult.toFixed(2);

      newStorage.push(obj);
      obj = {};
    }
  }
  
  // newStorage.forEach( item => {
  //   item.sumMbCost = item.sumMbCost.replace(/\./g,',');
  //   item.sumSpCost = item.sumSpCost.replace(/\./g,',');
  //   item.result = item.result.replace(/\./g,',');
  // });

  return {newStorage}
}


/**
 * Меняем точку на запятую в переданном свойстве объекта
 *
 * @param {array} arr - массив объектов
 * @param {string} attribute - свойство объекта
 * 
 * 
 * @return {array} newArr  
 */

export const changePointToComma = (arr, attribute) => {


  arr.forEach( item => item.result = item[attribute].replace(/\./g,','));


  return arr;
};
