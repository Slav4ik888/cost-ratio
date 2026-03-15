import { SCHEMA_NAME } from 'shared/lib/validators/ajv';


export const schema = {
  $id                  : SCHEMA_NAME.USER,
  type                 : 'object',
  required             : ['id', 'companyId'],
  additionalProperties : false,

  properties: {
    id            : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/id` },
    companyId     : { $ref: `${SCHEMA_NAME.DEFS_COMPANY}#/definitions/id` },

    person        : { $ref: `${SCHEMA_NAME.DEFS_PERSON}#/definitions/person` },
    email         : { $ref: `${SCHEMA_NAME.DEFS_BASE}#/definitions/email` },
    permissions   : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/permissions` },
    role          : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/role` },
    emailVerified : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/emailVerified` },
    status        : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/status` },
    isEditAccess  : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/isEditAccess` },
    settings      : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/settings` },

    partner       : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/partner` },

    order         : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/order` },
    createdAt     : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/createdAt` },
    lastChange    : { $ref: `${SCHEMA_NAME.DEFS_USER}#/definitions/lastChange` },
  }
};
