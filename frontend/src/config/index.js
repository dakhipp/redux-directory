var config = {
	ROOT_API_URL: '',
	ENV: 'dev'
}

if(config.ENV === 'dev') {
	config.ROOT_API_URL = 'http://localhost:3090';
} else if(config.ENV === 'test') {
	config.ROOT_API_URL = 'http://ec2-52-88-119-135.us-west-2.compute.amazonaws.com';
} else if(config.ENV === 'prod') {
	config.ROOT_API_URL = 'http://ec2-52-88-119-135.us-west-2.compute.amazonaws.com';
}

export default config; 