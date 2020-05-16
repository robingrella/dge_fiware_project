import NGSI from 'ngsi-parser';
import fetch from 'node-fetch';

const pvRequestURL = 'https://api.scit-bo.de/pv?apiKey=af7d173c57f5c4816747ada9e7aad23e';
const weatherRequestURL = 'https://api.scit-bo.de/weather?apiKey=af7d173c57f5c4816747ada9e7aad23e';

function requestData() { 

	fetch(pvRequestURL, {
		method: 'get'
	})
	.then(res => res.json())
	.then(json => {
			json.id = Math.floor(Math.random() * 101);     // returns a random int in range 0 to 100
			json.type = "PV";
			var entity = NGSI.parseEntity(json);
			console.log(entity);
		}
	);
	
	fetch(weatherRequestURL, {
		method: 'get'
	})
	.then(res => res.json())
	.then(json => {
			json.id = Math.floor(Math.random() * 101);     // returns a random int in range 0 to 100
			json.type = "WeatherObserved";
			var entity = NGSI.parseEntity(json);
			console.log(entity);
		}
	);
} 

requestData();