import axios from 'axios';
import config from '../src/config';

const dentistURL = `${config.ROOT_API_URL}/v1/dentist`;
// must be a valid token belonging to correct database/server, only replace long string value. Get from local storage.
const authHeader = { 
	"headers": { 
		"Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1N2UwMzhhNWJmYTViNzc2MWQyNWRjNzEiLCJpYXQiOjE0NzQ0MDI5NjYxOTF9.cbhBj-MRvygcq9cmEqC-RquM4CfF8sc7IDWa32kuvvY"
	}
};

const chineseCities = [
	"Beijing",
	"Shanghai",
	"Shenzhen",
	"Guangzhou",
	"Chengdu",
	"Hangzhou",
	"Hong Kong",
	"Tianjin",
	"Suzhou",
	"Chongqing"
];

const createObject = function(index) {
	let obj = {};
	obj.dr_name = "Doctor " + index;
	obj.office_name = "Doctor " + index + "'s Office";
	obj.address = chineseCities[index];
	obj.phone = "(928) 208-8961";
	obj.email = "dakota@1solutionapps.com";
	obj.featured = Boolean(Math.round(Math.random()));
	obj.main_image = "dr-wong.jpg";
	obj.about = "This is doctor " + index + "'s about me summary, our office is great!";
	obj.services = [
		"cleaning",
		"fillings",
		"root canals"
	];
	obj.hours = {
		"monday" : "8am - 6pm",
		"tuesday" : "8am - 6pm",
		"wednesday" : "8am - 6pm",
		"thursday" : "8am - 6pm",
		"friday" : "8am - 6pm",
		"saturday" : "8am - 6pm",
		"sunday" : "Closed"
	};
	obj.images = [
		"dr-wong-1.png",
		"dr-wong-2.png",
		"dr-wong-3.png"
	]
	return obj;
}

chineseCities.map(function(currentVal, index) {
	let obj = JSON.stringify(createObject(index));
	axios.post(dentistURL, obj, authHeader)
	.then((res) => {
		if(res.data.error) {
			console.log('error: ', res.data);
		} else {
			console.log('success: ', res.data.lat, res.data.lng);
		}
	})
	.catch((res) => {
		console.log('error: ', res.data);
	});
});