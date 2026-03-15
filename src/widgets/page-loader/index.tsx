import { isUndefined } from 'lodash';
import { FC } from 'react';
import { isNotUndefined } from 'shared/lib/validators';
import Loader from 'shared/ui/loader';
import './index.scss';



interface Props {
  loading?: boolean
}

export const PageLoader: FC<Props> = ({ loading }) => {
  if (isUndefined(loading) || isNotUndefined(loading) && loading) {
    return <>
      <div className='loading'>Загрузка...</div>
      <Loader />
    </>
  }
  else return <></>;
}
