import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/store';
import { StateSchemaServiceDesk } from '../slice/state-schema';
import { ServiceDeskType } from '../../types';


export const selectModule = createSelector([(state: StateSchema) => state.serviceDesk || {} as StateSchemaServiceDesk],
  (state: StateSchemaServiceDesk) => state);


export const selectIsLoaded = createSelector(selectModule, (state: StateSchemaServiceDesk) => state._isLoaded);
export const selectLoading  = createSelector(selectModule, (state: StateSchemaServiceDesk) => state.loading);
export const selectErrors   = createSelector(selectModule, (state: StateSchemaServiceDesk) => state.errors);

export const selectData = createSelector(
  selectModule,
  (state: StateSchemaServiceDesk) => state.data || [] as ServiceDeskType[]
);
