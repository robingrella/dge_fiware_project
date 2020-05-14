const fetch = require('node-fetch');

function requestData() { 
	fetch('https://api.scit-bo.de/pv?apiKey=af7d173c57f5c4816747ada9e7aad23e', {
	method: 'get'
	})
	.then(res => res.json())
    .then(json => console.log(json));
} 
requestData()