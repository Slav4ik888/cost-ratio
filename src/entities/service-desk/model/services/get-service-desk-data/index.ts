import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, errorHandlers, CustomAxiosError } from 'app/providers/store';
import { Errors } from 'shared/lib/validators';
import { LS } from 'shared/lib/local-storage';
import { cfg } from 'app/config';
import { getFromGoogleData } from './get-from-google-data';
import { ServiceDeskType } from '../../../types';



/** getArrFromGoogle */
export const getServiceDeskData = createAsyncThunk<
  ServiceDeskType[], // ResData
  undefined, // ReqData
  ThunkConfig<Errors>
>(
  'entities/serviceDesk/getServiceDeskData',
  async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      let arrayOfProject = [];

      if (cfg.IS_DEV) {
        arrayOfProject = LS.getServiceDeskData();
      }
      else {
        const url = process.env.REACT_APP_GOOGLE_SHEET_URL || '';
        arrayOfProject = await getFromGoogleData(url);
      }
    
      // dispatch(actionsUI.setPageLoading({ 'get-auth': { text: '', name: 'getAuth' } }));
      return arrayOfProject;
    }
    catch (e) {
      errorHandlers(e as CustomAxiosError, dispatch, {});
      return rejectWithValue((e as CustomAxiosError).response.data || {
        general: 'Error in entities/user/getAuth'
      });
    }
  }
);
