import { FC } from 'react';
import s from './footer.module.css';


interface Props {
  children?: React.ReactNode;
}

export const Footer: FC<Props> = ({ children }) => {
  return (
    <div className={s.cover}>
      <div className={s.wrap}>
        {children}
      </div>
    </div>
  )
}
