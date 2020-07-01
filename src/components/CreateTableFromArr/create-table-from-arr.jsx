import React, {PureComponent} from 'react';
import s from './create-table-from-arr.module.css'; 
import cl from 'classnames';
import {getTitle} from '../../utils/get-title.js';

import {TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE} from '../../consts/consts.js';

import _ from 'lodash';


class CreateTableFromArr extends PureComponent {
	constructor (props) {
		super(props);
		this.handleChangeCost = this.handleChangeCost.bind(this); 
		this.handleRowSelect = this.handleRowSelect.bind(this); 
		this.handleSortTabl = this.handleSortTabl.bind(this); 

		this.state = {
			sortType: 'asc',  // 'desc'
			sortField: 'siteID', // поле по умолчанию
			row: null, // нажатая выбранная строка
		}
	}


	// Изменение индивидуальных значений сч/ф
	handleChangeCost = (event) => {
		this.props.onChangeMbCost(event);
	}


	// Устанавливаем выбранную строку
  handleRowSelect = row => {
		console.log(row);
		this.setState({row});
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
	}

	render() {
		const {sortType, sortField} = this.state;
		const {arr, arrTitle} = this.props;

		return (
			<>
				<div className={s.capt}>{arrTitle}</div>
				{/* <input className={s.button} type="submit" value="Пересчитать" /> */}

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
									onClick={this.handleRowSelect.bind(null, item)}
								>
										<td>{item.siteID}</td>
										<td>{item.project}</td>
										<td>{item.organization}</td>
										<td>{item.mbPrice}</td>
										<td>
											<input 
												type="number" 
												value={item.mbCostServicies}
												onChange={this.handleChangeCost}
												id={i}
												/>
										</td>
										<td>{item.mbTraffic}</td>
										<td>{item.mbCostTraffic.toFixed(2)}</td>
										<td>{item.mbCostCorrect}</td>
										<td>{item.spTraffic}</td>
										<td>{item.spCostTraffic}</td>
										<td>{item.result}</td>
								</tr>
								))}
					</tbody>
				</table>
			</>
		)
	}
}

export default CreateTableFromArr;