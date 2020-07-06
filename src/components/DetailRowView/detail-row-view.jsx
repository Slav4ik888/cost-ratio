import React from 'react';
import s from './detail-row-view.module.css'; 
import {TITLE_DETAIL_ROW_TABLE} from '../../consts/consts.js';


export const DetailRowView = ({result}) => (
  <div>
    <table className={s.table}>
      <thead>
        <tr>
          {TITLE_DETAIL_ROW_TABLE.map( (item, i) => <th key={item+i}>
            {item}
          </th> )}
        </tr>
      </thead>
      <tbody>
        
        
        {result.map( (item, i) => (
          <tr key={item.result+i}>
            <td>{item.organization}</td>
            <td>{item.siteID}</td>
            <td>{item.mbCostTraffic} р.</td>
            <td>{item.spCostTraffic ? item.spCostTraffic + ` р.` : `-`}</td>
            <td>{item.result}</td>
          </tr>
        ))}
        
      </tbody>
    </table>
  </div>
);
