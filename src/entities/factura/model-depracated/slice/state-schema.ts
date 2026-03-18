import { Errors } from 'shared/lib/validators';
import { Factura } from '../../types';


export interface StateSchemaFactura {
  loading : boolean
  errors  : Errors
  factura : Factura // Данные со счёт-фактуры
                    // value: 779797.3,
                    // sprite: 205887.1,
                    // mb: 573910.2,
}
