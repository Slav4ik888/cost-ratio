/**
 * ПОЛУЧАЕМ ДАННЫЕ С ГУГЛ ТАБЛИЦЫ О КЛИЕНТАХ, ПРОЕКТАХ И СТАНЦИЯХ
 *
 * @param {string} url адрес на гугл таблицу
 * 
 * @return {array} arr  
 */

export const getFromGoogleData = (url) => {
  
    let arr = [];
    let obj = {};
  
    return fetch(url)
        .then(response => response.json())
            .then( res => {
  
                for(let item of res.result) {
                    obj.siteID = item[0];
                    obj.siteID = obj.siteID.split(' ').join('');
                    obj.project = item[2];
                    obj.organization = item[1];
                    arr.push(obj);
                    
                    obj = {};
                }
                return arr
            });
  }
