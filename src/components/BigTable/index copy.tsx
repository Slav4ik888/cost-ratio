// import React, {FC, PureComponent} from 'react';
// import './big-table.scss'; 
// import cl from 'classnames';
// import {getTitle} from '../../utils/untils';
// import {BIG_TITLE, BIG_TITLE_CLASS, BIG_SORT} from '../../consts';
// import ModalChangeRow from '../ModalChangeRow';
// import _ from 'lodash';


// export const BigTable: FC = () => {

// 	const state = {
// 		tableArr: [], 

// 		// Поиск по SiteID
// 		searchText: ``,
// 		tableArrFiltred: [],

// 		sortType: 'asc',  // 'desc'
// 		sortField: 'siteID', // поле по умолчанию
// 		row: null, // нажатая выбранная строка
// 	}

//   // @ts-ignore
// 	componentDidUpdate(prevProps) {
//   // @ts-ignore
// 		if (this.props.arr !== prevProps.arr) {
//   // @ts-ignore
// 			const {arr} = this.props;
// 			this.setState({
// 				tableArr: arr, // переданный массив
// 				tableArrFiltred: arr, // массив для вывода отфильтрованных значений
// 			});
// 		}
// 	}


// 	// Обновляем все данные по нажатию кнопки
// 	handleUpdate() {
//   // @ts-ignore
// 		this.props.onHandleUpdateBigArr(this.state.tableArr);
// 	}

// 	// Обновляем с гугл таблицы по нажатию кнопки
// 	handleGoogleUpdate() {
//   // @ts-ignore
// 		this.props.onHandleUpdateFromGoogle(this.state.tableArr);
// 	}

// 	// Поиск в таблице по SiteID
//   // @ts-ignore
// 	handleSearchItem = event => {
// 		const value = event.target.value;
//   // @ts-ignore
// 		const arr = [];

// 		// this.state.tableArr.forEach((item, i) => {
// 		// 	if ((item.siteID.indexOf(value.toUpperCase()) === -1) &&
// 		// 		// (item.project.indexOf(value) === -1) &&
// 		// 		(item.organization.indexOf(value) === -1)) {
// 		// 			return
// 		// 	}
// 		// 	arr.push(item);
// 		// });
		
//   // @ts-ignore
// 		this.state.tableArr.forEach((item, i) => {
// 			const searchValue = value.toLowerCase();
			
// 			const siteIDMatch = item.siteID && item.siteID.toLowerCase().includes(searchValue);
// 			const organizationMatch = item.organization && item.organization.toLowerCase().includes(searchValue);
// 			// const projectMatch = item.project && item.project.toLowerCase().includes(searchValue); // если нужно включить project
			
// 			if (siteIDMatch || organizationMatch) {
// 				arr.push(item);
// 			}
// 		});
	
// 		this.setState({
// 			searchText: value,
//   // @ts-ignore
// 			tableArrFiltred: arr, 
// 		});
// 	};

// 	// При выходе из Search поле очищается
// 	handleSearchClear = () => {
// 		this.setState({
// 			searchText: '',
//   // @ts-ignore
// 			tableArrFiltred: this.state.tableArr, // Возвращаем целый  массив
// 		});
// 	};

// 	// Изменение индивидуальных значений сч/ф
// 	// Меняем в tableArr но ищем пришедший ID из tableArrFiltred
//   // @ts-ignore
// 	handleChangeItem = event => {
//   // @ts-ignore
// 		const {tableArr} = this.state;
// 		let arr = tableArr.concat();

// 		const target = event.target;
//   // @ts-ignore
// 		const filtredSiteId = this.state.tableArrFiltred[event.target.id].siteID;
//   // @ts-ignore
// 		const id = arr.findIndex(item => item.siteID === filtredSiteId);
// 		if (id === -1) {return}

// 		let value;

// 		switch (target.name) {
// 			case 'siteID':
// 				value = target.value;
// 				arr[id].siteID = value;
// 				break;

// 			case 'project':
// 				value = target.value;
// 				arr[id].project = value;
// 				break;

