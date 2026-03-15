import { SCHEMA_NAME } from 'shared/lib/validators/ajv';


export const definitions = {
  $id                  : SCHEMA_NAME.DEFS_PERSON,
  type                 : 'object',
  additionalProperties : false,

  definitions: {
    person: {
      type                 : 'object',
      additionalProperties : false,
      properties: {

        displayName: {
          type      : 'string',
          maxLength : 100
        },
        avatarUrl: {
          type      : 'string',
          maxLength : 300
        },
        phoneNumber: { $ref: `${SCHEMA_NAME.DEFS_PHONE}#/definitions/number` },

        fio: {
          type                 : 'object',
          additionalProperties : false,
          properties: {
            firstName  : { $ref: `${SCHEMA_NAME.DEFS_FIO}#/definitions/firstName` },
            secondName : { $ref: `${SCHEMA_NAME.DEFS_FIO}#/definitions/secondName` },
            middleName : { $ref: `${SCHEMA_NAME.DEFS_FIO}#/definitions/middleName` }
          }
        },
        // phones: {
        //   type  : 'array',
        //   items : { $ref: SCHEMA_NAME.PHONE_NUMBER },
        //   maxItems: 10
        // }
      }
    }
  }
}
