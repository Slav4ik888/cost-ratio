import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/store';
import { AltergaItem } from 'entities/altegra';
import { StateSchemaAutomatization } from '../slice/state-schema';
// import { ServiceDeskType } from '../../types';


export const selectModule = createSelector([(state: StateSchema) => state.automatization || {} as StateSchemaAutomatization],
  (state: StateSchemaAutomatization) => state);


export const selectLoading        = createSelector(selectModule, (state: StateSchemaAutomatization) => state.loading);
export const selectErrors         = createSelector(selectModule, (state: StateSchemaAutomatization) => state.errors);

export const selectAltegraData    = createSelector(selectModule, (state: StateSchemaAutomatization) => state.altegraData);
export const selectIsAltegra      = createSelector(selectAltegraData, (data: AltergaItem[]) => Boolean(data.length));

export const selectFacturaData    = createSelector(selectModule, (state: StateSchemaAutomatization) => state.facturaData);
export const selectMbPrice        = createSelector(selectModule, (state: StateSchemaAutomatization) => state.mbPrice);
export const selectMbSiteId       = createSelector(selectModule, (state: StateSchemaAutomatization) => state.mbSiteId);
export const selectStriteSiteId   = createSelector(selectModule, (state: StateSchemaAutomatization) => state.striteSiteId);
export const selectMbCostAll      = createSelector(selectModule, (state: StateSchemaAutomatization) => state.mbCostAll);
export const selectSpTrafficAll   = createSelector(selectModule, (state: StateSchemaAutomatization) => state.spTrafficAll);
export const selectArrForBigTable = createSelector(selectModule, (state: StateSchemaAutomatization) => state.arrForBigTable);
export const selectArrResult      = createSelector(selectModule, (state: StateSchemaAutomatization) => state.arrResult);
