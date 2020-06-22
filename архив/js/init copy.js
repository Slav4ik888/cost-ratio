


/**************************************/
/**************************************/
/*         ИНИЦИАЛИЗАЦИЯ              */
/**************************************/
/**************************************/


///////////////////////////////
//  ОБЩИЕ ИТОГОВЫЕ ЗНАЧЕНИЯ  //
///////////////////////////////

// Итоговая сумма счёт/фактуры
// let factura = {
//     value: 0, // 779797.36,
//     sprite: 0, // 205887.1,
//     mb: 0, // value - sprite, // Общие затраты по трафику
// }

// // Общие затраты по трафику рассчитанные
// let mbCostAll = 0;

//     // Подсчёт общих затрат по Мб трафику 
//     function sumMbCostAll() {
//         for(let stantion of storage) {
//             mbCostAll += +stantion.mbCostTraffic;
//         };
//         return mbCostAll.toFixed(2);
//     };

// // Общий трафик в полосе
// let spTrafficAll = 0;
//     // Подсчёт общего трафика полосы
//     function sumSpTrafficAll() {
//         for(let stantion of storage) {
//             spTrafficAll += +stantion.spTraffic;
//         };
//         return spTrafficAll.toFixed(2);
//     };


// // Общее хранилище состоящее из общего кол-ва объектов siteID
// let storage = [];


// let objSiteID = { 
//     siteID: '',         // SiteID
//     project: null,      // Проект
//     organization: ``,   // Название организации

//     ///////////////////////////
//     // Помегабайтные затраты //
//     ///////////////////////////

//     // Стоимость за Мб
    // mbPrice: 0.132,       

    // Реальные затраты
    // Затраты за общие услуги из сч/ф
    mbCostServicies: 0,   

    // Объём трафика
    mbTraffic: 0,  

    // Входящие затраты по трафику
    mbCostTraffic: 0, // mbTraffic * mbPrice,     
                          
    // Рассчитываются пропорционально 
    // mbCostCorrect = mbCostTraffic / mbCostAll * factura.mb
    mbCostCorrect: 0,       
              

    ///////////////////////////
    //    Затраты с полосы   //
    ///////////////////////////
    
    // Объём трафика по станции
    spTraffic: 0,    
    // Стоимость пропорционально общей сумме затрат за полосу
    spCostTraffic: 0, // spTraffic / spTrafficAll * factura.sprite
    

    ///////////////////////////
    //    Итоговые затраты   //
    ///////////////////////////
    
    result: 0, // mbCostCorrect + spCostTraffic
    
}




// меняем точку на запятую 
// function transformToNumber( arr ) {
//     for(let item of arr) {
//         item.result = item.result.replace(/\./g,',');
//     }
//     return arr;
}



// собирает итоговую таблицу 
function collectTableFinish( title, arr ) {
    let table = `<table><caption class="capt">${title}</caption><tr>
                    <th>Проект</th>
                    <th>Затраты итого</th>
                </tr>`;
    for(let i=0; i<arr.length; i++) {
        table += `<tr><td>${arr[i].project}</td>
                      <td>${arr[i].result}</td>
                  </tr>`;
    }
    // закрыть таблицу
    table += '</table>';
    return table;
}






/**************************************/
/*               СБОРКА               */
/**************************************/

