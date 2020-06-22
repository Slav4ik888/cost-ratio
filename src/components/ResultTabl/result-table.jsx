import React from 'react';
import s from './result-table.module.css'; 



const ResultTabl = ({ arr }) => {
		// console.log('BigTable', arr);
		
		const arrTh = [
			`Проект`,
			`Затраты итого`,
		];
		
    return (
        <>

					<div className={s.centerBox}>
						<div className={s.result}>
							<div className={s.resultCard}>

								<div className={s.capt}>Итоговая таблица</div>
								<table className={s.table}>
									<thead>
										<tr>
											{arrTh.map( (item, i) => <th key={item+i}>{item}</th> )}
										</tr>
									</thead>
									<tbody>
										
											{arr.map( (item, i) => (
												<tr key={item.project+i}>
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

export default ResultTabl;
