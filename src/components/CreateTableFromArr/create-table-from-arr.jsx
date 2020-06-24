import React from 'react';
import s from './create-table-from-arr.module.css'; 
import cl from 'classnames';

import {TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE} from '../../consts/consts.js';


const CreateTableFromArr = ({ arr, arrTitle, onSort, sortType, sortField, onRowSelect}) => {
		
	return (
			<>
				<div className={s.capt}>{arrTitle}</div>
				<table className={s.table}>
					<thead>
						<tr>
							{TITLE_BIG_TABLE.map( (item, i) => <th key={item+i} 
								onClick={onSort.bind(null, {item})}
								className={cl({[s.active]: sortField === TITLE_BIG_TABLE_VALUE[i]})}
								>
									{item} 
									{sortField === TITLE_BIG_TABLE_VALUE[i] ? 
										sortType === 'asc'  ? ' ▲' : 
										sortType === 'desc' ? ' ▼' : null : null}
								</th> )}
						</tr>
					</thead>
					
					<tbody>
						
							{arr.map( (item, i) => (
								<tr key={item.siteID+i} 
									onClick={onRowSelect.bind(null, item)}
								>
										<td>{item.siteID}</td>
										<td>{item.project}</td>
										<td>{item.organization}</td>
										<td>{item.mbPrice}</td>
										<td>{item.mbCostServicies}</td>
										<td>{item.mbTraffic}</td>
										<td>{item.mbCostTraffic.toFixed(2)}</td>
										<td>{item.mbCostCorrect}</td>
										<td>{item.spTraffic}</td>
										<td>{item.spCostTraffic}</td>
										<td>{item.result}</td>
								</tr>
								))}
						
					</tbody>
				</table>
			</>
	)
}

export default CreateTableFromArr;