import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { checkAuth } from '../../actions/index';

import config from '../../config';

const styles = {
	loginBg: {
		position: 'absolute',
		minHeight: '100%',
	    width: '100%',
	    overflow: 'overlay',
	    backgroundSize: 'contain',
	}
}

class LogRegContainer extends Component {
  	render() {
		return (
			<div style={styles.loginBg} className="gradient">
    			{this.props.children}
    		</div>
    	)
  	}
}

export default LogRegContainer;