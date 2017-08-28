import React, { Component } from 'react';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

export default class MyAccount extends Component {
	render() {
		return (
			<div>
				My Account
			</div>
	    );
	}
}

const styles = {
	appContainer: {
		opacity: '0',
	},
}
