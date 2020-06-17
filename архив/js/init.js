"use strict";


/**************************************/
/*         КНОПКИ ВЕРХНЕГО МЕНЮ       */
/**************************************/

// логотип
const logo = document.querySelector('.logo');

// поиск
const inputSearch = document.querySelector('.input-search');
// тренировка
const buttonTrain = document.querySelector('.button-train');

// 
const arrFromAltegra = document.getElementById('arrFromAltegra');


let arrayOfProject = [
    {siteID: 'RTA5CS10046', project: '1563', organization: 'ООО СемКор'},
    {siteID: 'RTA5CS10047', project: '1252', organization: 'ООО Козориз и К'},
    {siteID: 'RTA5CS10048', project: '1563', organization: 'ООО СемКор'},
    {siteID: 'RTA5CS10049', project: '1130', organization: 'ООО Нергеопром'},
    {siteID: 'RTA5CS10050', project: '1598', organization: 'АО Электроуралмонтаж'},
    {siteID: 'RTA5CS10115', project: '668', organization: 'ООО Урюмкан'},
    {siteID: 'RTA5CS10116', project: '668', organization: 'ООО Урюмкан'},
    {siteID: 'RTA5CS10221', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS10234', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS10319', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS10320', project: '2166', organization: 'ООО Петромир'},
    {siteID: 'RTA5CS10330', project: '1828', organization: 'ООО Сигма-гео'},
    {siteID: 'RTA5CS10596', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS10656', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS10735', project: '810', organization: 'АО ИЭРП'},
    {siteID: 'RTA5CS10744', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5CS10820', project: '1662', organization: 'ООО Импульс'},
    {siteID: 'RTA5CS10821', project: '1742', organization: 'ООО РАСТАМ - Экология'},
    {siteID: 'RTA5CS10822', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5CS10823', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS10824', project: '1563', organization: 'ООО СемКор'},
    {siteID: 'RTA5CS11162', project: '1252', organization: 'ООО Козориз и К'},
    {siteID: 'RTA5CS11488', project: '1400', organization: 'ООО ЛКТ'},
    {siteID: 'RTA5CS11566', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS11662', project: '1282', organization: 'ООО УМИД'},
    {siteID: 'RTA5CS11765', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5CS11809', project: '1130', organization: 'ООО Нергеопром'},
    {siteID: 'RTA5CS12421', project: '1727', organization: 'ООО ВСТ-И'},
    {siteID: 'RTA5CS12632', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5CS12890', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS12891', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS12898', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5CS14189', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5CS14192', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5CS14195', project: '480', organization: 'ООО Лена Золото'},
    {siteID: 'RTA5CS14197', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5CS14198', project: '2247', organization: 'ООО ПМК 24'},
    {siteID: 'RTA5CS14199', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5CS14203', project: '668', organization: 'ООО Урюмкан'},
    {siteID: 'RTA5CS14205', project: '643', organization: 'ООО МК-152'},
    {siteID: 'RTA5CS14210', project: '1099', organization: 'ООО Сибна'},
    {siteID: 'RTA5CS14221', project: '2022', organization: 'ООО Раритет'},
    {siteID: 'RTA5CS14222', project: '1252', organization: 'ООО Козориз и К'},
    {siteID: 'RTA5CS14224', project: '811', organization: 'ЗАО Новые дороги'},
    {siteID: 'RTA5CS14228', project: '2005', organization: 'АО Деловая Сеть-Иркутск'},
    {siteID: 'RTA5CS14229', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5CS14233', project: '1130', organization: 'ООО Нергеопром'},
    {siteID: 'RTA5CS14237', project: '643', organization: 'ООО МК-152'},
    {siteID: 'RTA5CS14238', project: '525', organization: 'ООО Востокэлектромонтаж'},
    {siteID: 'RTA5CS14239', project: '2154', organization: 'МКУК ИДЦ "Радуга"'},
    {siteID: 'RTA5CS14242', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5CS14251', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5CS14253', project: '1373', organization: 'ЗАО СП Мекаминефть'},
    {siteID: 'RTA5CS14273', project: '1282', organization: 'ООО УМИД'},
    {siteID: 'RTA5CS14274', project: '1465', organization: 'ОГКУСО Центр помощи детям оставшимся без попечения родителей'},
    {siteID: 'RTA5CS15873', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5CS15876', project: 'Черемхово', organization: 'Черемхово'},
    {siteID: 'RTA5CS15877', project: 'Черемхово', organization: 'Черемхово'},
    {siteID: 'RTA5CS15878', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS16409', project: '1912', organization: 'ООО БМК'},
    {siteID: 'RTA5CS16410', project: 'Черемхово', organization: 'Черемхово'},
    {siteID: 'RTA5CS16411', project: '1828', organization: 'ООО Сигма-гео'},
    {siteID: 'RTA5CS16412', project: '1932', organization: 'ООО "Группа ЭНЭЛТ"'},
    {siteID: 'RTA5CS16470', project: '1373', organization: 'ЗАО СП Мекаминефть'},
    {siteID: 'RTA5CS16471', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS16473', project: '1991', organization: 'АО Пусковой элемент'},
    {siteID: 'RTA5CS17033', project: '525', organization: 'ООО Востокэлектромонтаж'},
    {siteID: 'RTA5CS17034', project: '1975', organization: 'ООО Инвестмашсервис'},
    {siteID: 'RTA5CS17036', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS17063', project: '1373', organization: 'ЗАО СП Мекаминефть'},
    {siteID: 'RTA5CS17867', project: '2005', organization: 'АО Деловая Сеть-Иркутск'},
    {siteID: 'RTA5CS17868', project: '2005', organization: 'АО Деловая Сеть-Иркутск'},
    {siteID: 'RTA5CS17869', project: '2005', organization: 'АО Деловая Сеть-Иркутск'},
    {siteID: 'RTA5CS17870', project: '2005', organization: 'АО Деловая Сеть-Иркутск'},
    {siteID: 'RTA5CS18582', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS18584', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS18585', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS18587', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS18588', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS18589', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS18590', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS18591', project: '2101', organization: 'ООО ТД Ангара'},
    {siteID: 'RTA5CS18592', project: '1130', organization: 'ООО Нергеопром'},
    {siteID: 'RTA5CS18593', project: '2005', organization: 'АО Деловая Сеть-Иркутск'},
    {siteID: 'RTA5CS18594', project: '777', organization: 'ООО Измерон-сервис'},
    {siteID: 'RTA5CS18971', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS18972', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS18973', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5CS21505', project: '2213', organization: 'ОГАУ ИТЦИО'},
    {siteID: 'RTA5CS21506', project: '2067', organization: 'ООО Русгазбурение'},
    {siteID: 'RTA5CS21690', project: '1300', organization: 'ООО СК Интеграл'},
    {siteID: 'RTA5CS21691', project: '1284', organization: 'ООО Стройконтракт'},
    {siteID: 'RTA5CS21692', project: '1644', organization: 'ООО Кундат'},
    {siteID: 'RTA5CS21695', project: '257', organization: 'ООО АСМ'},
    {siteID: 'RTA5CS21696', project: '1252', organization: 'ООО Козориз и К'},
    {siteID: 'RTA5CS21687', project: '1340', organization: 'ООО Енисейэнергострой'},
    {siteID: 'RTA5CS21765', project: '1745', organization: 'ООО Сервис-Строй'},
    {siteID: 'RTA5CS22590', project: '1300', organization: 'ООО СК Интеграл'},
    {siteID: 'RTA5CS9304', project: '-', organization: 'тест'},
    {siteID: 'RTA5DD1069', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD1089', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD1110', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD1111', project: '1572', organization: 'ООО ЛЭМ'},
    {siteID: 'RTA5DD1113', project: '707', organization: 'ООО Навигатор'},
    {siteID: 'RTA5DD1271', project: '500', organization: 'ООО СибТЛ ЛТД'},
    {siteID: 'RTA5DD1340', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5DD1381', project: '707', organization: 'ООО Навигатор'},
    {siteID: 'RTA5DD1382', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5DD1402', project: '713', organization: 'ООО Виктория'},
    {siteID: 'RTA5DD1418', project: '1530', organization: 'Ангарская экспедиция'},
    {siteID: 'RTA5DD1597', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD1614', project: '795', organization: 'ООО Фирма Никалид'},
    {siteID: 'RTA5DD1701', project: '257', organization: 'ООО АСМ'},
    {siteID: 'RTA5DD2251', project: '643', organization: 'ООО МК-152'},
    {siteID: 'RTA5DD3805', project: '1130', organization: 'ООО Нергеопром'},
    {siteID: 'RTA5DD3806', project: '1130', organization: 'ООО Нергеопром'},
    {siteID: 'RTA5DD3807', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5DD3808', project: '811', organization: 'ЗАО Новые дороги'},
    {siteID: 'RTA5DD3809', project: '1141', organization: 'ООО Сибирская геологическая компания'},
    {siteID: 'RTA5DD4075', project: '1099', organization: 'ООО Сибна'},
    {siteID: 'RTA5DD4149', project: '1099', organization: 'ООО Сибна'},
    {siteID: 'RTA5DD4151', project: '1184', organization: 'ООО СП-Инвест'},
    {siteID: 'RTA5DD4203', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5DD4694', project: '1234', organization: 'ООО Глинки'},
    {siteID: 'RTA5DD4695', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD4696', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD4697', project: '668', organization: 'ООО Урюмкан'},
    {siteID: 'RTA5DD5175', project: '1151', organization: 'ООО Закаменск ЖКХ'},
    {siteID: 'RTA5DD5176', project: '1214', organization: 'ООО Кристалл'},
    {siteID: 'RTA5DD5177', project: '1214', organization: 'ООО Кристалл'},
    {siteID: 'RTA5DD5178', project: '1214', organization: 'ООО Кристалл'},
    {siteID: 'RTA5DD5179', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD5221', project: '930', organization: 'ООО Фирма Сервисгазавтоматика'},
    {siteID: 'RTA5DD5381', project: '1304', organization: 'ООО Горизонт'},
    {siteID: 'RTA5DD5383', project: '1419', organization: 'ООО СибТрансСтрой'},
    {siteID: 'RTA5DD5384', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD6404', project: '406', organization: 'АО МеталлАктивгрупп'},
    {siteID: 'RTA5DD6406', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD6407', project: '525', organization: 'ООО Востокэлектромонтаж'},
    {siteID: 'RTA5DD6596', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5DD7054', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5DD7057', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD744', project: '257', organization: 'ООО АСМ'},
    {siteID: 'RTA5DD7689', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD7690', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD7691', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD7692', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD7696', project: '792', organization: 'ООО Фирма Адис'},
    {siteID: 'RTA5DD7697', project: '217', organization: 'ООО Нафтабурсервис'},
    {siteID: 'RTA5DD7698', project: '1432', organization: 'ООО Электросетьсервис'},
    {siteID: 'RTA5DD7699', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5DD7992', project: '1467', organization: 'ООО Предприятие буровых работ'},
    {siteID: 'RTA5DD7993', project: '217', organization: 'ООО Нафтабурсервис'},
    {siteID: 'RTA5DD7994', project: '217', organization: 'ООО Нафтабурсервис'},
    {siteID: 'RTA5DD7996', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD840', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD8453', project: '792', organization: 'ООО Фирма Адис'},
    {siteID: 'RTA5DD8454', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD8455', project: '217', organization: 'ООО Нафтабурсервис'},
    {siteID: 'RTA5DD8456', project: '643', organization: 'ООО МК-152'},
    {siteID: 'RTA5DD8457', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA5DD848', project: '954', organization: 'ФГБУ «Заповедное Прибайкалье»'},
    {siteID: 'RTA5DD850', project: '257', organization: 'ООО АСМ'},
    {siteID: 'RTA5DD8962', project: '1130', organization: 'ООО Нергеопром'},
    {siteID: 'RTA5DD8963', project: '728', organization: 'ООО Геоконтроль-Восток'},
    {siteID: 'RTA5DD8964', project: '811', organization: 'ЗАО Новые дороги'},
    {siteID: 'RTA5DD8965', project: '251', organization: 'ООО ГПК Недра'},
    {siteID: 'RTA5DD960', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD961', project: '661', organization: 'ООО Сила Сибири'},
    {siteID: 'RTA5DD972', project: '668', organization: 'ООО Урюмкан'},
    {siteID: 'RTA5JR422', project: '-', organization: 'тест'},
    {siteID: 'RTA5SS15713', project: '525', organization: 'ООО Востокэлектромонтаж'},
    {siteID: 'RTA6DD10761', project: '1745', organization: 'ООО Сервис-Строй'},
    {siteID: 'RTA6DD3743', project: '930', organization: 'ООО Фирма Сервисгазавтоматика'},
    {siteID: 'RTA6DD5385', project: '1745', organization: 'ООО Сервис-Строй'},
    {siteID: 'RTA6DD5747', project: '1300', organization: 'ООО СК Интеграл'},
    {siteID: 'RTA6DD5749', project: '1284', organization: 'ООО Стройконтракт'},
    {siteID: 'RTA6KS10861', project: '903', organization: 'ООО ЭСК Энергомост'},
    {siteID: 'RTA6KS10862', project: '1284', organization: 'ООО Стройконтракт'},
    {siteID: 'RTA6KS14257', project: '1252', organization: 'ООО Козориз и К'},
    {siteID: 'RTA6KS14532', project: '1300', organization: 'ООО СК Интеграл'},
    {siteID: 'RTA6KS15875', project: '1893', organization: 'ООО СТК Велес'},
    {siteID: 'RTA6KS18733', project: '257', organization: 'ООО АСМ'},
    {siteID: 'RTA6KS18735', project: '1252', organization: 'ООО Козориз и К'},
];

/**************************************/
/**************************************/
/*         ИНИЦИАЛИЗАЦИЯ              */
/**************************************/
/**************************************/


///////////////////////////////
//  ОБЩИЕ ИТОГОВЫЕ ЗНАЧЕНИЯ  //
///////////////////////////////

// Итоговая сумма счёт/фактуры
let factura = {
    value: 0, // 779797.36,
    sprite: 0, // 205887.1,
    mb: 0, // value - sprite, // Общие затраты по трафику
}

// Общие затраты по трафику рассчитанные
let mbCostAll = 0;

    // Подсчёт общих затрат по Мб трафику 
    function sumMbCostAll() {
        for(let stantion of storage) {
            mbCostAll += +stantion.mbCostTraffic;
        };
        return mbCostAll.toFixed(2);
    };

// Общий трафик в полосе
let spTrafficAll = 0;
    // Подсчёт общего трафика полосы
    function sumSpTrafficAll() {
        for(let stantion of storage) {
            spTrafficAll += +stantion.spTraffic;
        };
        return spTrafficAll.toFixed(2);
    };


// Общее хранилище состоящее из общего кол-ва объектов siteID
let storage = [];


let objSiteID = { 
    siteID: '',         // SiteID
    project: null,      // Проект
    organization: ``,   // Название организации

    ///////////////////////////
    // Помегабайтные затраты //
    ///////////////////////////

    // Стоимость за Мб
    mbPrice: 0.132,       

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


/************************************************/
/* ПРИНИМАЕМ И СОЗДАЁМ МАССИВ ИЗ ДАННЫХ АЛТЕГРЫ */
/************************************************/
function madeProject() {
    
    // принимаем текст и создаём из него массив слов
    let str = document.getElementById('arrProject').value;
    str = str.replace(/\n/g,'*'); // добавляем * в конце строки
  
    // Запускаем цикл преобразование полученных данных в строки
    let arr = [];
    let obj = {
        siteID: ``,
        project: ``, 
        organization: ``, 
    }
  
    while (true) {
        if ( str.indexOf('\t') == -1 ) break; //если нет табуляции, значит строки закончились
  
        obj.siteID = str.slice(0, str.indexOf('\t') );
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        obj.project = str.slice(0, str.indexOf('\t') );
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        // ищем и сохраняем прайс
        // если последняя строка, отдаём всё слово до конца, тк не даёт последний символ
        if ( str.indexOf('*') === -1 ) { 
            obj.organization = str;
        } else {
            // Последнее слово берём всё до звёздочки
            obj.organization = str.slice(0, str.indexOf('*') );
            str = str.slice( str.indexOf('*') + 1 ); // удаляем его из строки
        }
        arr.push(obj); // результат obj добавляем в массив
        obj = {};
    }
    console.log('arr: ', arr);
    return arr;
}

function madeInit() {

    let arr = madeProject();

    // Прочитать все объекты из базы 
    // добавить к ним ID и вывести все строки
    let str = "";
    for(let item of  arr) {
        str += `{siteID: '${item.siteID}', project: '${item.project}', organization: '${item.organization}'}, <br/>`;
    }
    document.getElementById('res').innerHTML = str;

}



/************************************************/
/* ПРИНИМАЕМ И СОЗДАЁМ МАССИВ ИЗ ДАННЫХ АЛТЕГРЫ */
/************************************************/
function getArrFromAltegra() {
    
    // принимаем текст и создаём из него массив слов
    let str = document.getElementById('arrFromAltegra').value;
    str = str.replace(/\n/g,'*'); // добавляем * в конце строки
  
    // Запускаем цикл преобразование полученных данных в строки
    let arr = [];
    let obj = {
        siteID: ``,
        trafficType: ``, 
        trafficMb: ``, 
        price: ``,
    }
  
    while (true) {
        if ( str.indexOf('\t') == -1 ) break; //если нет табуляции, значит строки закончились
  
        obj.siteID = str.slice(0, str.indexOf('\t') );
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        obj.trafficType = str.slice(0, str.indexOf('\t') );
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        obj.trafficMb = str.slice(0, str.indexOf('\t') );
        obj.trafficMb = transformSpace( obj.trafficMb ); // удаляем пробелы из трафика
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        // ищем и сохраняем прайс
        // если последняя строка, отдаём всё слово до конца, тк не даёт последний символ
        if ( str.indexOf('*') === -1 ) { 
            obj.price = str;
        } else {
            // Последнее слово берём всё до звёздочки
            obj.price = str.slice(0, str.indexOf('*') );
            str = str.slice( str.indexOf('*') + 1 ); // удаляем его из строки
        }
        arr.push(obj); // результат obj добавляем в массив
        obj = {};
    }
    return arr;
}

  
// убираем пробелы
function transformSpace( text ) {
    let value;
    value = text.replace(/\s/g,'');
    return value;
}


/************************************************/
/*    Объединяем входящий и исходящий трафик    */
/************************************************/

function joinTraffic( arr ) {
    let arrNew = [];
    let sum = 0;
    let obj = {};
  
    for(let i=0; i<arr.length; i++) {
        sum = +arr[i].trafficMb; // начальное значение

        // если уже обработали этот siteID, то пропускаем
        if (!arrNew.find( item => item.siteID == arr[i].siteID) ) {
            for(let j=i+1; j<arr.length; j++) {
                if (arr[i].siteID === arr[j].siteID) sum += +arr[j].trafficMb;
            }
            obj = arr[i];
            obj.trafficMb = sum.toFixed(2);
            arrNew.push(obj);
            obj = {};
        }
    }

    return arrNew;
}


// меняем точку на запятую 
function transformToNumber( arr ) {
    for(let item of arr) {
        item.result = item.result.replace(/\./g,',');
    }
    return arr;
}



// Возвращает массив помегабайтного
function returnArrMb( arr ) {
    let newArr = [];
    for(let item of arr) {
        if (!item.siteID.endsWith("-2") ) newArr.push(item);
    }
    return newArr;
}



// Возвращает массив полосной
function returnArrSprite( arr ) {
    let newArr = [];
    for(let item of arr) {
        if (item.siteID.endsWith("-2") ) {
            item.siteID = item.siteID.slice(0,-2);
            newArr.push(item);
        }
    }
    return newArr;
}



// собирает таблицу с итоговыми результатами из arr
function collectTableStart( title, arr ) {
    let table = `<table><caption class="capt">${title}</caption><tr><th>Станция</th><th>Трафик(MB)</th></tr>`;
    for(let i=0; i<arr.length; i++) {
        table += '<tr><td>' + arr[i].siteID + '</td>' + '<td>' + arr[i].trafficMb + '</td></tr>';
    }
    // закрыть таблицу
    table += '</table>';
    return table;
}


// собирает итоговую таблицу 
function collectTableResult( title, arr ) {
    let table = `<table><caption class="capt">${title}</caption><tr>
                    <th>SiteID</th>
                    <th>Проект</th>
                    <th>Клиент</th>
                    <th>Стоимость Мб</th>
                    <th>Затраты из сч/ф</th>
                    <th>Трафик (вне полосы)</th>
                    <th>Входящие затраты по трафику</th>
                    <th>Затраты скорректированные</th>
                    <th>Трафик с полосы</th>
                    <th>Затраты с полосы</th>
                    <th>Затраты итого</th>
                </tr>`;
    for(let i=0; i<arr.length; i++) {
        table += `<tr><td>${arr[i].siteID}</td> 
                      <td>${arr[i].project}</td>
                      <td>${arr[i].organization}</td>
                      <td>${arr[i].mbPrice}</td>
                      <td>${arr[i].mbCostServicies}</td>
                      <td>${arr[i].mbTraffic}</td>
                      <td>${arr[i].mbCostTraffic.toFixed(2)}</td>
                      <td>${arr[i].mbCostCorrect}</td>
                      <td>${arr[i].spTraffic}</td>
                      <td>${arr[i].spCostTraffic}</td>
                      <td>${arr[i].result}</td>
                  </tr>`;
    }
    // закрыть таблицу
    table += '</table>';
    return table;
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
    let arr = getArrFromAltegra();

    let newArr = joinTraffic(arr); // Объединяем траффик


    // формируем таблицы и выводим её
    const aFARM = document.querySelector('.aFARM');
    aFARM.textContent = "";

    const aFARS = document.querySelector('.aFARS');
    aFARS.textContent = "";

    // Помегабайтный
    const mbSiteId = returnArrMb( newArr ); 
    let table = collectTableStart( 'Помегабайтный', mbSiteId ); 
    aFARM.insertAdjacentHTML('beforeend', table);

    // Полосная
    const striteSiteId = returnArrSprite( newArr );
    table = collectTableStart( 'Полосная', striteSiteId ); 
    aFARS.insertAdjacentHTML('beforeend', table);

    
    // Создаём по каждой станции объект siteID и формируем storage[]

    // Заполняем данными по трафику вне полосы
    for(let st of mbSiteId) {
        objSiteID = {};
        objSiteID.siteID = st.siteID;
        objSiteID.project = '';
        objSiteID.organization = '';
        objSiteID.mbPrice = 0.132;
        objSiteID.mbCostServicies = '';
        objSiteID.mbTraffic = st.trafficMb;
        objSiteID.mbCostTraffic = (objSiteID.mbTraffic * objSiteID.mbPrice);
        objSiteID.mbCostCorrect = '';

        objSiteID.spTraffic = '';
        objSiteID.spCostTraffic = '';
        objSiteID.result = '';

        storage.push(objSiteID);
    }

    // Заполняем данными по трафику в полосе
    for(let st of striteSiteId) {
        objSiteID = {};
        let result = storage.find( obj => obj.siteID === st.siteID);
        if (result) {
            result.spTraffic = st.trafficMb;
        } else {
            objSiteID = {};
            objSiteID.siteID = st.siteID;
            objSiteID.project = '';
            objSiteID.organization = '';
            objSiteID.mbPrice = 0.132;
            objSiteID.mbCostServicies = '';
            objSiteID.mbTraffic = '';
            objSiteID.mbCostTraffic = '';
            objSiteID.mbCostCorrect = '';
            objSiteID.spTraffic = st.trafficMb;
            objSiteID.spCostTraffic = '';
            objSiteID.result = '';

            storage.push(objSiteID);
        }
    }



    // Присваиваем данные из сч/фактуры
    factura.value = 779797.36;
    factura.sprite = 205887.1;
    factura.mb = factura.value - factura.sprite;


    // Подсчёт общих затрат по Мб трафику 
    sumMbCostAll();
    console.log('sumMbCostAll(): ', sumMbCostAll());
    console.log('mbCostAll: ', mbCostAll);

    // Подсчёт общего трафика полосы
    sumSpTrafficAll();
    console.log('sumSpTrafficAll(): ', sumSpTrafficAll());

    // Рассчитываем Затраты скорректированные
    for(let obj of storage) {
        if (obj.mbCostTraffic / mbCostAll * factura.mb) {
            obj.mbCostCorrect = (obj.mbCostTraffic / mbCostAll * factura.mb).toFixed(2);
        }
    }

    // Стоимость пропорционально общей сумме затрат за полосу
    for(let obj of storage) {
        if (obj.spTraffic / spTrafficAll * factura.sprite) {
            obj.spCostTraffic = (obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2);
        }
    }
    
    // Итоговые затраты
    for(let obj of storage) {
        obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2);
    }

    // siteId в arrayOfProject
    for(let item of storage) {
        let result = arrayOfProject.find( it => it.siteID === item.siteID);
        if (result) {
            item.project = result.project;
            item.organization = result.organization;
        }
    }
    

    // Ищем совпадения проектов и объединяем их в новый массив

    let newStorage = [];
    
    for(let i=0; i<storage.length; i++) {
        let obj = {};
        obj.project = storage[i].project;

        let res = +storage[i].result;

        if (!newStorage.find( it => it.project === storage[i].project)) {
            for(let j=i+1; j<storage.length; j++) {

                if (storage[i].project === storage[j].project) {
                    res += +storage[j].result;
                }
            }
            obj.result = res.toFixed(2);
            newStorage.push(obj);
            obj = {};
        }

    }

    console.log('newStorage: ', newStorage);

    // Меняем точку на запятую в итоговой ячейке
    storage = transformToNumber(storage); 
    newStorage = transformToNumber(newStorage); 


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