// 			case 'organization':
// 				value = target.value;
// 				arr[id].organization = value;
// 				break;

// 			case 'mbCostServicies':
// 				value = +target.value;
// 				arr[id].mbCostServicies = value;
// 				break;
	
// 			default: break;
// 		};

// 		this.setState({
// 			tableArr: arr,
// 		});
// 	}


// 	// Устанавливаем выбранную строку
//   // @ts-ignore
// 	handleRowSelect = row => {
// 		console.log(row);
// 		this.setState({
// 			row,
// 			isModal: true,
// 		});
// 	};


// 	// Сортировка "Таблицы"
//   // @ts-ignore
// 	handleSortTabl = sortField => {
//   // @ts-ignore
// 		const {tableArrFiltred, sortType} = this.state;
// 		sortField = getTitle(sortField.item, BIG_TITLE, BIG_SORT);
// 		const cloneData = tableArrFiltred.concat();
// 		// Проверяем что у нас сейчас в сортировке
// 		const sortT = sortType === 'asc' ? 'desc' : 'asc';
// 		// Сортируем
// 		const orderedData = _.orderBy(cloneData, sortField, sortT);
// 		this.setState({
// 			tableArrFiltred: orderedData,
// 			sortType: sortT,
// 			sortField: sortField,
// 		});
// 	};

// 	// Добавляем новую строку
// 	handleAddRow() {
//   // @ts-ignore
// 		const {tableArr} = this.state;
// 		let newArr = [{
// 			siteID: '',
// 			project: '',
// 			organization: '',
//   // @ts-ignore
// 			mbPrice: this.props.mbPrice,
// 			mbTraffic: 0,
// 			mbCostServicies: '',
// 			mbCostTraffic: 0,
// 			mbCostCorrect: 0,
// 			spTraffic: 0,
// 			spCostTraffic: 0,
// 			result: 0,
// 		}, ...tableArr];

// 		this.setState({
// 			tableArr: newArr,
// 			tableArrFiltred: newArr,
// 		});

// 	}

	
// 	// Открываем модальное окно
// 	handleModalInfo() {
// 		this.setState({
// 			isModal: true,
// 		});
// 	};

	

// 	// Обрабатываем закрытие модального окна
//   // @ts-ignore
// 	handleModalOut(obj) {
// 		if (obj) {
// 			let newObj = {};
//   // @ts-ignore
// 			newObj.siteID = obj.siteID || '';
//   // @ts-ignore
// 			newObj.project = obj.project || '';
//   // @ts-ignore
// 			newObj.organization = obj.organization || '';
//   // @ts-ignore
// 			newObj.mbPrice = this.props.mbPrice;
//   // @ts-ignore
// 			newObj.mbTraffic = +obj.mbTraffic || 0;
//   // @ts-ignore
// 			newObj.mbCostServicies = +obj.mbCostServicies || 0;
//   // @ts-ignore
// 			newObj.mbCostTraffic = +obj.mbCostTraffic || 0;
//   // @ts-ignore
// 			newObj.mbCostCorrect = +obj.mbCostCorrect || 0;
//   // @ts-ignore
// 			newObj.spTraffic = +obj.spTraffic || 0;
//   // @ts-ignore
// 			newObj.spCostTraffic = +obj.spCostTraffic || 0;
//   // @ts-ignore
// 			newObj.result = +obj.result || 0;

//   // @ts-ignore
// 			const {tableArr} = this.state;
// 			let newArr = [];
// 			// Проверяем внесли ли изменения в существующий SiteID
//   // @ts-ignore
// 			let result = tableArr.findIndex(item => item.siteID.toUpperCase() === obj.siteID.toUpperCase());
// 			// console.log('result: ', result);
// 			if (result !== -1) {
// 				// console.log(`Old Row`);
// 				newArr = [...tableArr.slice(0, result), newObj, ...tableArr.slice(result + 1)];
// 			} else {
// 				// console.log(`New Row`);
// 				newArr = [newObj, ...tableArr.slice(1)];
// 			}

