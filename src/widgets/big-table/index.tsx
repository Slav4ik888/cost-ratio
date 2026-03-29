import React, {FC, useCallback, useEffect, useState} from 'react';
import './big-table.scss'; 
import cl from 'classnames';
import {getTitle} from '../../utils/untils';
import {BIG_TITLE, BIG_TITLE_CLASS, BIG_SORT} from '../../consts';
import ModalChangeRow from '../../components/ModalChangeRow';
import _ from 'lodash';
import { MainItem, useAutomatization } from 'entities/automatization';
import { useServiceDesk } from 'entities/service-desk';
import { emptyIfUndefined } from 'shared/helpers/strings';
import { calcMbCostAll, makeDataForBigTable, makeDataFromGoogle } from 'utils/make-data-for-bigtable';
import { changePointToComma, makeResultForFinishTable } from 'utils/make-result-for-finish-table';
import { getValueOrZero } from 'shared/helpers/numbers';



interface Sorted {
	sortType   : 'asc' | 'desc'
	sortField  : typeof BIG_TITLE[number] // поле по умолчанию
	row        : MainItem | null 					// нажатая выбранная строка
}

export const BigTable: FC = () => {
	const {
    factura, mbPrice, arrForBigTable, spTrafficAll,
    setMbCostAll, setSpTrafficAll, setMbSiteId, setStriteSiteId, setAltegraData, setArrForBigTable, setArrResult
	} = useAutomatization();
	const { serviceDeskData, serviceGetServiceDeskData } = useServiceDesk();
	
	const [tableArr, setTableArr] = useState(arrForBigTable);
	const [tableArrFiltred, setTableArrFiltred] = useState(arrForBigTable);
	const [isModal, setIsModal] = useState(false);
	const [searchText, setSearchText] = useState(''); // Поиск по SiteID
	const [sorted, setSorted] = useState<Sorted>({
		sortType   : 'asc',    // 'desc'
		sortField  : 'siteID', // поле по умолчанию
		row        : null 	   // нажатая выбранная строка
	});
	
	useEffect(() => {
		setTableArr(arrForBigTable);
		setTableArrFiltred(arrForBigTable);
	},
		[arrForBigTable]
	);
	
	
	useEffect(() => {
		console.log('BigTable useEffect!!!');

    // Обновляем "Сводную таблицу" обновлёнными значениями из данных сч/ф mbCostServicies - пересчитываем
		let mbCostAll = calcMbCostAll(serviceDeskData);

    // Рассчитываем Затраты скорректированные
    const { newArrForBigTable } = makeDataForBigTable(serviceDeskData as MainItem[], factura, mbCostAll, spTrafficAll);

		const newArrForBigTable_2 = makeDataFromGoogle(tableArr, newArrForBigTable);
		
    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { arrResult } = makeResultForFinishTable(newArrForBigTable_2);

    // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
    const lastBigStore = changePointToComma(newArrForBigTable_2, 'result');

		setArrForBigTable(lastBigStore);
    setMbCostAll(mbCostAll);
    setArrResult(arrResult);
	},
		[factura, spTrafficAll, serviceDeskData, setArrForBigTable, setArrResult, setMbCostAll]
	);
	
	
	/**
	 * Обновляем все данные по нажатию кнопки
	 * Меняем значения на обновлённые и пересчитываем итоговые значения
	 */
  const handleUpdate = useCallback(() => {
    // Обновляем "Сводную таблицу"  обновлёнными значениями из данных сч/ф mbCostServicies - пересчитываем
    let mbCostAll = calcMbCostAll(tableArr);
    // Рассчитываем Затраты скорректированные
    let {newArrForBigTable} = makeDataForBigTable(tableArr, factura, mbCostAll, spTrafficAll);

    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { arrResult } = makeResultForFinishTable(newArrForBigTable);

    // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
    const lastBigStore = changePointToComma(newArrForBigTable, 'result');

		setArrForBigTable(lastBigStore);
		setArrResult(arrResult);
		setMbCostAll(mbCostAll);
	},
		[tableArr, spTrafficAll, setArrForBigTable, setArrResult, setMbCostAll]
	);


	// Обновляем с гугл таблицы по нажатию кнопки
	// Обновляем все данные при повторном запроосе к Google
	const handleUpdateFromGoogle = useCallback(async () => {
		serviceGetServiceDeskData();
	},
		[serviceDeskData, serviceGetServiceDeskData]
	);

	// Поиск в таблице по SiteID
	const handleSearchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const arr = [] as any[];

		// tableArr.forEach((item, i) => {
		// 	if ((item.siteID.indexOf(value.toUpperCase()) === -1) &&
		// 		// (item.project.indexOf(value) === -1) &&
		// 		(item.organization.indexOf(value) === -1)) {
		// 			return
		// 	}
		// 	arr.push(item);
		// });
		
		tableArr.forEach((item, i) => {
			const searchValue = value.toLowerCase();
			
			const siteIDMatch = item.siteID && item.siteID.toLowerCase().includes(searchValue);
			const organizationMatch = item.organization && item.organization.toLowerCase().includes(searchValue);
			// const projectMatch = item.project && item.project.toLowerCase().includes(searchValue); // если нужно включить project
			
			if (siteIDMatch || organizationMatch) {
				arr.push(item);
			}
		});
	
		// this.setState({
		// 	searchText: value,
		// 	tableArrFiltred: arr, 
		// });
	};

	// При выходе из Search поле очищается
	const handleSearchClear = useCallback(() => {
		setSearchText('');
		setTableArrFiltred(tableArr); // Возвращаем целый  массив
	},
		[tableArr, setSearchText, setTableArrFiltred]
	);

	// Изменение индивидуальных значений сч/ф
	// Меняем в tableArr но ищем пришедший ID из tableArrFiltred
	const handleChangeItem = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		let arr = tableArr.concat();

		const target = event.target;
		const filtredIndex = parseInt(event.target.id, 10);
		if (isNaN(filtredIndex)) {
			return;
		}
		const filtredSiteId = tableArrFiltred[filtredIndex].siteID;
		const id = arr.findIndex(item => item.siteID === filtredSiteId);
		if (id === -1) {
			return
		}

		let value;

		switch (target.name) {
			case 'siteID':
				value = target.value;
				arr[id].siteID = value;
				break;

			case 'project':
				value = target.value;
				arr[id].project = Number(value);
				break;

			case 'organization':
				value = target.value;
				arr[id].organization = value;
				break;

			case 'mbCostServicies':
				value = +target.value;
				arr[id].mbCostServicies = value;
				break;
	
			default: break;
		};
	},
		[tableArr, tableArrFiltred]
	);


	// Устанавливаем выбранную строку
	const handleRowSelect = useCallback((row: MainItem) => {
		console.log(row);
		setSorted({ ...sorted, row });
		setIsModal(true);
	},
		[sorted, setSorted, setIsModal]
	);


	// Сортировка "Таблицы"
	const handleSortTabl = useCallback((e: any, sortField: string) => {
		console.log('sortField: ', sortField);
		const title = getTitle(sortField, BIG_TITLE, BIG_SORT);
		const orderedData = _.orderBy(tableArrFiltred, title, sorted.sortType);
		
		setSorted({ ...sorted, sortField: title });
		setTableArrFiltred(orderedData);
	},
		[tableArrFiltred, sorted, setSorted, setTableArrFiltred]
	);

	// Добавляем новую строку
	const handleAddRow = useCallback(() => {
		const newArr: MainItem[] = [{
			siteID: '',
			project: 0,
			organization: '',
			mbPrice,
			mbTraffic: 0,
			mbCostServicies: undefined,
			mbCostTraffic: 0,
			mbCostCorrect: 0,
			spTraffic: 0,
			spCostTraffic: 0,
			result: 0,
			image: '',
			title: '',
			description: '',
			price: '',
			sumMbCost: undefined,
			sumSpCost: undefined
		}, ...tableArr];

		setTableArr(newArr);
		setTableArrFiltred(newArr);
	},
		[mbPrice, tableArr, setTableArr, setTableArrFiltred]
	);
	
	// Открываем модальное окно
	const handleModalInfo = useCallback(() => setIsModal(true), [setIsModal]);


	// Обрабатываем закрытие модального окна
	const handleModalOut = useCallback((obj: MainItem) => {
		if (obj) {
			let newObj = {} as MainItem;
			newObj.siteID          = obj.siteID   		  || '';
			newObj.project         = obj.project  		  || 0;
			newObj.organization    = obj.organization   || '';
			newObj.mbPrice         = mbPrice;
			newObj.mbTraffic       = +obj.mbTraffic     || 0;
			newObj.mbCostServicies = getValueOrZero(obj.mbCostServicies);
			newObj.mbCostTraffic   = getValueOrZero(obj.mbCostTraffic);
			newObj.mbCostCorrect   = getValueOrZero(obj.mbCostCorrect);
			newObj.spTraffic       = getValueOrZero(obj.spTraffic);
			newObj.spCostTraffic   = getValueOrZero(obj.spCostTraffic);
			newObj.result          = getValueOrZero(obj.result);

			let newArr = [];
			// Проверяем внесли ли изменения в существующий SiteID
			let result = tableArr.findIndex(item => item.siteID.toUpperCase() === obj.siteID.toUpperCase());
			// console.log('result: ', result);
			if (result !== -1) {
				// console.log(`Old Row`);
				newArr = [...tableArr.slice(0, result), newObj, ...tableArr.slice(result + 1)];
			}
			else {
				// console.log(`New Row`);
				newArr = [newObj, ...tableArr.slice(1)];
			}

			setTableArr(newArr);
		};
		
		setIsModal(false);
		setTimeout(() => handleSearchClear(), 0); // Очищаем строку поиска
	},
		[tableArr, mbPrice, setIsModal, setTableArr]
	);


	return (
		<div className='section'>
			<div className='centerBox'>
				{/* <form> */}
				<div className='capt'>Сводная таблица</div>

				<div className='buttonsSprite'>
					<input
						className='butAdd'
						type='button'
						value='+ строку' 
						onClick={handleAddRow}
					/>
					<input
						className='butUpdate'
						type='button'
						value='Пересчитать' 
						onClick={handleUpdate}
					/>
					<input
						className='butSearch'
						type='text' 
						name='search'
						placeholder='Поиск по SiteID'
						value={searchText}
						autoComplete='off'
						onChange={handleSearchItem}
						// onBlur={handleSearchBlur}
					/>
					<input
						className='butUpdate'
						type='button'
						value='Синхронизировать данные с ServiceDesk'
						onClick={handleUpdateFromGoogle}
					/>
				</div>

				{/* Редактирование строки */}
				{isModal && <ModalChangeRow
					element   		  = {sorted.row}
					serviceDeskData = {serviceDeskData}
					callback  		  = {handleModalOut}
				/>}

				<table className='tableFixedHead'>
					<thead>
						<tr>
							{BIG_TITLE.map((titleField, i) => <th
									key={titleField + i} 
									onClick={(е) => handleSortTabl(е, titleField)}
									// className={cl({[s.active]: sortField === BIG_SORT[i]}, s[BIG_TITLE_CLASS[i]])}
								>
									{titleField} 
									{sorted.sortField === BIG_SORT[i] ? 
										sorted.sortType === 'asc'  ? ' ▲' : 
										sorted.sortType === 'desc' ? ' ▼' : null : null}
								</th> )}
						</tr>
					</thead>
						
					<tbody>
						{tableArrFiltred.map( (item, i) => (
							<tr key={item.siteID + i}>
								<td
									className='widthSiteId'
									onClick={() => handleRowSelect(item)}
								>
									{item.siteID}
								</td>
								<td
									className='widthProject'
									onClick={() => handleRowSelect(item)}
								>
									{item.project}
								</td>
								<td
									className='tdOrganization widthOrganization'
									onClick={() => handleRowSelect(item)}
								>
									{item.organization}
								</td>
								<td className='widthMbPrice'>{item.mbPrice}</td>
								<td className='widthFactura'>
									<input 
										id 				= {String(i)}
										className = 'inpMbCostServicies'
										type      = 'number'
										name      = 'mbCostServicies'
										value     = {emptyIfUndefined(item.mbCostServicies)}
										onChange  = {handleChangeItem}
										onBlur    = {handleSearchClear}
									/>
								</td>
								<td className='widthMbTraffic'>{item.mbTraffic}</td>
								<td className='widthMbTrafficCost'>{item.mbCostTraffic ? item.mbCostTraffic : 0}</td>
								<td className='widthCostCorrect'>{item.mbCostCorrect}</td>
								<td className='widthSpTraffic'>{item.spTraffic}</td>
								<td className='widthSpTrafficCost'>{item.spCostTraffic}</td>
								<td className='widthCostResult'>{item.result || 0}</td>
							</tr>
							))}
					</tbody>
				</table>
				{/* </form> */}
			</div>
		</div>
	)
}
