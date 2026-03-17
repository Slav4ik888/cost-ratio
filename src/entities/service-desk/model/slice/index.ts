import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPayloadError as getError } from 'shared/lib/errors';
import { LS } from 'shared/lib/local-storage';
import { Errors } from 'shared/lib/validators';
import { getServiceDeskData } from '../services';
import { ServiceDeskType } from '../../types';
import { StateSchemaServiceDesk } from './state-schema';
import { cfg } from 'app/config';



const initialState: StateSchemaServiceDesk = {
  data      : [],
  _isLoaded : false,
  loading   : false,
  errors    : {},
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
        state.data      = payload;
        state._isLoaded = true;
        state.errors    = {};
        state.loading   = false;
        LS.setServiceDeskData(payload);
        if (cfg.IS_DEV) console.log('fromLS: ');
        console.log(payload);
        
      })
      .addCase(getServiceDeskData.rejected, (state, { payload }) => {
        state._isLoaded = true; // Вернулся ответ от сервера, чтобы не загружать повторно (в бесконечном цикле)
        state.errors    = payload || {};
        state.loading   = false;
      })
  }
})

export const { actions, reducer } = slice;
