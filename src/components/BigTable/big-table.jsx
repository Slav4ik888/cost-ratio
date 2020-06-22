import React from 'react';
import s from './big-table.module.css'; 
import CreateTableFromArr from '../CreateTableFromArr/create-table-from-arr.jsx';



const BigTable = ({ arr }) => {
		// console.log('BigTable', arr);
		
		const arrTh = [
			`SiteID`, 
			`Проект`,
			`Клиент`, 
			`Стоимость Мб`,
			`Затраты из сч/ф`, 
			`Трафик (вне полосы)`,
			`Входящие затраты по трафику`, 
			`Затраты скорректированные`,
			`Трафик с полосы`, 
			`Затраты с полосы`,
			`Затраты итого`,
		];
		
    return (
        <>

					<div className={s.centerBox}>
						<div className={s.result}>
							<div className={s.resultCard}>
								<CreateTableFromArr arr={arr} arrTitle={`Сводная таблица`} arrTh={arrTh}/>
							</div>
						</div>
					</div>
					
        </>
    )
}

export default BigTable;
