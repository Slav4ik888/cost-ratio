import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPayloadError as getError } from 'shared/lib/errors';
import { Errors } from 'shared/lib/validators';
// import { getServiceDeskData } from '../services';
// import { ServiceDeskType } from '../../types';
import { StateSchemaFactura } from './state-schema';
import { Factura } from 'entities/factura';



const initialState: StateSchemaFactura = {
  factura: {
    value  : 0,
    sprite : 0,
    mb     : 0
  },
  loading : false,
  errors  : {},
};


export const slice = createSlice({
  name: 'entities/factura',
  initialState,
  reducers: {
    setErrors: (state, { payload }: PayloadAction<Errors>) => {
      state.errors = getError(payload);
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setFactura: (state, { payload }: PayloadAction<Factura>) => {
      state.factura = payload;
    },
    
  },
})

export const { actions, reducer } = slice;
