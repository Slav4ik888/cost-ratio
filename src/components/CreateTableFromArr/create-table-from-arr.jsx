import React, {PureComponent} from 'react';
import s from './create-table-from-arr.module.css'; 
import cl from 'classnames';
import {getTitle} from '../../utils/get-title.js';
import {TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE} from '../../consts/consts.js';
import _ from 'lodash';


class CreateTableFromArr extends PureComponent {
	constructor (props) {
		super(props);
		this.handleChangeItem = this.handleChangeItem.bind(this); 
		this.handleRowSelect = this.handleRowSelect.bind(this); 
		this.handleSortTabl = this.handleSortTabl.bind(this); 
		this.handleAddRow = this.handleAddRow.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		
		this.state = {
			tableArr: [], 

			sortType: 'asc',  // 'desc'
			sortField: 'siteID', // поле по умолчанию
			row: null, // нажатая выбранная строка
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.arr !== prevProps.arr) {
			console.log(`DIDUP`);
			const {arr} = this.props;
			this.setState({
				tableArr: arr, // переданный массив
			});
		}
	}


	handleUpdate() {
		this.props.onHandleUpdateBigArr(this.state.tableArr);
	}

	// Изменение индивидуальных значений сч/ф
	handleChangeItem = (event) => {
		// this.props.onChangeItem(event);
		const {tableArr} = this.state;
    let arr = tableArr.concat();

    const target = event.target;
    console.log('target.name: ', target.name);
    const id = target.id;
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
  handleRowSelect = row => {this.setState({row})};


	// Сортировка "Таблицы"
  handleSortTabl = sortField => {
		const {tableArr, sortType} = this.state;
		sortField = getTitle(sortField.item, TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE);
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

	// Добавляем новую строку
	handleAddRow() {
		const {tableArr} = this.state;
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
		}, ...tableArr];

		this.setState({
			tableArr: newArr,
		});

	}

 
	render() {
		const {tableArr, sortType, sortField} = this.state;

		return (
			<>
				<form>
					<div className={s.capt}>Сводная таблица</div>
					<input className={s.butAdd} type="button" value="Добавить строку" 
						onClick={this.handleAddRow}
					/>
					<input className={s.butUpdate} type="button" value="Пересчитать" 
						onClick={this.handleUpdate}
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
								{tableArr.map( (item, i) => (
									<tr key={item.siteID+i} 
										onClick={this.handleRowSelect.bind(null, item)}
									>
											<td>
												<input 
													className={cl(s.inpSiteID, {[s.alarm] : !item.siteID})}
													type="text" 
													name="siteID"
													value={item.siteID}
													onChange={this.handleChangeItem}
													id={i}
													/>
												{/* {item.siteID} */}
											</td>
											<td>
												<input 
													className={cl(s.inpProject, {[s.alarm] : !item.project})}
													type="text" 
													name="project"
													value={item.project}
													onChange={this.handleChangeItem}
													id={i}
													/>
													{/* {item.project} */}
											</td>
											<td className={s.tdOrganization}>
												<input 
													className={cl(s.inpOrganization, {[s.alarm] : !item.organization})}
													type="text" 
													name="organization"
													value={item.organization}
													onChange={this.handleChangeItem}
													id={i}
												/>
												{/* {item.organization} */}
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
												/>
													
											</td>
											<td>{item.mbTraffic}</td>
											<td>{item.mbCostTraffic ? item.mbCostTraffic : 0}</td>
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