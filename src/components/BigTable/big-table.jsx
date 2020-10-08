import React, {PureComponent} from 'react';
import s from './big-table.module.css'; 
import cl from 'classnames';
import {getTitle} from '../../utils/untils.js';
import {BIG_TITLE, BIG_TITLE_CLASS, BIG_SORT} from '../../consts/consts.js';
import ModalChangeRow from '../ModalChangeRow/modal-change-row.jsx';
import _ from 'lodash';


class BigTable extends PureComponent {
	constructor (props) {
		super(props);
		this.handleChangeItem = this.handleChangeItem.bind(this); 
		this.handleRowSelect = this.handleRowSelect.bind(this); 
		this.handleSortTabl = this.handleSortTabl.bind(this); 
		this.handleAddRow = this.handleAddRow.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleGoogleUpdate = this.handleGoogleUpdate.bind(this);
		this.handleModalInfo = this.handleModalInfo.bind(this);
		this.handleModalOut = this.handleModalOut.bind(this);
		this.handleSearchItem = this.handleSearchItem.bind(this);
		this.handleSearchClear = this.handleSearchClear.bind(this);

		this.state = {
			tableArr: [], 

			// Поиск по SiteID
			searchText: ``,
			tableArrFiltred: [],

			sortType: 'asc',  // 'desc'
			sortField: 'siteID', // поле по умолчанию
			row: null, // нажатая выбранная строка
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.arr !== prevProps.arr) {
			const {arr} = this.props;
			this.setState({
				tableArr: arr, // переданный массив
				tableArrFiltred: arr, // массив для вывода отфильтрованных значений
			});
		}
	}


	// Обновляем все данные по нажатию кнопки
	handleUpdate() {
		this.props.onHandleUpdateBigArr(this.state.tableArr);
	}

	// Обновляем с гугл таблицы по нажатию кнопки
	handleGoogleUpdate() {
		this.props.onHandleUpdateFromGoogle(this.state.tableArr);
	}

	// Поиск в таблице по SiteID
	handleSearchItem = event => {
		const value = event.target.value;
		const arr = [];

		this.state.tableArr.forEach((item, i) => {
			if ((item.siteID.indexOf(value.toUpperCase()) === -1) &&
				// (item.project.indexOf(value) === -1) &&
				(item.organization.indexOf(value) === -1)) {
					return
			}
			arr.push(item);
		});
	
		this.setState({
			searchText: value,
			tableArrFiltred: arr, 
		});
	};

	// При выходе из Search поле очищается
	handleSearchClear = () => {
		this.setState({
			searchText: ``,
			tableArrFiltred: this.state.tableArr, // Возвращаем целый  массив
		});
	};

	// Изменение индивидуальных значений сч/ф
	// Меняем в tableArr но ищем пришедший ID из tableArrFiltred
	handleChangeItem = event => {
		const {tableArr} = this.state;
		let arr = tableArr.concat();

		const target = event.target;
		const filtredSiteId = this.state.tableArrFiltred[event.target.id].siteID;
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

		this.setState({
			tableArr: arr,
		});
	}


	// Устанавливаем выбранную строку
	handleRowSelect = row => {
		console.log(row);
		this.setState({
			row,
			isModal: true,
		});
	};


	// Сортировка "Таблицы"
	handleSortTabl = sortField => {
		const {tableArrFiltred, sortType} = this.state;
		sortField = getTitle(sortField.item, BIG_TITLE, BIG_SORT);
		const cloneData = tableArrFiltred.concat();
		// Проверяем что у нас сейчас в сортировке
		const sortT = sortType === 'asc' ? 'desc' : 'asc';
		// Сортируем
		const orderedData = _.orderBy(cloneData, sortField, sortT);
		this.setState({
			tableArrFiltred: orderedData,
			sortType: sortT,
			sortField: sortField,
		});
	};

	// Добавляем новую строку
	handleAddRow() {
		const {tableArr} = this.state;
		let newArr = [{
			siteID: '',
			project: '',
			organization: '',
			mbPrice: this.props.mbPrice,
			mbTraffic: 0,
			mbCostServicies: '',
			mbCostTraffic: 0,
			mbCostCorrect: 0,
			spTraffic: 0,
			spCostTraffic: 0,
			result: 0,
		}, ...tableArr];

		this.setState({
			tableArr: newArr,
			tableArrFiltred: newArr,
		});

	}

	
	// Открываем модальное окно
	handleModalInfo() {
		this.setState({
			isModal: true,
		});
	};

	

