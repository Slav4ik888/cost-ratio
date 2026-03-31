import { FC, ReactNode } from 'react';
import { MainItem } from 'entities/automatization';
import { GoogleRow } from './row';




interface GoogleTableProps {
  searchText : string
  arr        : MainItem[]
  children?  : ReactNode  // Make children optional since it's not used in GoogleTable
  callback   : (item: MainItem) => void
}

export const GoogleTable: FC<GoogleTableProps> = ({ searchText, arr, callback }) => {
  const rows: JSX.Element[] = [];

  arr.forEach((item, i) => {
    
    if ((item.siteID.indexOf(searchText.toUpperCase()) === -1) &&
      (item.organization.indexOf(searchText) === -1)
    ) {
      return;
    }
    
    rows.push(
      <GoogleRow
        item     = {item}
        callback = {callback}
        key      = {item.siteID + i}
      />
    );
  });

  return (
    <table>
      {rows.length > 0 &&
        <thead>
          <tr>
            <th>SiteID</th>
            <th>Проект</th>
            <th>Клиент</th>
          </tr>
        </thead>
      }
      <tbody>{rows}</tbody>
    </table>
  );
}
