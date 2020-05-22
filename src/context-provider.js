import NGSI from 'ngsi-parser';
import fetch from 'node-fetch';
import config from './config.js';


const pvRequestURL = config.get('pv_request_url') + '?apiKey=' + config.get('api_key');
const weatherRequestURL = config.get('weather_request_url') + '?apiKey=' + config.get('api_key');

function requestPV() { 

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

} 

function requestWeather() { 
	
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

setInterval(requestPV, 900000);  // function runs every 15 minutes
setInterval(requestWeather, 60000);  // function runs every minute