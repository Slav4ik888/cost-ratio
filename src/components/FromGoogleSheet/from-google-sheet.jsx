import React from 'react';
import s from './from-google-sheet.module.css'; 



const FromGoogleSheet = () => {
	
	let	output = [], json = '';
	let result = '';
	fetch("https://script.google.com/macros/s/AKfycbxX_iYuZt9Qco482UepKO4l3ZnRgPv88Zq4ZHFUEGhTmqJKCt0/exec")
		.then(response => {
			return json = response.json();

			})
		.then( res => {
			console.log('res: ', res.result);

			for(let item of res.result) {
				result += `${item} <br/>`;
			}
		
			return (
				<>
					<div className={s.centerBox}>
						<div className={s.result}>
							<div className={s.resultCard}>
								{res.result}
							</div>
						</div>
					</div>
					
				</>
			)
	})
	return null;
}

export default FromGoogleSheet;
