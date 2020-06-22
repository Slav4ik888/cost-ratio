import React from 'react';
import s from './create-table-from-arr.module.css'; 


const CreateTableFromArr = ({ arr, arrTitle, arrTh  }) => {
		
	return (
			<>
				<div className={s.capt}>{arrTitle}</div>
				<table className={s.table}>
					<thead>
						<tr>
							{arrTh.map( (item, i) => <th key={item+i}>{item}</th> )}
						</tr>
					</thead>
					
					<tbody>
						
							{arr.map( (item, i) => (
								<tr key={item.siteID+i}>
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