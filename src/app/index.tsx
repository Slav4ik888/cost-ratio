import { FC } from 'react';
import CostRatio from '../pages/CostRatio';
import { Footer } from '../components/Footer';
import s from './index.module.css';
import { cfg } from './config';


export const App: FC = () => {
  return (
    <div className={s.root}>
      <CostRatio />
      <Footer> © 2020 Created by Slav4ik888 - version {cfg.ASSEMBLY_DATE}</Footer>
    </div>
  );
}
