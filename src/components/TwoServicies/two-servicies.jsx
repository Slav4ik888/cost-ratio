import React from 'react';
import s from './two-servicies.module.css'; 
import CreateTable from '../CreateTable/create-table.jsx';

// Возвращает массив помегабайтного
const returnArrMb = arr => {
	let newArr = [];
	for(let item of arr) {
			if (!item.siteID.endsWith("-2") ) newArr.push(item);
	}
	return newArr;
}



// Возвращает массив полосной
const returnArrSprite = arr => {
	let newArr = [];
	for(let item of arr) {
			if (item.siteID.endsWith("-2") ) {
					item.siteID = item.siteID.slice(0,-2);
					newArr.push(item);
			}
	}
	console.log('returnArrSprite: ',newArr);

	return newArr;
}

const TwoServicies = ({ arr }) => {
		console.log('TwoServicies', arr);
		
		const arrTitleMb = [`Станция`, `Трафик(MB)`];
		const arrThMb = returnArrMb(arr);
		const arrThSprite = returnArrSprite(arr)
		// const arrTitleMb = [
		// 	{siteID: `Станция`},
		// 	{trafficMb: `Трафик(MB)`},
		// ];

		// const arrTitleSp = [
		// 	`SiteID`, `Проект`, `Клиент`, `Стоимость Мб`, `Затраты из сч/ф`, `Трафик (вне полосы)`, `Входящие затраты по трафику`,
		// 	`Затраты скорректированные`, `Трафик с полосы`, `Затраты с полосы`, `Затраты итого`
		// ];

    return (
        <>
					<div className={s.centerBox}>
						<div className={s.result}>
							<div className={s.resultCard}>
								<div className={s.capt}>Помегабайтный</div>
								<table className={s.table}>
									<thead>
										<tr>
											{arrTitleMb.map( (item, i) => <th key={item+i}>{item}</th> )}
										</tr>
									</thead>
									
									<tbody>
										
											{arrThMb.map( (item, i) => (
												<tr key={item.siteID+i}>
														<td>{item.siteID}</td>
														<td>{item.trafficMb}</td>
												</tr>
												))}
										
									</tbody>

								</table>
							</div>
							
							<div className={s.resultCard}>
								<div className={s.capt}>Полосной</div>
								<table className={s.table}>
									<thead>
										<tr>
											{arrTitleMb.map( (item, i) => <th key={item+i}>{item}</th> )}
										</tr>
									</thead>

									<tbody>
										
											{arrThSprite.map( (item, i) => (
												<tr key={item.siteID+i}>
														<td>{item.siteID}</td>
														<td>{item.trafficMb}</td>
												</tr>
												))}
										
									</tbody>
								</table>
							</div>
						</div>
					</div>
        </>
    )
}

{/* <CreateTable arr={returnArrMb(arr)} arrTitle={`Помегабайтный`} arrTh={arrTitleMb}/> */}

{/* <CreateTable arr={returnArrSprite(arr)} arrTitle={`Полосная`} arrTh={arrTitleMb}/> */}

export default TwoServicies;