import { PartialUser } from '../../../types';
import { SCHEMA_NAME, validate, Validation } from 'shared/lib/validators';


export const validateUserData = (data: PartialUser): Validation => validate(SCHEMA_NAME.USER, data);
