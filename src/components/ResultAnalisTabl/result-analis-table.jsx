import React, {PureComponent} from 'react';
import s from './result-analis-table.module.css'; 
import cl from 'classnames';
import {DetailRowView} from '../DetailRowView/detail-row-view.jsx';
import {getTitle} from '../../utils/get-title.js';

import {TITLE_RES_ANALIS_TABLE, TITLE_RES_ANALIS_TABLE_VALUE} from '../../consts/consts.js';
import _ from 'lodash';



class ResultAnalisTabl extends PureComponent {
	constructor (props) {
		super(props);

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
			console.log('arrBig: ', arrBig);
			console.log(`DIDUP`, arr);

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

		sortField = getTitle(sortField.item, TITLE_RES_ANALIS_TABLE, TITLE_RES_ANALIS_TABLE_VALUE);

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


	render() {
		const {tableArr, sortType, sortField, row, rowResult} = this.state;

		return (
			<>
				{/* выводим нажатую строчку */}
				{
					rowResult &&
					row ? <DetailRowView result={rowResult} /> : null
				}
				<div className={s.centerBox}>
					<div className={s.result}>
						<div className={s.resultCard}>
									
							<div className={s.capt}>Итоговая таблица для анализа</div>
							<table className={s.table}>
								<thead>
									<tr>
										{TITLE_RES_ANALIS_TABLE.map( (item, i) => <th key={item+i}
										onClick={this.handleSortTabl.bind(null, {item})}
										className={cl({[s.active]: sortField === TITLE_RES_ANALIS_TABLE_VALUE[i]})}

										>
											{item}
											{sortField === TITLE_RES_ANALIS_TABLE_VALUE[i] ? 
												sortType === 'asc'  ? ' ▲' : 
												sortType === 'desc' ? ' ▼' : null : null}
										</th> )}
									</tr>
								</thead>
								<tbody>
									
									
									{tableArr.map( (item, i) => (
										<tr key={item.result+i}
											onClick={this.handleRowSelect.bind(null, item, i)}
										>
											<td>{item.project}</td>
											<td>{item.sumMbCost}</td>
											<td>{item.sumSpCost}</td>
											<td>{item.result}</td>
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
