import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateObject } from 'shared/helpers/objects';
import { getPayloadError as getError } from 'shared/lib/errors';
import { LS } from 'shared/lib/local-storage';
import { Errors } from 'shared/lib/validators';
import { creatorUser } from '../../lib/creators';
import { getAuth } from '../services';
import { PartialUser, User } from '../../types';
import { StateSchemaServiceDesk } from './state-schema';
import { SetUser } from './types';



const initialState: StateSchemaServiceDesk = {
  _isLoaded : false,
  loading   : false,
  errors    : {},
  auth      : false,
  user      : {} as User
};


export const slice = createSlice({
  name: 'entities/serviceDesk',
  initialState,
  reducers: {
    setErrors: (state, { payload }: PayloadAction<Errors>) => {
      state.errors = getError(payload);
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    
  },

  extraReducers: builder => {
    // GET-SERVICE-DESK
    builder
      .addCase(getServiceDeskData.pending, (state) => {
        state.errors  = {};
        state.loading = true;
      })
      .addCase(getServiceDeskData.fulfilled, (state, { payload }) => {
        state.auth      = true;
        state._isLoaded = true;
        state.user      = payload.user;
        state.errors    = {};
        state.loading   = false;
        LS.setUserState(payload.companyId, state);
      })
      .addCase(getServiceDeskData.rejected, (state, { payload }) => {
        state._isLoaded = true; // Вернулся ответ от сервера, чтобы не загружать повторно (в бесконечном цикле)
        state.errors    = payload || {};
        state.loading   = false;
      })
  }
})

export const { actions, reducer } = slice;
