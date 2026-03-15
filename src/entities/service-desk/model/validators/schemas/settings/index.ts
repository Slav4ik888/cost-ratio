import { SCHEMA_NAME } from 'shared/lib/validators/ajv'


export const schema = {
  $id                  : SCHEMA_NAME.USER_SETTINGS,
  type                 : 'object',
  additionalProperties : false,

  properties: {
    // hintsDontShowAgain: {
    //   type  : 'array',
    //   items : {
    //     type: 'string',
    //     maxLength : 50
    //   },
    //   maxItems: 50
    // },
  }
};
