import React, {PureComponent} from 'react';
import s from './create-table-from-arr.module.css'; 
import cl from 'classnames';

import {TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE} from '../../consts/consts.js';


class CreateTableFromArr extends PureComponent {
	constructor (props) {
		super(props);
		this.handleChangeCost = this.handleChangeCost.bind(this); 
		this.handleSubmit = this.handleSubmit.bind(this); 


		this.state = {
			newArr: this.props.arr.concat(),
		}
	}

	handleChangeCost = (event) => {
		const value = event.target.value;
		console.log(`value - `, value);

		const id = event.target.id;

		console.log(`id - `, id);

		
		this.setState((state) => {
			// console.log('state: ', state);

			let arr = state.newArr.concat();
			console.log('arr[id].mbCostServicies: ', arr[id].mbCostServicies);

			arr[id].mbCostServicies = value;
			console.log('arr[id].mbCostServicies: ', arr[id].mbCostServicies);

			// const arr = [ ...state.newArr.slice[event.target.id],  ];
			// event.target.value.mbCostServicies
			return {newArr: arr}
		});

	}

	handleSubmit(event) {
		console.log(`Нажали Submit`);
		event.preventDefault();
	}

	render() {
		const { arrTitle, 
		onSort, sortType, sortField, onRowSelect,
		} = this.props;

		const arr = this.state.newArr;

		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<div className={s.capt}>{arrTitle}</div>
					<input className={s.button} type="submit" value="Пересчитать" />

					<table className={s.table}>
						<thead>
							<tr>
								{TITLE_BIG_TABLE.map( (item, i) => <th key={item+i} 
									onClick={onSort.bind(null, {item})}
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
										// onClick={onRowSelect.bind(null, item)}
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
				</form>
			</>
		)
	}
}

export default CreateTableFromArr;