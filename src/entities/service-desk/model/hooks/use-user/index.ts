import { useMemo } from 'react';
import * as s from '../../selectors';
import { actions } from '../../slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks';
import { getAuth, ReqGetAuth } from '../../services';
import { Errors } from 'shared/lib/validators';



export const useUser = () => {
  const dispatch = useAppDispatch();

  const _isLoaded          = useSelector(s.selectIsLoaded);
  const loading            = useSelector(s.selectLoading);
  const errors             = useSelector(s.selectErrors);

  const auth               = useSelector(s.selectAuth);
  const user               = useSelector(s.selectUser);
  const userId             = useSelector(s.selectUserId);
  const isVerified         = useSelector(s.selectIsEmailVerified);
  const email              = useSelector(s.selectUserEmail);
  const role               = useSelector(s.selectUserRole);
  const companyId          = useSelector(s.selectCompanyId);
  const isEditAccess       = useSelector(s.selectIsEditAccess);
  const hintsDontShowAgain = useSelector(s.selectHintsDontShowAgain);



  const api = useMemo(() => ({
    setErrors      : (err: Errors) => dispatch(actions.setErrors(err)),
    clearErrors    : () => dispatch(actions.clearErrors()),
    serviceGetAuth : (data: ReqGetAuth) => dispatch(getAuth(data)),
  }),
    [dispatch]
  );


  return {
    _isLoaded,
    loading,
    errors,

    auth,
    user,
    userId,
    isVerified,
    email,
    role,
    companyId,
    isEditAccess,
    hintsDontShowAgain,

    ...api
  }
};
