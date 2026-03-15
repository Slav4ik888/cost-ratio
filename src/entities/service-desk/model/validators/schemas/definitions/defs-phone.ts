import { SCHEMA_NAME } from 'shared/lib/validators/ajv';


export const definitions = {
  $id  : SCHEMA_NAME.DEFS_PHONE,
  type : 'object',

  definitions: {
    type : { isPhoneType: 'string' },

    // The phone number in E.164 format. Example: "+712345678".
    number: {
      type      : 'string',
      maxLength : 20
    },

    // Ext field in '(213) 373-42-53 ext. 1234' => '1234'
    extension: {
      type      : 'string',
      maxLength : 10
    },

    // The country calling code. Example: "7" - RU.
    countryCallingCode : {
      type      : 'string',
      maxLength : 7
    },

    // Default 'RU'
    countryCode : { isCountryCode: 'string' },

    // Default '### (###) ###-##-##'. Exam.: +73952775985 => +7 (395) 277-59-85
    schema      : { isPhoneNumberScheme: 'string' }
  }
};
