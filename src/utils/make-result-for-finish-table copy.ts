import { MainItem } from 'entities/automatization';



/**
 * Ищем совпадения проектов, расчитываем и создаём "Итоговой таблицы Анализа и 1C"
 */
export const makeResultForFinishTable = (
  arrForBigTable: any[] // массив "Сводной таблицы"
): { arrResult: MainItem[] } => {
  let arrResult = [] as MainItem[];
  
  for (let i = 0; i < arrForBigTable.length; i++) {
    let obj = {} as MainItem;
    obj.project = arrForBigTable[i].project;
    obj.organization = arrForBigTable[i].organization; // Название организации берём только первое

    let sumMbCost = +arrForBigTable[i].mbCostCorrect;
    let sumSpCost = +arrForBigTable[i].spCostTraffic;
    let sumResult = +arrForBigTable[i].result;

    if (! arrResult.find( it => it.project === arrForBigTable[i].project)) {
      for (let j = i + 1; j < arrForBigTable.length; j++) {
        if (arrForBigTable[i].project === arrForBigTable[j].project) {

          sumMbCost += +arrForBigTable[j].mbCostCorrect;
          sumSpCost += +arrForBigTable[j].spCostTraffic;
          sumResult += +arrForBigTable[j].result;
        }
      }

      obj.sumMbCost = Number(sumMbCost.toFixed(2));
      obj.sumSpCost = Number(sumSpCost.toFixed(2));
      obj.result    = Number(sumResult.toFixed(2));

      arrResult.push(obj);
      obj = {} as MainItem;
    }
  }
  
  // arrResult.forEach( item => {
  //   item.sumMbCost = item.sumMbCost.replace(/\./g,',');
  //   item.sumSpCost = item.sumSpCost.replace(/\./g,',');
  //   item.result = item.result.replace(/\./g,',');
  // });

  return { arrResult }
}


/** Меняем точку на запятую в переданном свойстве объекта */

export const changePointToComma = (
  arr       : MainItem[],
  attribute : keyof MainItem // свойство объекта
) => {
  const arrResult = [] as MainItem[];
  arr.forEach(item => {
    let obj = {} as MainItem;
    obj = { ...item };
    // @ts-ignore
    obj.result = String(item[attribute]).replace(/\./g, ',');
    
    arrResult.push(obj);
  });

  return arrResult;
};
