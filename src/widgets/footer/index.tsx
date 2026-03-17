import { FC } from 'react';
import './footer.scss';


interface Props {
  children?: React.ReactNode;
}

export const Footer: FC<Props> = ({ children }) => {
  return (
    <div className="cover">
      <div className="wrap">
        {children}
      </div>
    </div>
  )
}
