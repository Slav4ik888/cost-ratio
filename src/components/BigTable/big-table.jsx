import React from 'react';
import s from './big-table.module.css'; 
import CreateTableFromArr from '../CreateTableFromArr/create-table-from-arr.jsx';


const BigTable = ({ arr, onChangeMbCost, onHandleArrForBigTable}) => {
		// console.log('BigTable', arr);
		
    return (
        <>
					<div className={s.section}>
						<div className={s.centerBox}>
							<div className={s.result}>
								<div className={s.resultCard}>
									<CreateTableFromArr arr={arr} 
										arrTitle={`Сводная таблица`} 
										onChangeMbCost={onChangeMbCost}
										onHandleArrForBigTable={onHandleArrForBigTable}
									/>
								</div>
							</div>
						</div>
					</div>
        </>
    )
}

export default BigTable;
