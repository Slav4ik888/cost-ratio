import { SchemaObjCxt } from 'ajv';
import { SCHEMA_NAME, isOneOfSeveral } from 'shared/lib/validators';
import { UserStatus } from '../../../../types';


const conditions = Object.values(UserStatus);


export const isUserStatus = {
  keyword:  'isUserStatus',
  compile : (_schema: SCHEMA_NAME, _parentSchema: SCHEMA_NAME, it: SchemaObjCxt) =>
    (data: UserStatus) => isOneOfSeveral(conditions, data)
};
