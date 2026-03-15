import { SchemaObjCxt } from 'ajv';
import { SCHEMA_NAME, isOneOfSeveral } from 'shared/lib/validators';
import { CountryCode } from '../../../../types';


const conditions = Object.values(CountryCode);


export const isCountryCode = {
  keyword : 'isCountryCode',
  compile : (_schema: SCHEMA_NAME, _parentSchema: SCHEMA_NAME, it: SchemaObjCxt) =>
    (data: CountryCode) => isOneOfSeveral(conditions, data)
};
