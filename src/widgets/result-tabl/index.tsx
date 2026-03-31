import { ResultItem } from 'entities/result';
import { FC } from 'react';
import { addSpaceBetweenNumbers } from 'shared/helpers/numbers';
import './result-table.scss'; 


const arrTh = [
	'Организация',
	'Проект',
	'Затраты итого',
];
	

interface ResultTableProps {
	arr: ResultItem[];
}

export const ResultTabl: FC<ResultTableProps> = ({ arr }) => {	
	return (
		<div className='center-box'>
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
									<td className='td-result'>{item.project}</td>
									<td className='td-result'>{addSpaceBetweenNumbers(item.result)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
