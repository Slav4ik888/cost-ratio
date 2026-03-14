import React, {PureComponent} from 'react';
import s from './result-analis-table.module.css'; 
import cl from 'classnames';
// import {DetailRowView} from '../DetailRowView/detail-row-view.jsx';
import ModalAnalisBlock from './ModalAnalisBlock/index.js';
import {getTitle, addSpaceToNumber} from '../../utils/untils';
import {ANALIS_TITLE, ANALIS_TITLE_CLASS, ANALIS_SORT} from '../../consts';
import _ from 'lodash';


interface Props {
	arr: any[]
	arrBig: any[]
}

interface State {
	tableArr: any[],
	bigArr: any[],
	sortType: string,
	sortField: string,
	row: any,
	rowResult: any,
}

class ResultAnalisTabl extends PureComponent<Props> {
	constructor (props: Props) {
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
		} as State
	}

	componentDidUpdate(prevProps: Props) {
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
  handleRowSelect = (row: any, i: any) => {
		// console.log(row);
		// @ts-ignore
		const {bigArr} = this.state;

		let arr = bigArr.concat();
		// @ts-ignore
		let result = arr.filter(item => item.project === row.project);
		// console.log('result: ', result);

		this.setState({
			row,
			rowResult: result,
		});
	}

	// Сортировка "Таблицы"
		// @ts-ignore
  handleSortTabl = sortField => {
		// @ts-ignore
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
		// @ts-ignore
	handleModalOut(obj) {
		this.setState({
			row: null,
			rowResult: null,
		});
	};

	render() {
		// @ts-ignore
		const {tableArr, sortType, sortField, row, rowResult} = this.state;

		return (
			<>
				{/* выводим модалку нажатой строки */}
				{
					rowResult &&
						row ? 
						// @ts-ignore
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
									
									
		{/* @ts-ignore */}
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
