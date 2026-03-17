import { FC } from 'react';
import CostRatio from '../pages/cost-ratio';
import { Footer } from 'widgets/footer';
import './index.scss';
import { cfg } from './config';
import { useServiceDesk } from 'entities/service-desk';
import { useInitialEffect } from 'shared/lib/hooks';
import { PageLoader } from 'widgets/page-loader';


export const App: FC = () => {
  const { loading, serviceGetServiceDeskData } = useServiceDesk();
  
  useInitialEffect(() => {
    serviceGetServiceDeskData();
  });
  
  
  return (
    <div className='main-root'>
      <CostRatio />
      <Footer> © 2020 Created by Slav4ik888 - version {cfg.ASSEMBLY_DATE}</Footer>
      <PageLoader loading={loading} />
    </div>
  );
}
