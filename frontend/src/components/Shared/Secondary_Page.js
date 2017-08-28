import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// material ui provider and theme config
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../config/muiTheme';

import config from '../../config';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

export default function(ComposedComponent) {
	class ServiceView extends Component {
		constructor(props) {
		    super(props);
		    this.serviceViewTarget = document.createElement('div');
			this.serviceViewTarget.className = 'service-view';
			this.unmoutDOMElement = this.unmoutDOMElement.bind(this);
		}

		componentWillMount() {
			document.getElementsByTagName('body')[0].className = 'no-scroll';
			document.body.appendChild(this.serviceViewTarget);
			this._render();
		}

		componentDidUpdate() {
			this._render();
		}

		unmoutDOMElement() {
			document.getElementsByTagName('body')[0].className = '';
			ReactDOM.unmountComponentAtNode(this.serviceViewTarget);
			document.body.removeChild(this.serviceViewTarget);
			browserHistory.goBack();
		}

		_render() {
			ReactDOM.render(
				<MuiThemeProvider muiTheme={muiTheme}>
					<Transition
					  enter={{
					    right: spring(0, {stiffness: 300, damping: 30}),
					    opacity: spring(1, {stiffness: 250, damping: 30})
					  }}
					  leave={{
					  	right: -1000,
					  	opacity: 0
					  }}
					>
						<div style={styles.pageContainer} key="secondary-page">
							<div style={styles.topBar}>
								<div style={styles.backButton} onClick={this.unmoutDOMElement}>
									<p style={styles.backP}>Back</p>
								</div>
							</div>
							<ComposedComponent dentistEmail={this.props.params.email || null} />
						</div>
					</Transition>
				</MuiThemeProvider>,
				this.serviceViewTarget
			);
		}

		render() {
			return (
				<noscript />
			);
		}
	};

	return ServiceView;
}

const styles = {
	pageContainer: {
		position: 'fixed',
	    zIndex: '100',
	    top: '0',
	    right: '-100%',
	    bottom: '0',
	    background: 'white',
	    overflow: 'scroll',
	    width: '100%'
	},
	topBar: {
		display: 'flex',
		height: '55px',
		background: '#00bcd4',
		width: '100%',
		alignItems: 'center',
    	padding: '15px'
	},
	backP: {
		marginBottom: 0,
		color: 'white',
		fontFamily: 'Roboto, sans-serif',
		letterSpacing: '1.5px'
	}
}