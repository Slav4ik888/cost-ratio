import React, {createRef, PureComponent} from 'react';
import s from './create-table-from-arr.module.css'; 
import cl from 'classnames';
import {getTitle} from '../../utils/get-title.js';

import {TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE} from '../../consts/consts.js';

import _ from 'lodash';


class CreateTableFromArr extends PureComponent {
	constructor (props) {
		super(props);
		this.handleChangeItem = this.handleChangeItem.bind(this); 

		// this.handleChangeCost = this.handleChangeCost.bind(this); 
		// this.handleChangeProject = this.handleChangeProject.bind(this);

		this.handleRowSelect = this.handleRowSelect.bind(this); 
		this.handleSortTabl = this.handleSortTabl.bind(this); 
		this.handleHandleAddRow = this.handleHandleAddRow.bind(this);

		// this.textInput = createRef();
		// this.focusTextInput = this.focusTextInput.bind(this);
		
		this.state = {
			sortType: 'asc',  // 'desc'
			sortField: 'siteID', // поле по умолчанию
			row: null, // нажатая выбранная строка

			// lastFocus: 0, // фокус курсора
		}
	}

	// componentDidUpdate() {
	// 	this.focusTextInput();
	// }

	// Изменение индивидуальных значений сч/ф
	handleChangeItem = (event) => {
		this.props.onChangeItem(event);
	}

	// // Изменение индивидуальных значений сч/ф
	// handleChangeProject = (event) => {
	// 	this.props.onChangeProject(event);
	// }


	// Устанавливаем выбранную строку
  handleRowSelect = (row, i) => {
		console.log(row);
		this.setState({
			row,
			// lastFocus: i, // Сохраняет текущий фокус input
		});
	}

	// Сортировка "Таблицы"
  handleSortTabl = sortField => {
		const {sortType} = this.state;
		const {arr, onHandleArrForBigTable} = this.props;

		sortField = getTitle(sortField.item, TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE);

		const cloneData = arr.concat();
		// Проверяем что у нас сейчас в сортировке
		const sortT = sortType === 'asc' ? 'desc' : 'asc';
		// Сортируем
		const orderedData = _.orderBy(cloneData, sortField, sortT);
		this.setState({
			sortType: sortT,
			sortField: sortField,
		});
		// Отправляем данные в Cost-ratio чтобы поменять значение в таблице
		onHandleArrForBigTable(orderedData);
	};

	// Добавляем новую строку
	handleHandleAddRow() {
		const {arr, onHandleArrForBigTable} = this.props;
		let newArr = [{
			siteID: '',
			project: '',
			organization: '',
			mbPrice: 0.132,
			mbTraffic: 0,
			mbCostServicies: '',
			mbCostTraffic: 0,
			mbCostCorrect: 0,
			spTraffic: 0,
			spCostTraffic: 0,
			result: 0,
		}, ...arr];

		// this.setState({
		// 	lastFocus: 0, // Сохраняет текущий фокус input
		// });

		onHandleArrForBigTable(newArr);
		
	}

	focusTextInput() {
    // Установим фокус на текстовое поле с помощью чистого DOM API
    // Примечание: обращаемся к "current", чтобы получить DOM-узел
    // this.textInput.current.focus();
	}
	
	

	render() {
		const {sortType, sortField, lastFocus} = this.state;
		const {arr, arrTitle} = this.props;

		return (
			<>
				<form>
					<div className={s.capt}>{arrTitle}</div>
					<input className={s.button} type="button" value="Добавить строку" 
						onClick={this.handleHandleAddRow}
					/>
					
					<table className={s.table}>
						<thead>
							<tr>
								{TITLE_BIG_TABLE.map( (item, i) => <th key={item+i} 
									onClick={this.handleSortTabl.bind(null, {item})}
									className={cl({[s.active]: sortField === TITLE_BIG_TABLE_VALUE[i]})}
									>
										{item} 
										{sortField === TITLE_BIG_TABLE_VALUE[i] ? 
											sortType === 'asc'  ? ' ▲' : 
											sortType === 'desc' ? ' ▼' : null : null}
									</th> )}
							</tr>
						</thead>
						
						<tbody>
								{arr.map( (item, i) => (
									<tr key={item.siteID+i} 
										onClick={this.handleRowSelect.bind(null, item, i)}
									>
											<td>
												<input 
													className={s.inpSiteID}
													type="text" 
													name="siteID"
													value={item.siteID}
													onChange={this.handleChangeItem}
													id={i}
												/>
											</td>
											<td>
												<input 
													className={s.inpProject}
													type="text" 
													name="project"
													value={item.project}
													onChange={this.handleChangeItem}
													id={i}
													/>
											</td>
											<td className={s.tdOrganization}>
												<input 
													className={s.inpOrganization}
													type="text" 
													name="organization"
													value={item.organization}
													onChange={this.handleChangeItem}
													id={i}
												/>
											</td>
											<td>{item.mbPrice}</td>
											<td>
												<input 
													className={s.inpMbCostServicies}
													type="number"
													name="mbCostServicies"
													value={item.mbCostServicies}
													onChange={this.handleChangeItem}
													id={i}
													// ref={(i === lastFocus) ? this.textInput : null}
										
													/>
													
											</td>
											<td>{item.mbTraffic}</td>
											<td>{item.mbCostTraffic ? item.mbCostTraffic.toFixed(2) : 0}</td>
											<td>{item.mbCostCorrect}</td>
											<td>{item.spTraffic}</td>
											<td>{item.spCostTraffic}</td>
											<td>{item.result || 0}</td>
									</tr>
									))}
						</tbody>
					</table>
				</form>

			</>
		)
	}
}

export default CreateTableFromArr;