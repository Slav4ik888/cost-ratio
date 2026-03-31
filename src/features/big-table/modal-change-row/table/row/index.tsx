import { FC } from 'react';
import { MainItem } from 'entities/automatization';
import './index.scss';



interface GoogleRowProps {
  item     : MainItem
  callback : (item: MainItem) => void
}

export const GoogleRow: FC<GoogleRowProps> = ({item, callback}) => {
  const handleCallBack = () => {
    callback(item);
  };

  return (
    <tr
      className = 'table-search'
      onClick   = {handleCallBack}
    >
      <td>{item.siteID}</td>
      <td>{item.project}</td>
      <td>{item.organization}</td>
    </tr>
  );
}
