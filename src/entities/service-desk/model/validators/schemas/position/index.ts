import { SCHEMA_NAME } from 'shared/lib/validators/ajv';


export const schema = {
  $id                  : SCHEMA_NAME.POSITION,
  type                 : 'object',
  required             : ['id'],
  additionalProperties : false,

  properties: {
    id   : { $ref: `${SCHEMA_NAME.DEFS_ITEM_BASE}#/definitions/id` },

    // ITEM-BASE
    order       : { $ref: `${SCHEMA_NAME.DEFS_ITEM_BASE}#/definitions/order` },
    createdAt   : { $ref: SCHEMA_NAME.FIX_DATE },
    lastChange  : { $ref: SCHEMA_NAME.FIX_DATE }
  }
};
