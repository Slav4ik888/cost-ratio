import { SchemaObjCxt } from 'ajv';
import { SCHEMA_NAME, isOneOfSeveral } from 'shared/lib/validators';
import { PhoneNumberScheme } from '../../../../types';


const conditions = Object.values(PhoneNumberScheme);


export const isPhoneNumberScheme = {
  keyword : 'isPhoneNumberScheme',
  compile : (_schema: SCHEMA_NAME, _parentSchema: SCHEMA_NAME, it: SchemaObjCxt) =>
    (data: PhoneNumberScheme) => isOneOfSeveral(conditions, data)
};
