import React, {FC, PureComponent, useCallback, useState} from 'react';
import './big-table.scss'; 
import cl from 'classnames';
import {getTitle} from '../../utils/untils';
import {BIG_TITLE, BIG_TITLE_CLASS, BIG_SORT} from '../../consts';
import ModalChangeRow from '../ModalChangeRow';
import _ from 'lodash';
import { useAutomatization } from 'entities/automatization';
import { useServiceDesk } from 'entities/service-desk';


export const BigTable: FC = () => {
	const {
    factura, mbPrice, arrForBigTable,
    setMbCostAll, setSpTrafficAll, setMbSiteId, setStriteSiteId, setAltegraData, setArrForBigTable, setArrResult
	} = useAutomatization();
	const { serviceDeskData } = useServiceDesk();
	
	const [isModal, setIsModal] = useState(false);
	
	const state = {
		tableArr: [], 

		// Поиск по SiteID
		searchText: ``,
		tableArrFiltred: [],

		sortType: 'asc',  // 'desc'
		sortField: 'siteID', // поле по умолчанию
		row: null, // нажатая выбранная строка
	}

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
		onHandleUpdateBigArr(state.tableArr);
	}

	// Обновляем с гугл таблицы по нажатию кнопки
	const handleGoogleUpdate = () => {
		onHandleUpdateFromGoogle(state.tableArr);
	}

	// Поиск в таблице по SiteID
	const handleSearchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const arr = [] as any[];

		// this.state.tableArr.forEach((item, i) => {
		// 	if ((item.siteID.indexOf(value.toUpperCase()) === -1) &&
		// 		// (item.project.indexOf(value) === -1) &&
		// 		(item.organization.indexOf(value) === -1)) {
		// 			return
		// 	}
		// 	arr.push(item);
		// });
		
		state.tableArr.forEach((item, i) => {
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
		// 	tableArrFiltred: this.state.tableArr, // Возвращаем целый  массив
		// });
	};

	// Изменение индивидуальных значений сч/ф
	// Меняем в tableArr но ищем пришедший ID из tableArrFiltred
	const handleChangeItem = (event) => {
		const {tableArr} = state;
		let arr = tableArr.concat();

		const target = event.target;
		const filtredSiteId = state.tableArrFiltred[event.target.id].siteID;
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

		// this.setState({
		// 	tableArr: arr,
		// });
	}


	// Устанавливаем выбранную строку
	const handleRowSelect = (row) => {
		console.log(row);
		// this.setState({
		// 	row,
		// 	isModal: true,
		// });
	};


	// Сортировка "Таблицы"
	const handleSortTabl = sortField => {
		const {tableArrFiltred, sortType} = state;
		sortField = getTitle(sortField.item, BIG_TITLE, BIG_SORT);
		const cloneData = tableArrFiltred.concat();
		// Проверяем что у нас сейчас в сортировке
		const sortT = sortType === 'asc' ? 'desc' : 'asc';
		// Сортируем
		const orderedData = _.orderBy(cloneData, sortField, sortT);
		// this.setState({
		// 	tableArrFiltred: orderedData,
		// 	sortType: sortT,
		// 	sortField: sortField,
		// });
	};

	// Добавляем новую строку
	const handleAddRow = useCallback(() => {
		const { tableArr } = state;
		let newArr = [{
			siteID: '',
			project: '',
			organization: '',
			mbPrice,
			mbTraffic: 0,
			mbCostServicies: '',
			mbCostTraffic: 0,
			mbCostCorrect: 0,
			spTraffic: 0,
			spCostTraffic: 0,
			result: 0,
		}, ...tableArr];

		// this.setState({
		// 	tableArr: newArr,
		// 	tableArrFiltred: newArr,
		// });
	},
		[mbPrice, state.tableArr]
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


	const { tableArrFiltred, sortType, sortField, row, searchText	} = state;

	return (
		<div className='section'>
			<div className='centerBox'>
				{/* <form> */}
				<div className='capt'>Сводная таблица</div>

				<div className='buttonsSprite'>
					<input className='butAdd' type='button' value='+ строку' 
						onClick={handleAddRow}
					/>
					<input className='butUpdate' type='button' value='Пересчитать' 
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
					<input className='butUpdate' type='button' value='Синхронизировать данные с ServiceDesk'
						onClick={handleGoogleUpdate}
					/>
				</div>

				{/* Редактирование строки */}
				{isModal && <ModalChangeRow callback={handleModalOut} element={row} arrayOfProject={serviceDeskData}/>}

					

				<table className='tableFixedHead'>
					<thead>
						<tr>
							{BIG_TITLE.map( (item, i) => <th key={item+i} 
								onClick={handleSortTabl.bind(null, {item})}
								// className={cl({[s.active]: sortField === BIG_SORT[i]}, s[BIG_TITLE_CLASS[i]])}
								>
									{item} 
									{sortField === BIG_SORT[i] ? 
										sortType === 'asc'  ? ' ▲' : 
										sortType === 'desc' ? ' ▼' : null : null}
								</th> )}
						</tr>
					</thead>
						
					<tbody>
							{tableArrFiltred.map( (item, i) => (
								<tr key={item.siteID + i}	>
										<td className='widthSiteId'
											onClick={handleRowSelect.bind(null, item)}>
											{item.siteID}
										</td>
										<td className='widthProject'
											onClick={handleRowSelect.bind(null, item)}>
												{item.project}
										</td>
										<td className='tdOrganization widthOrganization'
											onClick={handleRowSelect.bind(null, item)}
										>
											{item.organization}
										</td>
										<td className='widthMbPrice'>{item.mbPrice}</td>
										<td className='widthFactura'>
											<input 
												className='inpMbCostServicies'
												type='number'
												name='mbCostServicies'
												value={item.mbCostServicies}
												onChange={handleChangeItem}
												onBlur={handleSearchClear}
												id={i}
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
