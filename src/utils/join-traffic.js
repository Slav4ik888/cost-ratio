/************************************************/
/*    Объединяем входящий и исходящий трафик    */
/************************************************/

export const joinTraffic = arr => {
    
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

  const mbSiteId = returnArrMb(arrNew); // Возвращает массив помегабайтного
  const striteSiteId = returnArrSprite(arrNew); // Возвращает массив полосной

  return {arrNew, mbSiteId, striteSiteId}
  // this.setState({
  //     arrFromAltegra: arrNew,
  // });
}


// Возвращает массив помегабайтного
const returnArrMb = arr => {
    let newArr = [];
    for(let item of arr) {
            if (!item.siteID.endsWith("-2") ) newArr.push(item);
    }

    return newArr
    // this.setState({
    //     mbSiteId: newArr,
    // }); 
}


// Возвращает массив полосной
const returnArrSprite = arr => {
    let newArr = [];
    for(let item of arr) {
            if (item.siteID.endsWith("-2") ) {
                    item.siteID = item.siteID.slice(0,-2);
                    newArr.push(item);
            }
    }
    return newArr
    // this.setState({
    //     striteSiteId: newArr,
    // }); 
}