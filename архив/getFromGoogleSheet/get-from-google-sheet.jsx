const getFromGoogleSheet = url => {
	
	let json = '';
	let arr = [];
	let obj = {};

	fetch(url)
		.then(response => {
			return json = response.json();

			})
			.then( res => {

				for(let item of res.result) {
					obj.siteID = item[0];
					obj.project = item[1];
					obj.organization = item[2];
					arr.push(obj);
					
					obj = {};
				}
				console.log('arr: ', arr);

				return res.result

				// for(let item of res.result) {
				// 	result += `${item} <br/>`;
				// }
			})
}

export default getFromGoogleSheet;
