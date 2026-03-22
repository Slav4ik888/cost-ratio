import React, {FC, useCallback, useEffect, useState} from 'react';
import './big-table.scss'; 
import cl from 'classnames';
import {getTitle} from '../../utils/untils';
import {BIG_TITLE, BIG_TITLE_CLASS, BIG_SORT} from '../../consts';
import ModalChangeRow from '../ModalChangeRow';
import _ from 'lodash';
import { MainItem, useAutomatization } from 'entities/automatization';
import { useServiceDesk } from 'entities/service-desk';
import { emptyIfUndefined } from 'shared/helpers/strings';



interface Sorted {
	isModal    : boolean
	searchText : ''  		  			 					// Поиск по SiteID
	sortType   : 'asc' | 'desc'
	sortField  : typeof BIG_TITLE[number] // поле по умолчанию
	row        : MainItem | null 					// нажатая выбранная строка
}

export const BigTable: FC = () => {
	const {
    factura, mbPrice, arrForBigTable,
    setMbCostAll, setSpTrafficAll, setMbSiteId, setStriteSiteId, setAltegraData, setArrForBigTable, setArrResult
	} = useAutomatization();
	const { serviceDeskData } = useServiceDesk();
	
	const [tableArr, setTableArr] = useState(arrForBigTable);
	const [tableArrFiltred, setTableArrFiltred] = useState(arrForBigTable);
	const [sorted, setSorted] = useState<Sorted>({
		isModal    : false,
		searchText : '',  		 // Поиск по SiteID
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
	
	
	// componentDidUpdate(prevProps) {
	// 	if (this.props.arr !== prevProps.arr) {
	// 		const {arr} = this.props;
	// 		this.setState({
	// 			tableArr: arr, // переданный массив
	// 			tableArrFiltred: arr, // массив для вывода отфильтрованных значений
	// 		});
	// 	}
	// }


	// Обновляем все данные по нажатию кнопки
	const handleUpdate = () => {
		onHandleUpdateBigArr(tableArr);
	}

	// Обновляем с гугл таблицы по нажатию кнопки
	const handleGoogleUpdate = () => {
		onHandleUpdateFromGoogle(tableArr);
	}

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
	const handleSearchClear = () => {
		// this.setState({
		// 	searchText: '',
		// 	tableArrFiltred: tableArr, // Возвращаем целый  массив
		// });
	};

	// Изменение индивидуальных значений сч/ф
	// Меняем в tableArr но ищем пришедший ID из tableArrFiltred
	const handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		let arr = tableArr.concat();

		const target = event.target;
		const filtredIndex = parseInt(event.target.id, 10);
		if (isNaN(filtredIndex)) {
			return;
		}
		const filtredSiteId = tableArrFiltred[filtredIndex].siteID;
		const id = arr.findIndex(item => item.siteID === filtredSiteId);
		if (id === -1) {return}

		let value;

		switch (target.name) {
			case 'siteID':
				value = target.value;
				arr[id].siteID = value;
				break;

			case 'project':
				value = target.value;
				arr[id].project = value;
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
	}


	// Устанавливаем выбранную строку
	const handleRowSelect = (row: MainItem) => {
		console.log(row);
		setSorted({
			...sorted,
			isModal: true,
			row
		});
	};


	// Сортировка "Таблицы"
	const handleSortTabl = (sortField: string) => {
		console.log('sortField: ', sortField);
		const title = getTitle(sortField, BIG_TITLE, BIG_SORT);
		const orderedData = _.orderBy(tableArrFiltred, title, sorted.sortType);
		
		setSorted({ ...sorted, sortField: title });
		setTableArrFiltred(orderedData);
	};

	// Добавляем новую строку
	const handleAddRow = useCallback(() => {
		const newArr: MainItem[] = [{
			siteID: '',
			project: '',
			organization: '',
			mbPrice,
			mbTraffic: 0,
			mbCostServicies: undefined,
			mbCostTraffic: 0,
			mbCostCorrect: '0',
			spTraffic: '0',
			spCostTraffic: '0',
			result: 0,
			image: '',
			title: '',
			description: '',
			price: '',
			sumMbCost: '',
			sumSpCost: ''
		}, ...tableArr];

		setTableArr(newArr);
		setTableArrFiltred(newArr);
	},
		[mbPrice, tableArr]
	);

	
	// Открываем модальное окно
	const handleModalInfo = () => {
		this.setState({
			isModal: true,
		});
	};

	

	// Обрабатываем закрытие модального окна
	const handleModalOut = useCallback((obj) => {
		if (obj) {
			let newObj = {};
			newObj.siteID = obj.siteID || '';
			newObj.project = obj.project || '';
			newObj.organization = obj.organization || '';
			newObj.mbPrice = mbPrice;
			newObj.mbTraffic = +obj.mbTraffic || 0;
			newObj.mbCostServicies = +obj.mbCostServicies || 0;
			newObj.mbCostTraffic = +obj.mbCostTraffic || 0;
			newObj.mbCostCorrect = +obj.mbCostCorrect || 0;
			newObj.spTraffic = +obj.spTraffic || 0;
			newObj.spCostTraffic = +obj.spCostTraffic || 0;
			newObj.result = +obj.result || 0;

			const {tableArr} = this.state;
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

			this.setState({
				tableArr: newArr,
			});
		};
		this.setState({
			isModal: false,
		});
		setTimeout(() => this.handleSearchClear(),0); // Очищаем строку поиска
	},
		[mbPrice]
	);


	const { sortType, sortField, row, searchText, isModal } = sorted;

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
						onClick={handleGoogleUpdate}
					/>
				</div>

				{/* Редактирование строки */}
				{isModal && <ModalChangeRow callback={handleModalOut} element={row} arrayOfProject={serviceDeskData}/>}

					

				<table className='tableFixedHead'>
					<thead>
						<tr>
							{BIG_TITLE.map((titleField, i) => <th
									key={titleField + i} 
									onClick={(е) => handleSortTabl(е, titleField)}
									// className={cl({[s.active]: sortField === BIG_SORT[i]}, s[BIG_TITLE_CLASS[i]])}
								>
									{titleField} 
									{sortField === BIG_SORT[i] ? 
										sortType === 'asc'  ? ' ▲' : 
										sortType === 'desc' ? ' ▼' : null : null}
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
