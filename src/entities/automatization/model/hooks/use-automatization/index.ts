import { useMemo } from 'react';
import * as s from '../../selectors';
import { actions } from '../../slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks';
import { Errors } from 'shared/lib/validators';
import { AltergaItem } from 'entities/altegra';
import { Factura } from 'entities/factura';



export const useAutomatization = () => {
  const dispatch = useAppDispatch();

  const loading        = useSelector(s.selectLoading);
  const errors         = useSelector(s.selectErrors);
  const isAltegra      = useSelector(s.selectIsAltegra);
  const altegraData    = useSelector(s.selectAltegraData);
  const factura        = useSelector(s.selectFacturaData);
  const mbPrice        = useSelector(s.selectMbPrice);
  const mbSiteId       = useSelector(s.selectMbSiteId);
  const striteSiteId   = useSelector(s.selectStriteSiteId);
  const mbCostAll      = useSelector(s.selectMbCostAll);
  const spTrafficAll   = useSelector(s.selectSpTrafficAll);
  const arrForBigTable = useSelector(s.selectArrForBigTable);
  const arrResult      = useSelector(s.selectArrResult);


  const api = useMemo(() => ({
    setErrors         : (err: Errors) => dispatch(actions.setErrors(err)),
    clearErrors       : () => dispatch(actions.clearErrors()),
    setAltegraData    : (data: AltergaItem[]) => dispatch(actions.setAltegraData(data)),
    setFacturaData    : (data: Factura) => dispatch(actions.setFacturaData(data)),
    setMbSiteId       : (data: any[]) => dispatch(actions.setMbSiteId(data)),
    setStriteSiteId   : (data: any[]) => dispatch(actions.setStriteSiteId(data)),
    setMbCostAll      : (data: number) => dispatch(actions.setMbCostAll(data)),
    setSpTrafficAll   : (data: number) => dispatch(actions.setSpTrafficAll(data)),
    setArrForBigTable : (data: any[]) => dispatch(actions.setArrForBigTable(data)),
    setArrResult      : (data: any[]) => dispatch(actions.setArrResult(data)),
  }),
    [dispatch]
  );


  return {
    loading,
    errors,
    isAltegra,
    altegraData,
    factura,
    mbPrice,
    mbSiteId,
    striteSiteId,
    mbCostAll,
    spTrafficAll,
    arrForBigTable,
    arrResult,

    ...api
  }
};
