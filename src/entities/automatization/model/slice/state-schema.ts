import { AltergaItem } from 'entities/altegra';
import { Factura } from 'entities/factura';
import { Errors } from 'shared/lib/validators';
import {  } from '../../types';


export interface StateSchemaAutomatization {
  loading      : boolean
  errors       : Errors
  facturaData  : Factura
  altegraData  : AltergaItem[] // Полученные данные от Алтегры
  mbPrice      : number        // Базовая стоимость Мб - 0.132
  mbSiteId     : any[]         // Массив помегабатного трафика
  striteSiteId : any[]         // Массив полосного трафика
  mbCostAll    : number        // Общие затраты по трафику рассчитанные + доп услуги
  spTrafficAll : number        // Общий трафик в полосе
}
