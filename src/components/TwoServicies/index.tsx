import React from 'react';
import './two-servicies.scss'; 
import { CreateTable } from '../CreateTable';

interface TwoServiciesProps {
  arrThMb: any[];
  arrThSprite: any[];
}

const TwoServicies: React.FC<TwoServiciesProps> = ({arrThMb, arrThSprite}) => {
	const arrTitle = [`Станция`, `Трафик(MB)`];

	return (
		<>
			<div className="centerBox">
				<div className="result">
					<div className="resultCard">
						<CreateTable arr={arrThMb} arrTitle={`Помегабайтный`} arrTh={arrTitle}/>
					</div>
					
					<div className="resultCard">
						<CreateTable arr={arrThSprite} arrTitle={`Полосная`} arrTh={arrTitle}/>
					</div>
				</div>
			</div>
		</>
	)
}

export default TwoServicies;
