import { useMemo } from 'react';
import * as s from '../../selectors';
import { actions } from '../../slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks';
import { getServiceDeskData } from '../../services';
import { Errors } from 'shared/lib/validators';



export const useServiceDesk = () => {
  const dispatch = useAppDispatch();

  const _isLoaded          = useSelector(s.selectIsLoaded);
  const loading            = useSelector(s.selectLoading);
  const errors             = useSelector(s.selectErrors);
  const serviceDeskData    = useSelector(s.selectData);


  const api = useMemo(() => ({
    setErrors                  : (err: Errors) => dispatch(actions.setErrors(err)),
    clearErrors                : () => dispatch(actions.clearErrors()),
    serviceGetServiceDeskData  : () => dispatch(getServiceDeskData()),
  }),
    [dispatch]
  );


  return {
    _isLoaded,
    loading,
    errors,
    serviceDeskData,
    
    ...api
  }
};
