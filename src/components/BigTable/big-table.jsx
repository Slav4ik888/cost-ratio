import React from 'react';
import s from './big-table.module.css'; 
import CreateTableFromArr from '../CreateTableFromArr/create-table-from-arr.jsx';


const BigTable = ({ arr, onSort, sortType, sortField, onRowSelect, onChangeMbCost}) => {
		// console.log('BigTable', arr);
		
    return (
        <>
					<div className={s.section}>
						<div className={s.centerBox}>
							<div className={s.result}>
								<div className={s.resultCard}>
									<CreateTableFromArr arr={arr} 
										arrTitle={`Сводная таблица`} 
										onSort={onSort}
										sortType={sortType}
										sortField={sortField}
										onRowSelect={onRowSelect}
										onChangeMbCost={onChangeMbCost}
									/>
								</div>
							</div>
						</div>
					</div>
        </>
    )
}

export default BigTable;
