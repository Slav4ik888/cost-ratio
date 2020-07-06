import React, {PureComponent} from 'react';
import s from './create-table-from-arr.module.css'; 
import cl from 'classnames';
import {getTitle} from '../../utils/get-title.js';
import {TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE} from '../../consts/consts.js';
import ModalChangeRow from '../ModalChangeRow/modal-change-row.jsx';
import _ from 'lodash';


class CreateTableFromArr extends PureComponent {
	constructor (props) {
		super(props);
		this.handleChangeItem = this.handleChangeItem.bind(this); 
		this.handleRowSelect = this.handleRowSelect.bind(this); 
		this.handleSortTabl = this.handleSortTabl.bind(this); 
		this.handleAddRow = this.handleAddRow.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleModalInfo = this.handleModalInfo.bind(this);
		this.handleModalOut = this.handleModalOut.bind(this);
		
		this.state = {
			tableArr: [], 

			// isModal: false,

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
		const {tableArr} = this.state;
    let arr = tableArr.concat();

    const target = event.target;
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
  handleRowSelect = row => {
		console.log(row);
		this.setState({
			row,
			isModal: true,
		});
	};


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

 
	// Открываем модальное окно
	handleModalInfo() {
		this.setState({
			isModal: true,
		});
	};

	

	// Обрабатываем закрытие модального окна
	handleModalOut(obj) {
		// console.log('obj: ', obj);
		if (obj) {
			const {tableArr} = this.state;
			let newArr = [];
			console.log('newArr: ', newArr);
			let result = tableArr.findIndex(item => item.siteID.toUpperCase() === obj.siteID.toUpperCase());
			console.log('result: ', result);
			if (result !== -1) {
				console.log(`Old Row`);
				newArr = [...tableArr.slice(0, result), obj, ...tableArr.slice(result + 1)];
			} else {
				console.log(`New Row`);
				newArr = [obj, ...tableArr.slice(1)];
				
			}
			this.setState({
				tableArr: newArr,
			});
			console.log('newArr: ', newArr);
		};
		this.setState({
			isModal: false,
		});
	};


	render() {
		const {arrayOfProject} = this.props;
		const {tableArr, sortType, sortField,
			isModal, row,
		} = this.state;

		return (
			<>
				{/* <form> */}
					<div className={s.capt}>Сводная таблица</div>
					<input className={s.butAdd} type="button" value="+ строку" 
						onClick={this.handleAddRow}
					/>
					{/* Редактирование строки */}
					{isModal && <ModalChangeRow callback={this.handleModalOut} element={row} arrayOfProject={arrayOfProject}/>}


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
									<tr key={item.siteID + i}	>
											<td onClick={this.handleRowSelect.bind(null, item)}>
												{item.siteID}
											</td>
											<td onClick={this.handleRowSelect.bind(null, item)}>
													{item.project}
											</td>
											<td className={s.tdOrganization}
												onClick={this.handleRowSelect.bind(null, item)}
											>
												{item.organization}
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
				{/* </form> */}

			</>
		)
	}
}

export default CreateTableFromArr;