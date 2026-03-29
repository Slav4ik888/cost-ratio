import { ResultItem } from 'entities/result';
import { FC } from 'react';
import './result-table.scss'; 



interface ResultTableProps {
	arr: ResultItem[];
}

export const ResultTabl: FC<ResultTableProps> = ({ arr }) => {
	console.log('ResultTabl', arr);
	
	const arrTh = [
		'Организация',
		'Проект',
		'Затраты итого',
	];
	
	return (
		<div className='centerBox'>
			<div className='result'>
				<div className='resultCard'>
					<div className='capt'>Итоговая таблица для 1С</div>
					<table className='table'>
						<thead>
							<tr>
								{arrTh.map( (item, i) => <th key={item+i}>{item}</th> )}
							</tr>
						</thead>
						<tbody>
							
							{arr.map((item, i) => (
								<tr key={`${item.result}-${i}`}>
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
	)
}
