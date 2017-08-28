import React, { Component } from 'react';
import BottomNav from './Bottom_Nav';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

export default class App extends Component {
	render() {
		return (
			<Transition
			  enter={{
			    opacity: spring(1, {stiffness: 132, damping: 30})
			  }}
			  leave={{
			  	opacity: 0
			  }}
			>
				<div style={styles.appContainer} key="app-container">
					{this.props.children}
		    		<BottomNav />
		    	</div>
		    </Transition>
	    );
	}
}

const styles = {
	appContainer: {
		opacity: '0',
	},
}
