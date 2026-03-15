import { SCHEMA_NAME } from 'shared/lib/validators/ajv'


export const schema = {
  $id                  : SCHEMA_NAME.PERSON,
  type                 : 'object',
  additionalProperties : false,

  properties: {
    // Имя которое будет выводиться в бэйджиках
    displayName : { $ref: `${SCHEMA_NAME.DEFS_PERSON}#/definitions/person/displayName` },
    avatarUrl   : { $ref: `${SCHEMA_NAME.DEFS_PERSON}#/definitions/person/avatarUrl` },
    phoneNumber : { $ref: `${SCHEMA_NAME.DEFS_PERSON}#/definitions/person/phoneNumber` },

    fio         : { $ref: `${SCHEMA_NAME.DEFS_PERSON}#/definitions/person/fio` },
    // phones: { $ref: `${SCHEMA_NAME.DEFS_PERSON}#/definitions/phones` },
  }
};