	// Обрабатываем закрытие модального окна
	handleModalOut(obj) {
		console.log('obj: ', obj);
		if (obj) {
			let newObj = {};
			newObj.siteID = obj.siteID || '';
			newObj.project = obj.project || '';
			newObj.organization = obj.organization || '';
			newObj.mbPrice = this.props.mbPrice;
			newObj.mbTraffic = obj.mbTraffic || 0;
			newObj.mbCostServicies = obj.mbCostServicies || 0;
			newObj.mbCostTraffic = obj.mbCostTraffic || 0;
			newObj.mbCostCorrect = obj.mbCostCorrect || 0;
			newObj.spTraffic = obj.spTraffic || 0;
			newObj.spCostTraffic = obj.spCostTraffic || 0;
			newObj.result = obj.result || 0;

			const {tableArr} = this.state;
			let newArr = [];
			// Проверяем внесли ли изменения в существующий SiteID
			let result = tableArr.findIndex(item => item.siteID.toUpperCase() === obj.siteID.toUpperCase());
			// console.log('result: ', result);
			if (result !== -1) {
				// console.log(`Old Row`);
				newArr = [...tableArr.slice(0, result), newObj, ...tableArr.slice(result + 1)];
			} else {
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

	};


	render() {
		const {arrayOfProject} = this.props;
		const {
			// tableArr,
			tableArrFiltred,
			sortType, sortField,
			isModal, row,
			searchText,
		} = this.state;

		return (
			<>
				<	div className={s.section}>
					<div className={s.centerBox}>
						{/* <form> */}
						<div className={s.capt}>Сводная таблица</div>

						<div className={s.buttonsSprite}>
							<input className={s.butAdd} type="button" value="+ строку" 
								onClick={this.handleAddRow}
							/>
							<input className={s.butUpdate} type="button" value="Пересчитать" 
								onClick={this.handleUpdate}
							/>
							<input
								className={s.butSearch}
								type="text" 
								name="search"
								placeholder="Поиск по SiteID"
								value={searchText}
								autoComplete="off"
								onChange={this.handleSearchItem}
								// onBlur={this.handleSearchBlur}

							/>
							<input className={s.butUpdate} type="button" value="Синхронизировать данные с ServiceDesk"
								onClick={this.handleGoogleUpdate}
							/>
						</div>

							{/* Редактирование строки */}
							{isModal && <ModalChangeRow callback={this.handleModalOut} element={row} arrayOfProject={arrayOfProject}/>}

							

							<table className={s.tableFixedHead}>
								<thead>
									<tr>
										{BIG_TITLE.map( (item, i) => <th key={item+i} 
											onClick={this.handleSortTabl.bind(null, {item})}
											className={cl({[s.active]: sortField === BIG_SORT[i]}, s[BIG_TITLE_CLASS[i]])}
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
													<td className={s.widthSiteId}
														onClick={this.handleRowSelect.bind(null, item)}>
														{item.siteID}
													</td>
													<td className={s.widthProject}
														onClick={this.handleRowSelect.bind(null, item)}>
															{item.project}
													</td>
													<td className={cl(s.tdOrganization, s.widthOrganization)}
														onClick={this.handleRowSelect.bind(null, item)}
													>
														{item.organization}
													</td>
													<td className={s.widthMbPrice}>{item.mbPrice}</td>
													<td className={s.widthFactura}>
														<input 
															className={s.inpMbCostServicies}
															type="number"
															name="mbCostServicies"
															value={item.mbCostServicies}
															onChange={this.handleChangeItem}
															onBlur={this.handleSearchClear}
															id={i}
														/>
													</td>
													<td className={s.widthMbTraffic}>{item.mbTraffic}</td>
													<td className={s.widthMbTrafficCost}>{item.mbCostTraffic ? item.mbCostTraffic : 0}</td>
													<td className={s.widthCostCorrect}>{item.mbCostCorrect}</td>
													<td className={s.widthSpTraffic}>{item.spTraffic}</td>
													<td className={s.widthSpTrafficCost}>{item.spCostTraffic}</td>
													<td className={s.widthCostResult}>{item.result || 0}</td>
											</tr>
											))}
								</tbody>
							</table>
						{/* </form> */}
					</div>
				</div>
			</>
		)
	}
}
	
export default BigTable;
