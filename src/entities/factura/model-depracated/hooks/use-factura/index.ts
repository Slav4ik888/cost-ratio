import { useMemo } from 'react';
// import * as s from '../../selectors';
import { actions } from '../../slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks';
import { Errors } from 'shared/lib/validators';
import { Factura } from 'entities/factura';



export const useFactura = () => {
  const dispatch = useAppDispatch();

  // const loading            = useSelector(s.selectLoading);
  // const errors             = useSelector(s.selectErrors);
  // const factura          = useSelector(s.selectFactura);


  const api = useMemo(() => ({
    setErrors   : (err: Errors) => dispatch(actions.setErrors(err)),
    clearErrors : () => dispatch(actions.clearErrors()),
    setFactura  : (data: Factura) => dispatch(actions.setFactura(data)),
  }),
    [dispatch]
  );


  return {
    // loading,
    // errors,
    // factura,
    
    ...api
  }
};
