import { ServiceDeskType } from '../../../types';

/**
 * ПОЛУЧАЕМ ДАННЫЕ С ГУГЛ ТАБЛИЦЫ О КЛИЕНТАХ, ПРОЕКТАХ И СТАНЦИЯХ
 * @param {string} url адрес на гугл таблицу
 * @returns {array} arr  
 */
export const getFromGoogleData = async (url: string): Promise<ServiceDeskType[]> => {
  
    let arr: ServiceDeskType[] = [];
    let obj = {} as ServiceDeskType;
  
    const response = await fetch(url);
    const res = await response.json();
    
    for (let item of res.result) {
        obj.siteID       = item[0];
        obj.organization = item[1];
        obj.project      = item[2];
        arr.push(obj);

        obj = {} as ServiceDeskType;
    }
    return arr;
}
