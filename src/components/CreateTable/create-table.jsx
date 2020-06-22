import React from 'react';
import s from './create-table.module.css'; 

const CreateTable = ({ arr, arrTitle, arrTh }) => {
		// console.log('BigTable', arr);
		
		
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
											<td>{item.trafficMb}</td>
									</tr>
									))}
							
						</tbody>
					</table>
        </>
    )
}

export default CreateTable;
