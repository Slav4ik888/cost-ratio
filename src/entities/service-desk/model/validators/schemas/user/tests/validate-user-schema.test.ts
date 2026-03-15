import { User } from '../../../../../types';
import { SCHEMA_NAME, validate } from 'shared/lib/validators';
import { MOCK_USER_EMPLOYEE, MOCK_USER_EMPTY, MOCK_USER_ID } from '../../../../../lib/mocks';
import { creatorUser } from '../../../../../lib/creators';
import { MOCK_DATE_13_03_2023 } from 'entities/base/mocks';
import { getMockStrLength } from 'shared/helpers/strings';
import { createArr } from 'shared/helpers/arrays';



describe(`Validate scheme - ${SCHEMA_NAME.USER}`, () => {
  test('should validate user EMPTY schema', () => {
    const userData: User = creatorUser(MOCK_USER_EMPTY);

    expect(validate(SCHEMA_NAME.USER, userData)).toEqual({
      errors: {
        'companyId': 'Поле "companyId" не должно быть меньше 20 символов.',
        'email': 'Не верный формат данных, для поля "email".',
        'id': 'Поле "id" не должно быть меньше 28 символов.',
        'userId': 'Поле "userId" не должно быть меньше 28 символов.',
      },
      valid: false
    })
  });

  test('should validate user EMPLOYEE schema', () => {
    const userData: User = creatorUser(MOCK_USER_EMPLOYEE);
    userData.partner = {
      partnerId  : 'slava',
      referrerId : 'oleg',
    };


    expect(validate(SCHEMA_NAME.USER, userData)).toEqual({
      errors: {}, valid: true
    })
  });

  test('should invalid fields of company date', () => {
    const userData: User = {
      ...creatorUser(MOCK_USER_EMPLOYEE),
      person: {
        ...MOCK_USER_EMPLOYEE.person,
        fio: {
          ...MOCK_USER_EMPLOYEE.person.fio,
          // @ts-ignore
          addFioProperty : '123',
        },
        // @ts-ignore
        addPersonProperty : '123',
      },
      settings: {
        hintsDontShowAgain: [
          ...createArr(50, '1'),
          getMockStrLength(101),
        ]
      },
      // @ts-ignore
      additionalProperty: '123',
      partner: {
        partnerId  : getMockStrLength(29),
        referrerId : getMockStrLength(29)
      }
    };

    // console.log('userData: ', userData);


    expect(validate(SCHEMA_NAME.USER, userData)).toEqual({
      valid: false,
      errors: {
        '50'                 : 'Поле "50" не должно быть больше 100 символов.',
        'hintsDontShowAgain' : 'Массив "hintsDontShowAgain" не должен быть больше 50 элементов.',
        'addFioProperty'     : 'Присутствует недопустимое поле "addFioProperty".',
        'addPersonProperty'  : 'Присутствует недопустимое поле "addPersonProperty".',
        'additionalProperty' : 'Присутствует недопустимое поле "additionalProperty".',
        'partnerId'          : 'Поле "partnerId" не должно быть больше 28 символов.',
        'referrerId'         : 'Поле "referrerId" не должно быть больше 28 символов.',
      }
    });
  });
});

// npm run test:unit validate-user-schema.test.ts
