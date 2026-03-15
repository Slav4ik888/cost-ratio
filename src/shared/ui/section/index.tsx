import { ReactNode, FC } from 'react';
import './index.scss'; 



interface Props {
  children?: ReactNode;
}

export const Section: FC<Props> = ({ children }) => {
  return (
    <div className='section-root'>
      {children}
    </div>
  )
}
