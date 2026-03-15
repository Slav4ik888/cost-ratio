import { SCHEMA_NAME } from 'shared/lib/validators/ajv';


export const definitions = {
  $id  : SCHEMA_NAME.DEFS_FIO,
  type : 'object',

  definitions: {
    firstName  : {
      type      : 'string',
      maxLength : 30
    },
    secondName : {
      type      : 'string',
      maxLength : 50
    },
    middleName : {
      type      : 'string',
      maxLength : 30
    }
  }
}
