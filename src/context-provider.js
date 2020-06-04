import NGSI from 'ngsi-parser';
import fetch from 'node-fetch';
import config from './config.js';


const pvRequestURL = config.get('pv_request_url') + '?apiKey=' + config.get('api_key');
const weatherRequestURL = config.get('weather_request_url') + '?apiKey=' + config.get('api_key');
const contextBrokerEntitiesURL = config.get('context_broker_url') + "entities?options=upsert";

function requestPV() { 

	fetch(pvRequestURL, {
		method: 'GET'
	})
	.then(res => res.json())
	.then(json => {
			json.id = "urn:ngsi-ld:PV:001";
			json.type = "ThreePhaseAcMeasurement";
			var entity = NGSI.parseEntity(json);
			console.log(entity);

			postEntity(entity);
		}
	)
	.catch((err) => {
		console.log(err);
	});

} 

function requestWeather() { 
	fetch(weatherRequestURL, {
		method: 'GET'
	})
	.then(res => res.json())
	.then(json => {
			json.id = "urn:ngsi-ld:WeatherObserved:001";
			json.type = "WeatherObserved";
			var entity = NGSI.parseEntity(json);
			console.log(entity);

			postEntity(entity);
		}
	)
	.catch((err) => {
		console.log(err);
	});
} 

function postEntity(entity) {
	fetch(contextBrokerEntitiesURL, {
		method : 'POST',
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(entity)
	})
	.catch((err) => {
		console.log(err);
	});
}

setInterval(requestPV, 900000);  // function runs every 15 minutes
setInterval(requestWeather, 60000);  // function runs every minute