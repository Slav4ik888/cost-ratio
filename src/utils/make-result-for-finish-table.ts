import { MainItem } from 'entities/automatization';
import { getValueOrZero as gv } from 'shared/helpers/numbers';



/**
 * Ищем совпадения проектов, расчитываем и создаём "Итоговой таблицы Анализа и 1C"
 */
export const makeResultForFinishTable = (
  arrForBigTable: MainItem[] // массив "Сводной таблицы"
): MainItem[] => {
  let arrResult = [] as MainItem[];
  
  arrForBigTable.forEach((item: MainItem, i) => {
    let obj = {} as MainItem;
    obj.project = item.project;
    obj.organization = item.organization; // Название организации берём только первое

    let sumMbCost = gv(item.mbCostCorrect);
    let sumSpCost = gv(item.spCostTraffic);
    let sumResult = gv(item.result);

    // Если в новом массиве нет такого проекта, то добавляем
    const currentProject = arrResult.find(res => res.project === item.project)
    if (! currentProject) {
      for (let j = i + 1; j < arrForBigTable.length; j++) {
        if (item.project === arrForBigTable[j].project) {
          sumMbCost += gv(arrForBigTable[j].mbCostCorrect);
          sumSpCost += gv(arrForBigTable[j].spCostTraffic);
          sumResult += gv(arrForBigTable[j].result);
        }
      }

      obj.sumMbCost = Number(sumMbCost.toFixed(2));
      obj.sumSpCost = Number(sumSpCost.toFixed(2));
      obj.result    = Number(sumResult.toFixed(2));

      arrResult.push(obj);
      obj = {} as MainItem;
    }
  });
  
  return arrResult
}


/** Меняем точку на запятую в переданном свойстве объекта */

// export const changePointToComma = (
//   arr       : MainItem[],
//   attribute : keyof MainItem // свойство объекта
// ) => {
//   const arrResult = [] as MainItem[];
//   arr.forEach(item => {
//     let obj = {} as MainItem;
//     obj = { ...item };
//     // @ts-ignore
//     // obj.result = String(item[attribute]).replace(/\./g, ',');
//     obj.mbTraffic = Number(item.mbTraffic);
//     obj.result    = Number(item.result);
//     obj.spTraffic = Number(item.spTraffic);
    
//     arrResult.push(obj);
//   });

//   return arrResult;
// };
