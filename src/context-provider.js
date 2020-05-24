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
			//json.id = Math.floor(Math.random() * 101);     // returns a random int in range 0 to 100
			json.id = "urn:ngsi-ld:PV:001";
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
			//json.id = Math.floor(Math.random() * 101);     // returns a random int in range 0 to 100
			json.id = "urn:ngsi-ld:WeatherObserved:001";
			json.type = "WeatherObserved";
			var entity = NGSI.parseEntity(json);
			console.log(entity);
			fetch(config.get('context_broker_url'), {
				method: 'post',
				body: entity
			  }).then(function(response) {
				return response.json();
			});
		}
	);
} 

setInterval(requestPV, 900000);  // function runs every 15 minutes
setInterval(requestWeather, 60000);  // function runs every minute