import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/store';
import { StateSchemaUser } from '../slice/state-schema';
import { User, UserSettings } from '../../types';


export const selectModule = createSelector([(state: StateSchema) => state.user || {} as StateSchemaUser],
  (state: StateSchemaUser) => state);


export const selectIsLoaded         = createSelector(selectModule, (state: StateSchemaUser) => state._isLoaded);
export const selectLoading          = createSelector(selectModule, (state: StateSchemaUser) => state.loading);
export const selectErrors           = createSelector(selectModule, (state: StateSchemaUser) => state.errors);
// export const selectIsLoaded         = createSelector(selectModule, (state: StateSchemaUser) => state._isLoaded);

export const selectAuth             = createSelector(selectModule, (state: StateSchemaUser) => state.auth);
export const selectUser = createSelector(
  selectModule,
  (state: StateSchemaUser) => state.user || {} as User
);
export const selectUserId             = createSelector(selectUser, (user: User) => user.id);
export const selectIsEmailVerified    = createSelector(selectUser, (user: User) => user.emailVerified);
export const selectUserEmail          = createSelector(selectUser, (user: User) => user.email);
export const selectCompanyId          = createSelector(selectUser, (user: User) => user.companyId);
export const selectUserRole           = createSelector(selectUser, (user: User) => user.role);
export const selectIsEditAccess       = createSelector(selectUser, (user: User) => Boolean(user.isEditAccess));
export const selectSettings           = createSelector(selectUser, (user: User) => user.settings || {});
export const selectHintsDontShowAgain = createSelector(selectUser, (user: User) =>
  user.settings?.hintsDontShowAgain || []
);
