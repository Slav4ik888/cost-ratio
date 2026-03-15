import { Errors } from 'shared/lib/validators';
import { User } from '../../types/user';


export interface StateSchemaServiceDesk {
  auth      : boolean
  user      : User
  loading   : boolean
  errors    : Errors
  _isLoaded : boolean // Вернулся ответ от сервера, чтобы не загружать повторно (в бесконечном цикле)
}
