import { SCHEMA_NAME } from 'shared/lib/validators/ajv';


export const schema = {
  $id                  : SCHEMA_NAME.PHONE_NUMBER,
  type                 : 'object',
  required             : ['id'],
  additionalProperties : false,

  properties: {
    type               : { $ref: `${SCHEMA_NAME.DEFS_PHONE}#/definitions/type` },
    number             : { $ref: `${SCHEMA_NAME.DEFS_PHONE}#/definitions/number` },
    extension          : { $ref: `${SCHEMA_NAME.DEFS_PHONE}#/definitions/extension` },
    countryCallingCode : { $ref: `${SCHEMA_NAME.DEFS_PHONE}#/definitions/countryCallingCode` },
    countryCode        : { $ref: `${SCHEMA_NAME.DEFS_PHONE}#/definitions/countryCode` },
    schema             : { $ref: `${SCHEMA_NAME.DEFS_PHONE}#/definitions/schema` },

    // ITEM-BASE
    id                 : { $ref: `${SCHEMA_NAME.DEFS_ITEM_BASE}#/definitions/id` },
    order              : { $ref: `${SCHEMA_NAME.DEFS_ITEM_BASE}#/definitions/order` },

    createdAt          : { $ref: SCHEMA_NAME.FIX_DATE },
    lastChange         : { $ref: SCHEMA_NAME.FIX_DATE }
  }
};
