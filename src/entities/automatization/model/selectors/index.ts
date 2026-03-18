import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/store';
import { StateSchemaAutomatization } from '../slice/state-schema';
// import { ServiceDeskType } from '../../types';


export const selectModule = createSelector([(state: StateSchema) => state.automatization || {} as StateSchemaAutomatization],
  (state: StateSchemaAutomatization) => state);


export const selectLoading  = createSelector(selectModule, (state: StateSchemaAutomatization) => state.loading);
export const selectErrors   = createSelector(selectModule, (state: StateSchemaAutomatization) => state.errors);

export const selectIsAltegra = createSelector(
  selectModule,
  (state: StateSchemaAutomatization) => Boolean(state.altegraData.length)
);
