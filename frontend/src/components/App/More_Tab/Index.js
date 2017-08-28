import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import Header from '../../Shared/Header';

import MyAccountIcon from 'material-ui/svg-icons/social/person';
import AboutIcon from 'material-ui/svg-icons/social/location-city';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import ShareIcon from 'material-ui/svg-icons/social/share';
import SubmitDentistIcon from 'material-ui/svg-icons/hardware/keyboard';
import InformationIcon from 'material-ui/svg-icons/action/language';
import LogOutIcon from 'material-ui/svg-icons/action/exit-to-app';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

class MoreTab extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
 		this.props.logoutUser();
 	}

 	onPageClick(route) {
		browserHistory.push(`/${route}`);
	}

	onShare() {
		window.location.href = 'appshare://apps';
	}

	render() {
    	return (
    		<div>
    			<Header />
		    	<Transition
				  enter={{
				    opacity: spring(1, {stiffness: 132, damping: 30})
				  }}
				  leave={{
				  	opacity: 0
				  }}
				>
					<div style={styles.buttonContainer} key="more-list">
						<div
			      		   onClick={() => this.onPageClick(`my-account`)}
						   style={Object.assign(styles.colorOne, styles.moreBtn)} 
						>
							<MyAccountIcon style={styles.iconStyles} />
							<p style={styles.buttonLabel}>My Account</p>
						</div>
						<div 
						  onClick={() => this.onPageClick(`about`)}
						  style={Object.assign(styles.colorTwo, styles.moreBtn)}>
							<AboutIcon style={styles.iconStyles} />
							<p style={styles.buttonLabel}>About</p>
						</div>
						<div 
						  onClick={() => this.onPageClick(`notifications`)}
						  style={Object.assign(styles.colorThree, styles.moreBtn)}>
							<NotificationsIcon style={styles.iconStyles} />
							<p style={styles.buttonLabel}>Notifications</p>
						</div>
						<div 
						  onClick={this.onShare}
						  style={Object.assign(styles.colorFour, styles.moreBtn)}>
							<ShareIcon style={styles.iconStyles} />
							<p style={styles.buttonLabel}>Share</p>
						</div>
						<div 
 						  onClick={() => this.onPageClick(`information`)}
						  style={Object.assign(styles.colorThree, styles.moreBtn)}>
							<InformationIcon style={styles.iconStyles} />
							<p style={styles.buttonLabel}>Information</p>
						</div>
						<div 
 						  onClick={() => this.onPageClick(`submit`)}
						  style={Object.assign(styles.colorTwo, styles.moreBtn)}>
							<SubmitDentistIcon style={styles.iconStyles} />
							<p style={styles.buttonLabel}>Submit Dentist Office</p>
						</div>
						<div 
						  style={Object.assign(styles.colorOne, styles.moreBtn)} 
						  onClick={this.logout} 
						>
							<LogOutIcon style={styles.iconStyles} />
							<p style={styles.buttonLabel}>Log Out</p>
						</div>
					</div>
    			</Transition>
    			{this.props.children}
    		</div>
    	);
  	}
}

const styles = {
	buttonContainer: {
		paddingBottom: '3em',
	},
	moreBtn: {
		padding: '1.15em',
		display: 'flex',
		alignItems: 'center',
	},
	iconStyles: {
		display: 'inline-block',
		margin: '.5em',
		width: '2.5em',
		height: '2.5em',
		marginLeft: '1em',
	},
	buttonLabel: {
		display: 'inline-block',
		margin: '0',
		paddingLeft: '1.5em',
		fontSize: '1.65em',
	},
	colorOne: {
		background: '#F9F9F9',
	},
	colorTwo: {
		background: '#BCCBDE',
	},
	colorThree: {
		background: '#C2DDE6',
	},
	colorFour: {
		background: '#8756CC',
	}
}

export default connect(null, actions)(MoreTab);