import React from 'react';
import s from './result-table.module.css'; 



export const ResultTabl = ({ arr }) => {
		// console.log('BigTable', arr);
		
		const arrTh = [
			`Организация`,
			`Проект`,
			`Затраты итого`,
		];
		
    return (
        <>

					<div className={s.centerBox}>
						<div className={s.result}>
							<div className={s.resultCard}>

								<div className={s.capt}>Итоговая таблица для 1С</div>
								<table className={s.table}>
									<thead>
										<tr>
											{arrTh.map( (item, i) => <th key={item+i}>{item}</th> )}
										</tr>
									</thead>
									<tbody>
										
											{arr.map( (item, i) => (
												<tr key={item.result+i}>
														<td>{item.organization}</td>
														<td>{item.project}</td>
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
}
