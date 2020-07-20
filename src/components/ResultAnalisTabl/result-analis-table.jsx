import React, {PureComponent} from 'react';
import s from './result-analis-table.module.css'; 
import cl from 'classnames';
// import {DetailRowView} from '../DetailRowView/detail-row-view.jsx';
import ModalAnalisBlock from './ModalAnalisBlock/modal-analis-block.jsx';
import {getTitle} from '../../utils/untils.js';
import {addSpaceToNumber} from '../../utils/untils.js';

import {ANALIS_TITLE, ANALIS_TITLE_CLASS, ANALIS_SORT} from '../../consts/consts.js';
import _ from 'lodash';



class ResultAnalisTabl extends PureComponent {
	constructor (props) {
		super(props);
		this.handleModalOut = this.handleModalOut.bind(this);
		this.handleRowSelect = this.handleRowSelect.bind(this); 
		this.handleSortTabl = this.handleSortTabl.bind(this); 
		
		this.state = {
			tableArr: [], 
			bigArr: [],

			sortType: 'asc',  // 'desc'
			sortField: 'siteID', // поле по умолчанию
			row: null, // нажатая выбранная строка
			rowResult: null, // результат фильтра
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.arr !== prevProps.arr) {
			const {arr, arrBig} = this.props;

			// Переводим в цифры
			let newArr = arr.concat();
			newArr.forEach(item => {
				return (
				item.result = +item.result,
				item.sumMbCost = +item.sumMbCost,
				item.sumSpCost = +item.sumSpCost
				);
			});

			this.setState({
				tableArr: arr, // переданный массив
				bigArr: arrBig,
			});
		}
	}

	// Устанавливаем выбранную строку
  handleRowSelect = (row, i) => {
		console.log(row);
		const {bigArr} = this.state;

		let arr = bigArr.concat();
		let result = arr.filter(item => item.project === row.project);
		console.log('result: ', result);

		this.setState({
			row,
			rowResult: result,
		});
	}

	// Сортировка "Таблицы"
  handleSortTabl = sortField => {
		const {tableArr, sortType} = this.state;

		sortField = getTitle(sortField.item, ANALIS_TITLE, ANALIS_SORT);

		const cloneData = tableArr.concat();
		// Проверяем что у нас сейчас в сортировке
		const sortT = sortType === 'asc' ? 'desc' : 'asc';
		// Сортируем
		const orderedData = _.orderBy(cloneData, sortField, sortT);
		this.setState({
			tableArr: orderedData,
			sortType: sortT,
			sortField: sortField,
		});
		
	};


	// Обрабатываем закрытие модального окна
	handleModalOut(obj) {
		this.setState({
			row: null,
			rowResult: null,
		});
	};

	render() {
		const {tableArr, sortType, sortField, row, rowResult} = this.state;

		return (
			<>
				{/* выводим модалку нажатой строки */}
				{
					rowResult &&
					row ? 
						<ModalAnalisBlock callback={this.handleModalOut} result={rowResult} /> : null
				}
				<div className={s.centerBox}>
					<div className={s.result}>
						<div className={s.resultCard}>
									
							<div className={s.capt}>Итоговая таблица для анализа</div>
							<table className={s.tableFixedHead}>
								<thead>
									<tr>
										{ANALIS_TITLE.map( (item, i) => <th key={item+i}
										onClick={this.handleSortTabl.bind(null, {item})}
										className={cl({[s.active]: sortField === ANALIS_SORT[i]}, s[ANALIS_TITLE_CLASS[i]])}

										>
											{item}
											{sortField === ANALIS_SORT[i] ? 
												sortType === 'asc'  ? ' ▲' : 
												sortType === 'desc' ? ' ▼' : null : null}
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
										<tr key={item.result+i}
											onClick={this.handleRowSelect.bind(null, item, i)}
										>
											<td className={s.tdProject}>{item.project}</td>
											<td className={s.tdOrganization}>{item.organization}</td>
											<td className={s.tdSumMbCost}>{addSpaceToNumber(item.sumMbCost, 0, ',')} p.</td>
											<td className={s.tdSumSpCost}>{addSpaceToNumber(item.sumSpCost, 0, ',')} p.</td>
											<td className={s.tdResult}>{addSpaceToNumber(item.result, 0, ',')} p.</td>
										</tr>
										))}
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
			</>
		);
	};
};

export default ResultAnalisTabl;
