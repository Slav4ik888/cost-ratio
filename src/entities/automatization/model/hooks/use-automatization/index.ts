import { useMemo } from 'react';
import * as s from '../../selectors';
import { actions } from '../../slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks';
// import { getServiceDeskData } from '../../services';
import { Errors } from 'shared/lib/validators';
import { AltergaItem } from 'entities/altegra';
import { Factura } from 'entities/factura';



export const useAutomatization = () => {
  const dispatch = useAppDispatch();

  const loading     = useSelector(s.selectLoading);
  const errors      = useSelector(s.selectErrors);
  const isAltegra   = useSelector(s.selectIsAltegra);
  const altegraData = useSelector(s.selectAltegraData);
  const factura     = useSelector(s.selectFacturaData);

  const api = useMemo(() => ({
    setErrors      : (err: Errors) => dispatch(actions.setErrors(err)),
    clearErrors    : () => dispatch(actions.clearErrors()),
    setAltegraData : (data: AltergaItem[]) => dispatch(actions.setAltegraData(data)),
    setFacturaData : (data: Factura) => dispatch(actions.setFacturaData(data)),
    
    // serviceGetServiceDeskData  : () => dispatch(getServiceDeskData()),
  }),
    [dispatch]
  );


  return {
    loading,
    errors,
    isAltegra,
    altegraData,
    factura,

    ...api
  }
};