function init() {
    //let arr = getArrFromAltegra();

    //let newArr = joinTraffic(arr); // Объединяем траффик


    // формируем таблицы и выводим её
    // const aFARM = document.querySelector('.aFARM');
    // aFARM.textContent = "";

    // const aFARS = document.querySelector('.aFARS');
    // aFARS.textContent = "";

    // Помегабайтный
    // const mbSiteId = returnArrMb( newArr ); 
    // let table = collectTableStart( 'Помегабайтный', mbSiteId ); 
    // aFARM.insertAdjacentHTML('beforeend', table);

    // // Полосная
    // const striteSiteId = returnArrSprite( newArr );
    // table = collectTableStart( 'Полосная', striteSiteId ); 
    // aFARS.insertAdjacentHTML('beforeend', table);

    
    // Создаём по каждой станции объект siteID и формируем storage[]

    // Заполняем основной массив данными по трафику вне полосы
    // for(let st of mbSiteId) {
    //     objSiteID = {};
    //     objSiteID.siteID = st.siteID;
    //     objSiteID.project = '';
    //     objSiteID.organization = '';
    //     objSiteID.mbPrice = 0.132;
    //     objSiteID.mbCostServicies = '';
    //     objSiteID.mbTraffic = st.trafficMb;
    //     objSiteID.mbCostTraffic = (objSiteID.mbTraffic * objSiteID.mbPrice);
    //     objSiteID.mbCostCorrect = '';

    //     objSiteID.spTraffic = '';
    //     objSiteID.spCostTraffic = '';
    //     objSiteID.result = '';

    //     storage.push(objSiteID);
    // }

    // Заполняем данными по трафику в полосе
    // for(let st of striteSiteId) {
    //     objSiteID = {};
    //     let result = storage.find( obj => obj.siteID === st.siteID);
    //     if (result) {
    //         result.spTraffic = st.trafficMb;
    //     } else {
    //         objSiteID = {};
    //         objSiteID.siteID = st.siteID;
    //         objSiteID.project = '';
    //         objSiteID.organization = '';
    //         objSiteID.mbPrice = 0.132;
    //         objSiteID.mbCostServicies = '';
    //         objSiteID.mbTraffic = '';
    //         objSiteID.mbCostTraffic = '';
    //         objSiteID.mbCostCorrect = '';
    //         objSiteID.spTraffic = st.trafficMb;
    //         objSiteID.spCostTraffic = '';
    //         objSiteID.result = '';

    //         storage.push(objSiteID);
    //     }
    // }



    // Присваиваем данные из сч/фактуры
    // factura.value = 779797.36;
    // factura.sprite = 205887.1;
    // factura.mb = factura.value - factura.sprite;


    // // Подсчёт общих затрат по Мб трафику 
    // sumMbCostAll();
    // // console.log('Общие затраты по трафику рассчитанные: ', mbCostAll);

    // // // Подсчёт общего трафика полосы
    // // sumSpTrafficAll();
    // // console.log('Общий трафик в полосе рассчитанный: ', spTrafficAll);

    // // Рассчитываем Затраты скорректированные
    // for(let obj of storage) {
    //     if (obj.mbCostTraffic / mbCostAll * factura.mb) {
    //         obj.mbCostCorrect = (obj.mbCostTraffic / mbCostAll * factura.mb).toFixed(2);
    //     }
    // }

    // // Стоимость пропорционально общей сумме затрат за полосу
    // for(let obj of storage) {
    //     if (obj.spTraffic / spTrafficAll * factura.sprite) {
    //         obj.spCostTraffic = (obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2);
    //     }
    // }
    
    // // Итоговые затраты
    // for(let obj of storage) {
    //     obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2);
    // }

    // // siteId в arrayOfProject
    // for(let item of storage) {
    //     let result = arrayOfProject.find( it => it.siteID === item.siteID);
    //     if (result) {
    //         item.project = result.project;
    //         item.organization = result.organization;
    //     }
    // }
    

    // Ищем совпадения проектов и объединяем их в новый массив

    // let newStorage = [];
    
    // for(let i=0; i<storage.length; i++) {
    //     let obj = {};
    //     obj.project = storage[i].project;

    //     let res = +storage[i].result;

    //     if (!newStorage.find( it => it.project === storage[i].project)) {
    //         for(let j=i+1; j<storage.length; j++) {

    //             if (storage[i].project === storage[j].project) {
    //                 res += +storage[j].result;
    //             }
    //         }
    //         obj.result = res.toFixed(2);
    //         newStorage.push(obj);
    //         obj = {};
    //     }

    // }

    // console.log('newStorage: ', newStorage);

    // Меняем точку на запятую в итоговой ячейке
    // storage = transformToNumber(storage); 
    // newStorage = transformToNumber(newStorage); 


    // Формируем Сводную таблицу
    const storageDom = document.querySelector('.storage');
    table = collectTableResult(`Сводная таблица`, storage);
    storageDom.insertAdjacentHTML('beforeend', table);

    // Формируем Финишную таблицу
    const finishDom = document.querySelector('.finish');
    table = collectTableFinish(`Итоговая таблица`, newStorage);
    finishDom.insertAdjacentHTML('beforeend', table);

    console.log('storage: ', storage);
}