// 			this.setState({
// 				tableArr: newArr,
// 			});
// 		};
// 		this.setState({
// 			isModal: false,
// 		});
// 		setTimeout(() => this.handleSearchClear(),0); // Очищаем строку поиска

// 	};


// 	render() {
//   // @ts-ignore
// 		const {arrayOfProject} = this.props;
// 		const {
// 			// tableArr,
//   // @ts-ignore
// 			tableArrFiltred,
//   // @ts-ignore
// 			sortType, sortField,
//   // @ts-ignore
// 			isModal, row,
//   // @ts-ignore
// 			searchText,
// 		} = this.state;

// 		return (
// 			<>
// 				<	div className="section">
// 					<div className="centerBox">
// 						{/* <form> */}
// 						<div className="capt">Сводная таблица</div>

// 						<div className="buttonsSprite">
// 							<input className="butAdd" type="button" value="+ строку" 
// 								onClick={this.handleAddRow}
// 							/>
// 							<input className="butUpdate" type="button" value="Пересчитать" 
// 								onClick={this.handleUpdate}
// 							/>
// 							<input
// 								className="butSearch"
// 								type="text" 
// 								name="search"
// 								placeholder="Поиск по SiteID"
// 								value={searchText}
// 								autoComplete="off"
// 								onChange={this.handleSearchItem}
// 								// onBlur={this.handleSearchBlur}

// 							/>
// 							<input className="butUpdate" type="button" value="Синхронизировать данные с ServiceDesk"
// 								onClick={this.handleGoogleUpdate}
// 							/>
// 						</div>

// 						{/* Редактирование строки */}
// 						{isModal && <ModalChangeRow callback={this.handleModalOut} element={row} arrayOfProject={arrayOfProject}/>}

							

// 						<table className="tableFixedHead">
// 							<thead>
// 								<tr>
// 									{BIG_TITLE.map( (item, i) => <th key={item+i} 
// 										onClick={this.handleSortTabl.bind(null, {item})}
// 										// className={cl({[s.active]: sortField === BIG_SORT[i]}, s[BIG_TITLE_CLASS[i]])}
// 										>
// 											{item} 
// 											{sortField === BIG_SORT[i] ? 
// 												sortType === 'asc'  ? ' ▲' : 
// 												sortType === 'desc' ? ' ▼' : null : null}
// 										</th> )}
// 								</tr>
// 							</thead>
								
// 							<tbody>
//   {/* @ts-ignore */}
// 									{tableArrFiltred.map( (item, i) => (
// 										<tr key={item.siteID + i}	>
// 												<td className="widthSiteId"
// 													onClick={this.handleRowSelect.bind(null, item)}>
// 													{item.siteID}
// 												</td>
// 												<td className="widthProject"
// 													onClick={this.handleRowSelect.bind(null, item)}>
// 														{item.project}
// 												</td>
// 												<td className="tdOrganization widthOrganization"
// 													onClick={this.handleRowSelect.bind(null, item)}
// 												>
// 													{item.organization}
// 												</td>
// 												<td className="widthMbPrice">{item.mbPrice}</td>
// 												<td className="widthFactura">
// 													<input 
// 														className="inpMbCostServicies"
// 														type="number"
// 														name="mbCostServicies"
// 														value={item.mbCostServicies}
// 														onChange={this.handleChangeItem}
// 														onBlur={this.handleSearchClear}
// 														id={i}
// 													/>
// 												</td>
// 												<td className="widthMbTraffic">{item.mbTraffic}</td>
// 												<td className="widthMbTrafficCost">{item.mbCostTraffic ? item.mbCostTraffic : 0}</td>
// 												<td className="widthCostCorrect">{item.mbCostCorrect}</td>
// 												<td className="widthSpTraffic">{item.spTraffic}</td>
// 												<td className="widthSpTrafficCost">{item.spCostTraffic}</td>
// 												<td className="widthCostResult">{item.result || 0}</td>
// 										</tr>
// 										))}
// 							</tbody>
// 						</table>
// 						{/* </form> */}
// 					</div>
// 				</div>
// 			</>
// 		)
// 	}
// }
	
// export default BigTable;
