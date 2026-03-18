import { AltergaItem } from 'entities/altegra';
import { Factura } from 'entities/factura';
import { Errors } from 'shared/lib/validators';
import {  } from '../../types';


export interface StateSchemaAutomatization {
  loading     : boolean
  errors      : Errors
  // _isLoaded : boolean // Вернулся ответ от сервера, чтобы не загружать повторно (в бесконечном цикле)
  facturaData : Factura
  altegraData : AltergaItem[],  // Полученные данные от Алтегры
}
