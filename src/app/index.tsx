import { FC } from 'react';
import CostRatio from '../pages/cost-ratio';
import { Footer } from '../components/Footer';
import './index.scss';
import { cfg } from './config';


export const App: FC = () => {
  return (
    <div className='root'>
      <CostRatio />
      <Footer> © 2020 Created by Slav4ik888 - version {cfg.ASSEMBLY_DATE}</Footer>
    </div>
  );
}
