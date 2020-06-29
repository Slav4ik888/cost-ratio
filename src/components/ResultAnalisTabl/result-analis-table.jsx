import React from 'react';
import s from './result-analis-table.module.css'; 
import {TITLE_RES_ANALIS_TABLE} from '../../consts/consts.js';



export const ResultAnalisTabl = ({ arr }) => {
		// console.log('BigTable', arr);
		
    return (
        <>

					<div className={s.centerBox}>
						<div className={s.result}>
							<div className={s.resultCard}>

								<div className={s.capt}>Итоговая таблица для анализа</div>
								<table className={s.table}>
									<thead>
										<tr>
											{TITLE_RES_ANALIS_TABLE.map( (item, i) => <th key={item+i}>{item}</th> )}
										</tr>
									</thead>
									<tbody>
										
											{arr.map( (item, i) => (
												<tr key={item.result+i}>
														<td>{item.project}</td>
														<td>{item.sumMbCost}</td>
														<td>{item.sumSpCost}</td>
														<td>{item.result}</td>
												</tr>
												))}
										
									</tbody>
								</table>
							</div>
						</div>
					</div>
					
        </>
    )
};
