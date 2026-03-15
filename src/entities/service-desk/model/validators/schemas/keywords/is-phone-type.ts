import { SchemaObjCxt } from 'ajv';
import { SCHEMA_NAME, isOneOfSeveral } from 'shared/lib/validators';
import { PhoneType } from '../../../../types';


const conditions = Object.values(PhoneType);


export const isPhoneType = {
  keyword : 'isPhoneType',
  compile : (_schema: SCHEMA_NAME, _parentSchema: SCHEMA_NAME, it: SchemaObjCxt) =>
    (data: PhoneType) => isOneOfSeveral(conditions, data)
};
