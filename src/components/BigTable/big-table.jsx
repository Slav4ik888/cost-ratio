import React from 'react';
import s from './big-table.module.css'; 
import CreateTableFromArr from '../CreateTableFromArr/create-table-from-arr.jsx';


const BigTable = ({ arr, onHandleUpdateBigArr, arrayOfProject}) => {
		// console.log('BigTable', arr);
		
    return (
        <>
					<div className={s.section}>
						<div className={s.centerBox}>
									<CreateTableFromArr
										arr={arr} 
										onHandleUpdateBigArr={onHandleUpdateBigArr}
										arrayOfProject={arrayOfProject}
									/>
						</div>
					</div>
        </>
    )
}

export default BigTable;
