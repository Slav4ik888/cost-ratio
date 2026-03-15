/**
 * ПОЛУЧАЕМ ДАННЫЕ С ГУГЛ ТАБЛИЦЫ О КЛИЕНТАХ, ПРОЕКТАХ И СТАНЦИЯХ
 *
 * @param {string} url адрес на гугл таблицу
 * 
 * @return {array} arr  
 */


export const getFromGoogleData = async (url: string) => {
  
    let arr = [] as any[];
    let obj = {} as any;
  
    const response = await fetch(url);
    const res = await response.json();
    
    for (let item of res.result) {
        obj.siteID = item[0];
        // obj.siteID = obj.siteID.split(' ').join('');
        obj.project = item[2];
        obj.organization = item[1];
        arr.push(obj);

        obj = {};
    }
    return arr;
}
