import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPayloadError as getError } from 'shared/lib/errors';
import { Errors } from 'shared/lib/validators';
import { StateSchemaAutomatization } from './state-schema';
import { AltergaItem } from 'entities/altegra';
import { Factura } from 'entities/factura';



const initialState: StateSchemaAutomatization = {
  loading      : false,
  errors       : {},
  altegraData  : [],
  facturaData  : { value: undefined, sprite: undefined, mb: undefined },
  mbPrice      : 0.132, // Базовая стоимость Мб
  mbSiteId     : [],    // массив помегабатного трафика
  striteSiteId : [],    // массив полосного трафика
  mbCostAll    : 0,     // Общие затраты по трафику рассчитанные + доп услуги
  spTrafficAll : 0,     // Общий трафик в полосе
};


export const slice = createSlice({
  name: 'entities/automatization',
  initialState,
  reducers: {
    setErrors: (state, { payload }: PayloadAction<Errors>) => {
      state.errors = getError(payload);
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setAltegraData: (state, { payload }: PayloadAction<AltergaItem[]>) => {
      state.altegraData = payload || [];
    },
    setFacturaData: (state, { payload }: PayloadAction<Factura>) => {
      state.facturaData = payload;
    },
    setMbSiteId: (state, { payload }: PayloadAction<any[]>) => {
      state.mbSiteId = payload;
    },
    setStriteSiteId: (state, { payload }: PayloadAction<any[]>) => {
      state.mbSiteId = payload;
    },
    setMbCostAll: (state, { payload }: PayloadAction<number>) => {
      state.mbCostAll = payload;
    },
    setSpTrafficAll: (state, { payload }: PayloadAction<number>) => {
      state.spTrafficAll = payload;
    },
  },

  extraReducers: builder => {
    // GET-SERVICE-DESK
    // builder
    //   .addCase(getServiceDeskData.pending, (state) => {
    //     state.errors  = {};
    //     state.loading = true;
    //   })
    //   .addCase(getServiceDeskData.fulfilled, (state, { payload }) => {
    //     state.data      = payload;
    //     state._isLoaded = true;
    //     state.errors    = {};
    //     state.loading   = false;
    //     LS.setServiceDeskData(payload);
    //     if (cfg.IS_DEV) console.log('fromLS: ');
    //     console.log(payload);
        
    //   })
    //   .addCase(getServiceDeskData.rejected, (state, { payload }) => {
    //     state._isLoaded = true; // Вернулся ответ от сервера, чтобы не загружать повторно (в бесконечном цикле)
    //     state.errors    = payload || {};
    //     state.loading   = false;
    //   })
  }
})

export const { actions, reducer } = slice;
