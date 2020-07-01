import React from 'react';
import s from './big-table.module.css'; 
import CreateTableFromArr from '../CreateTableFromArr/create-table-from-arr.jsx';


const BigTable = ({ arr, onHandleUpdateBigArr}) => {
		// console.log('BigTable', arr);
		
    return (
        <>
					<div className={s.section}>
						<div className={s.centerBox}>
							<div className={s.result}>
								<div className={s.resultCard}>
									<CreateTableFromArr
										arr={arr} 
										onHandleUpdateBigArr={onHandleUpdateBigArr}
									/>
								</div>
							</div>
						</div>
					</div>
        </>
    )
}

export default BigTable;
