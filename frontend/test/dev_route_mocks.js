var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
 
// This sets the mock adapter on the default instance 
var mock = new MockAdapter(axios);

mock
	.onPost('/login').replyOnce(500, {
		error: 'this is a mock fail'
	})
	.onPost('/login').reply(200, {
		token: 'adfadsfasdf565'
	});

mock
	.onPost('/register').replyOnce(500, {
		error: 'this is a mock fail'
	})
	.onPost('/register').reply(200, {
		token: 'adfadsfasdf565'
	});

mock.onGet('/featured').reply(200, {
	featured: [
		{
			id: '12',
			dr_name: 'featured dr. wong',
			office_name: 'Dr. Wong\'s Office fe',
			address: '123 fake st. china',
			phone: '(928) 208-8961',
			email: 'dakota@1solutionapps.com',
			featured: 'true',
			short_description: 'this is a short description. it needs to be 145 characters or less. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
			about: 'Dr Wong\'s office is a great dentist office.',
			lng: '116.30815063007148',
			lat: '40.056890127931279',
			main_img: 'dr-wong.jpg',
			imgs: [
				'dr-wong-1.png',
				'dr-wong-2.png',
				'dr-wong-3.png'
			],
			hours: {
				mon: '8am - 6pm',
				tue: '8am - 6pm',
				wed: '8am - 6pm',
				thur: '8am - 6pm',
				fri: '8am - 6pm',
				sat: '8am - 6pm',
				sun: 'Closed'
			},
			services: [
				'cleaning',
				'fillings',
				'root canals'
			],
			created_at: '1467219300623'
		},
		{
			id: '2',
			dr_name: 'featured dr. wong2',
			office_name: 'Dr. Wong\'s Office fe',
			address: '123 fake st. china',
			phone: '(928) 208-8961',
			email: 'dakota@1solutionapps.com',
			featured: 'true',
			short_description: 'this is a short description. it needs to be 145 characters or less. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
			about: 'Dr Wong\'s office is a great dentist office.',
			lat: '-106.333',
			lng: '-102.334',
			main_img: 'dr-wong.jpg',
			imgs: [
				'dr-wong-1.png',
				'dr-wong-2.png',
				'dr-wong-3.png'
			],
			hours: {
				mon: '8am - 6pm',
				tue: '8am - 6pm',
				wed: '8am - 6pm',
				thur: '8am - 6pm',
				fri: '8am - 6pm',
				sat: '8am - 6pm',
				sun: 'Closed'
			},
			services: [
				'cleaning',
				'fillings',
				'root canals'
			],
			created_at: '1467219300623'
		}
	]
});

mock.onGet('/dentists').reply(200, {
	dentists: [
		{
			id: '1',
			dr_name: 'dentist dr. wong',
			office_name: 'Dr. Wong\'s Office ser',
			address: '123 fake st. china',
			phone: '(928) 208-8961',
			email: 'dakota@1solutionapps.com',
			featured: 'false',
			short_description: 'this is a short description. it needs to be 145 characters or less. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
			about: 'Dr Wong\'s office is a great dentist office.',
			lat: '-106.333',
			lng: '-102.334',
			main_img: 'dr-wong.jpg',
			imgs: [
				'dr-wong-1.png',
				'dr-wong-2.png',
				'dr-wong-3.png'
			],
			hours: {
				mon: '8am - 6pm',
				tue: '8am - 6pm',
				wed: '8am - 6pm',
				thur: '8am - 6pm',
				fri: '8am - 6pm',
				sat: '8am - 6pm',
				sun: 'Closed'
			},
			services: [
				'cleaning',
				'fillings',
				'root canals'
			],
			created_at: '1467219300623'
		},
		{
			id: '234',
			dr_name: 'dentist dr. wong2',
			office_name: 'Dr. Wong\'s Office ser',
			address: '123 fake st. china',
			phone: '(928) 208-8961',
			email: 'dakota@1solutionapps.com',
			featured: 'false',
			short_description: 'this is a short description. it needs to be 145 characters or less. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
			about: 'Dr Wong\'s office is a great dentist office.',
			lat: '-106.333',
			lng: '-102.334',
			main_img: 'dr-wong.jpg',
			imgs: [
				'dr-wong-1.png',
				'dr-wong-2.png',
				'dr-wong-3.png'
			],
			hours: {
				mon: '8am - 6pm',
				tue: '8am - 6pm',
				wed: '8am - 6pm',
				thur: '8am - 6pm',
				fri: '8am - 6pm',
				sat: '8am - 6pm',
				sun: 'Closed'
			},
			services: [
				'cleaning',
				'fillings',
				'root canals'
			],
			created_at: '1467219300623'
		}
	]
});

mock.onGet('/favorites').reply(200, {
	favorites: [
		{
			id: '1',
			dr_name: 'fav dr. wong',
			office_name: 'Dr. Wong\'s Office fav',
			address: '123 fake st. china',
			phone: '(928) 208-8961',
			email: 'dakota@1solutionapps.com',
			featured: 'true',
			short_description: 'this is a short description. it needs to be 145 characters or less. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
			about: 'Dr Wong\'s office is a great dentist office.',
			lat: '-106.333',
			lng: '-102.334',
			main_img: 'dr-wong.jpg',
			imgs: [
				'dr-wong-1.png',
				'dr-wong-2.png',
				'dr-wong-3.png'
			],
			hours: {
				mon: '8am - 6pm',
				tue: '8am - 6pm',
				wed: '8am - 6pm',
				thur: '8am - 6pm',
				fri: '8am - 6pm',
				sat: '8am - 6pm',
				sun: 'Closed'
			},
			services: [
				'cleaning',
				'fillings',
				'root canals'
			],
			created_at: '1467219300623'
		},
		{
			id: '2',
			dr_name: 'fav dr. wong2',
			office_name: 'Dr. Wong\'s Office fav',
			address: '123 fake st. china',
			phone: '(928) 208-8961',
			email: 'dakota@1solutionapps.com',
			featured: 'false',
			short_description: 'this is a short description. it needs to be 145 characters or less. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
			about: 'Dr Wong\'s office is a great dentist office.',
			lat: '-106.333',
			lng: '-102.334',
			main_img: 'dr-wong.jpg',
			imgs: [
				'dr-wong-1.png',
				'dr-wong-2.png',
				'dr-wong-3.png'
			],
			hours: {
				mon: '8am - 6pm',
				tue: '8am - 6pm',
				wed: '8am - 6pm',
				thur: '8am - 6pm',
				fri: '8am - 6pm',
				sat: '8am - 6pm',
				sun: 'Closed'
			},
			services: [
				'cleaning',
				'fillings',
				'root canals'
			],
			created_at: '1467219300623'
		}
	]
});