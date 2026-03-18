import { AltergaItem } from 'entities/altegra';
import { Errors } from 'shared/lib/validators';
import {  } from '../../types';


export interface StateSchemaAutomatization {
  loading     : boolean
  errors      : Errors
  // _isLoaded : boolean // Вернулся ответ от сервера, чтобы не загружать повторно (в бесконечном цикле)
  altegraData : AltergaItem[],  // Полученные данные от Алтегры
  
}
