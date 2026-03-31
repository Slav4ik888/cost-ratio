import { FC, useCallback, useEffect, useState } from 'react';
import cl from 'classnames';
import { ModalAnalisBlock } from './modal-analis-block';
import { getTitle, addSpaceToNumber } from '../../utils/untils';
import { ANALIS_TITLE, ANALIS_TITLE_CLASS, ANALIS_SORT } from '../../consts';
import _ from 'lodash';
import { MainItem, useAutomatization } from 'entities/automatization';
import { ResultItem } from 'entities/result';
import { Sorted } from 'shared/types';
import { Section } from 'shared/ui/section';
import './result-analis-table.scss'; 



interface Props {
	arr    : ResultItem[]
	arrBig : MainItem[]
}

export const ResultAnalisTabl: FC<Props> = ({}) => {
	const { arrResult, arrForBigTable } = useAutomatization();
	const [isModal, setIsModal] = useState(false);
	const [tableArr, setTableArr] = useState<ResultItem[]>([]);
	const [filtred, setFiltred] = useState<MainItem[]>([]);
	const [sorted, setSorted] = useState<Sorted<typeof ANALIS_SORT[number], ResultItem | null>>({
		sortType   : 'asc',    // 'desc'
		sortField  : 'siteID', // поле по умолчанию
		row        : null 	   // нажатая выбранная строка
	});
	
	
	// При обновлении в сторе arrResult
	useEffect(() => {
		setTableArr(arrResult);
	},
		[arrResult]
	);

	// Устанавливаем выбранную строку
	const handleRowSelect = useCallback((row: ResultItem) => {
		let result = arrForBigTable.filter(item => item.project === row.project);
		setFiltred(result);
		setSorted({ ...sorted, row });
		setIsModal(true); // Открываем модальное окно
	},
		[sorted, setSorted, setIsModal, setFiltred]
	);

	// Сортировка 'Таблицы'
	const handleSortTabl = useCallback((e: any, sortField: string) => {
		const title         = getTitle(sortField, ANALIS_TITLE, ANALIS_SORT);
		const newSortedType = sorted.sortField === title ? (sorted.sortType === 'asc' ? 'desc' : 'asc') : 'asc';
		const orderedData   = _.orderBy(arrResult, title, newSortedType);
		
		setSorted({
			...sorted,
			sortType: newSortedType,
			sortField: title
		});
		setTableArr(orderedData);
	},
		[arrResult, sorted, setSorted, setTableArr]
	);


	// Обрабатываем закрытие модального окна
	const handleModalOut = useCallback(() => {
		setFiltred([]);
		setSorted({
			...sorted,
			row: null,
		});
	},
		[sorted, setSorted, setIsModal, setFiltred]
	);


	return (
		<Section>
			{/* выводим модалку нажатой строки */}
			{
				isModal && sorted.row && <ModalAnalisBlock
					isModal  = {isModal}
					filtred  = {filtred}
					onCancel = {handleModalOut}
					onOk     = {handleModalOut}
				/>
			}
			<div className='center-box'>
				<div className='result'>
					<div className='resultCard'>
						<div className='capt'>Итоговая таблица для анализа</div>
						<table className='tableFixedHead'>
							<thead>
								<tr>
									{ANALIS_TITLE.map( (titleField, i) => <th key={titleField+i}
										onClick={(e) => handleSortTabl(e, titleField)}
										className={cl(
											{ ['active']: sorted.sortField === ANALIS_SORT[i] },
											ANALIS_TITLE_CLASS[i]
										)}
									>
									{titleField}
									{sorted.sortField === ANALIS_SORT[i] ? 
										sorted.sortType === 'asc'  ? ' ▲' : 
										sorted.sortType === 'desc' ? ' ▼' : null : null}
									</th> )}
								</tr>
								{/* <tr>
									<th className={cl({[s.active]: sortField === ANALIS_TITLE_SORT[0]}, s[ANALIS_TITLE_CLASS[0]])}>
										№ проекта
									</th>
									<th className={cl({[s.active]: sortField === ANALIS_TITLE_SORT[1]}, s[ANALIS_TITLE_CLASS[1]])} >
										Проект
									</th>
									<th className={cl({[s.active]: sortField === ANALIS_TITLE_SORT[2]}, s[ANALIS_TITLE_CLASS[2]])} >
										Затраты (Помегаб)
									</th>
									<th className={cl({[s.active]: sortField === ANALIS_TITLE_SORT[3]}, s[ANALIS_TITLE_CLASS[3]])} >
										Затраты (Полоса)	
									</th>
									<th className={cl({[s.active]: sortField === ANALIS_TITLE_SORT[4]}, s[ANALIS_TITLE_CLASS[4]])} >
										Затраты итого
									</th>
								</tr> */}
							</thead>
							<tbody>
								{tableArr.map( (item, i) => (
									<tr
										key={`${item.result}-${i}`}
										onClick={() => handleRowSelect(item)}
									>
										<td className='tdProject'>{item.project}</td>
										<td className='tdOrganization'>{item.organization}</td>
										<td className='tdSumMbCost'>{addSpaceToNumber(item.sumMbCost, 0, ',')} p.</td>
										<td className='tdSumSpCost'>{addSpaceToNumber(item.sumSpCost, 0, ',')} p.</td>
										<td className='tdResult'>{addSpaceToNumber(item.result, 0, ',')} p.</td>
									</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Section>
	);
};
