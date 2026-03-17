import { Errors } from 'shared/lib/validators';
import { ServiceDeskType } from '../../types';


export interface StateSchemaServiceDesk {
  data      : ServiceDeskType[]
  loading   : boolean
  errors    : Errors
  _isLoaded : boolean // Вернулся ответ от сервера, чтобы не загружать повторно (в бесконечном цикле)
}
