import { SchemaObjCxt } from 'ajv';
import { SCHEMA_NAME, isOneOfSeveral } from 'shared/lib/validators';
import { Role } from '../../../../types';


const conditions = Object.values(Role);


export const isRole = {
  keyword : 'isRole',
  compile : (_schema: SCHEMA_NAME, _parentSchema: SCHEMA_NAME, it: SchemaObjCxt) =>
    (data: Role) => isOneOfSeveral(conditions, data)
};
