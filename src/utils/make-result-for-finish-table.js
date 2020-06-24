/**********************************************************/
/*   Ищем совпадения проектов и создаём итоговую таблицу  */
/**********************************************************/

export const makeResultForFinishTable = arr => {
  let lastBigStore = [], newStorage = [];
  
  for(let i=0; i<arr.length; i++) {
    let obj = {};
    obj.project = arr[i].project;

    let res = +arr[i].result;

    if (!newStorage.find( it => it.project === arr[i].project)) {
      for(let j=i+1; j<arr.length; j++) {
        if (arr[i].project === arr[j].project) {
          res += +arr[j].result;
        }
      }
      obj.result = res.toFixed(2);
      newStorage.push(obj);
      obj = {};
    }
  }
  // Меняем точку на запятую в итоговой ячейке
  lastBigStore = arr.concat();
  lastBigStore.forEach( item => item.result = item.result.replace(/\./g,','));
  
  newStorage.forEach( item => item.result = item.result.replace(/\./g,','));

  return {lastBigStore, newStorage}
}
