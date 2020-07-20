// ДЛЯ СВОДНОЙ ТАБЛИЦЫ

// Заголовки
export const BIG_TITLE = [
  `SiteID`, 
  `Проект`,
  `Клиент`, 
  `Стоимость Мб`,
  `Затраты из сч/ф`, 
  `Трафик (вне полосы)`,
  `Входящие затраты по трафику`, 
  `Затраты скорр-е`,
  `Трафик с полосы`, 
  `Затраты с полосы`,
  `Затраты итого`,
];

// Название классов для заголовка
export const BIG_TITLE_CLASS = [
  `widthSiteId`, 
  `widthProject`,
  `widthOrganization`, 
  `widthMbPrice`,
  `widthFactura`, 
  `widthMbTraffic`,
  `widthMbTrafficCost`, 
  `widthCostCorrect`,
  `widthSpTraffic`, 
  `widthSpTrafficCost`,
  `widthCostResult`,
];


export const BIG_SORT = [
  'siteID',
  'project',
  'organization',
  'mbPrice',
  'mbCostServicies',
  'mbTraffic',
  'mbCostTraffic',
  'mbCostCorrect',
  'spTraffic',
  'spCostTraffic',
  'result',
];


// ДЛЯ ТАБЛИЦЫ АНАЛИЗА

// Заголовки
export const ANALIS_TITLE = [
  `№ проекта`,
  `Проект`,
  `Затраты (Помегаб)`,
  `Затраты (Полоса)`,
  `Затраты итого`,
];

// Название классов для заголовка
export const ANALIS_TITLE_CLASS = [
  `tdProject`,
  `tdOrganization`,
  `tdSumMbCost`,
  `tdSumSpCost`,
  `tdResult`,
];

// Для сортировки
export const ANALIS_SORT = [
  `project`,
  'organization',
  `sumMbCost`,
  `sumSpCost`,
  `result`,
];

// Заголовки внутренней таблицы
export const TITLE_DETAIL_ROW_TABLE = [
  `Клиент`,
  `SiteID`,
  `Затраты (Помегаб)`,
  `Затраты (Полоса)`,
  `Затраты итого`,
];
