import React from 'react';
import s from './two-servicies.module.css'; 
import CreateTable from '../CreateTable/create-table.jsx';


const TwoServicies = ({arrThMb, arrThSprite}) => {
		
		const arrTitle = [`Станция`, `Трафик(MB)`];

    return (
        <>

					<div className={s.centerBox}>
						<div className={s.result}>
							<div className={s.resultCard}>
								<CreateTable arr={arrThMb} arrTitle={`Помегабайтный`} arrTh={arrTitle}/>
							</div>
							
							<div className={s.resultCard}>
								<CreateTable arr={arrThSprite} arrTitle={`Полосная`} arrTh={arrTitle}/>
							</div>
						</div>
					</div>
					
        </>
    )
}

export default TwoServicies;
