import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import _ from 'lodash';

import Checkbox from 'material-ui/Checkbox';
import CallIcon from 'material-ui/svg-icons/communication/call';
import ApptIcon from 'material-ui/svg-icons/notification/event-note';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';

import DentistView from './Dentist_View';

// stop propegation of events
import NativeListener from 'react-native-listener';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

class DentistListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: this.isFavorited()
		}
		this.onCall = this.onCall.bind(this);
		this.onFavorite = this.onFavorite.bind(this);
	}

	isFavorited() {
		return JSON.parse(localStorage.getItem("user")).favorite_ids.indexOf(this.props.dentist._id) > -1;
	}

	onFavorite(event) {
		event.stopPropagation();
		this.props.toggleFavorite(this.props.dentist._id);
		this.setState({
			favorited: !this.state.favorited
		});
	}

	onCall(event) {
		event.stopPropagation();
		window.location.href = 'tel:+1' + this.props.dentist.phone.replace(/[^0-9.]/g, "");
	}

	onAppt(id) {
		browserHistory.push(`/appt-view/${id}`);
	}

	onDentistClick(id) {
		browserHistory.push(`/dentist-view/${id}`);
	}

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
			<div className="dentistListItem" style={styles.dentistListItem} onClick={() => this.onDentistClick(this.props.dentist._id)} key={this.props.dentist._id}>
				<div className="dentistLIImageCont" style={styles.dentistLIImageCont}>
					<img src={'images/'+this.props.dentist.main_image} style={styles.image} />
				</div>
				<div className="dentistLIDetailsTopCont" style={styles.dentistLIDetailsCont}>
					<div className="dentistLIDetailsRow" style={styles.dentistLIDetailsRow}>
						<h3 style={styles.detailsOne}>{this.props.dentist.office_name}</h3>
						<NativeListener onClick={this.onFavorite.bind(this)}>
							<Checkbox
						      checkedIcon={<ActionFavorite />}
						      uncheckedIcon={<ActionFavoriteBorder />}
						      style={styles.radioButton}
						      iconStyle={{fill:'#8756CC'}}
						      checked={this.state.favorited}
						    />
						</NativeListener>
					</div>
					<div className="dentistLIDetailsRow" style={styles.dentistLIDetailsRow}>
						<p style={styles.noMarg}>{ this.props.dentist.address }</p>
					</div>
					<div className="dentistLIDetailsRow" style={styles.dentistLIDetailsRow}>
						<p style={Object.assign(styles.noMarg, styles.hoursP)}><span style={styles.spanLeft}>Hours:</span> <span style={styles.spanRight}>{this.props.dentist.hours.mon}</span></p>
					</div>
					<div className="dentistLIBtnRow" style={styles.dentistLIBtnRow}>
						<NativeListener onClick={this.onCall}>
							<RaisedButton 
				    		  label="Call" 
				    		  labelPosition="after"
				    		  backgroundColor="#8756CC" 
				    		  labelColor="#fff"
				    		  icon={<CallIcon />}
				    		/>
				    	</NativeListener>
				    	<NativeListener onClick={() => this.onAppt(this.props.dentist.email)}>
				    		<RaisedButton 
				    		  label="Appointment" 
				    		  labelPosition="after"
				    		  backgroundColor="#8756CC" 
				    		  labelColor="#fff"
				    		  icon={<ApptIcon />}
				    		/>
			    		</NativeListener>
					</div>
				</div>
			</div>
			</Transition>
		);
	}
}

var styles = {
	dentistListItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: '1em',
		marginBottom: '1em',
	},
	dentistLIImageCont: {
		width: '21%',
		margin: '3%'
	},
	image: {
		display: 'block',
		width: '100%',
	},
	dentistLIDetailsCont: {
		width: '70%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
		textAlign: 'left',
	},
	dentistLIDetailsRow: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
		textAlign: 'left',
	},
	dentistLIBtnRow: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: '5%',
		position: 'relative',
		textAlign: 'left',
		marginTop: '.5em',
		marginBottom: '.5em',
	},
	noMarg: {
		marginBottom: '0px',
	},
	hoursP: {
		width: '100%',
	},
	spanRight: {
		float: 'right',
    	marginRight: '5%',
	},
	radioButton: {
		display: 'inline-block',
		width: '10%',
		marginRight: '5%',
	},
	detailsOne: {
		fontSize: '22px',
	    marginTop: '5px',
	    marginBottom: '5px',
	    display: 'inline-block',
	    width: '80%',
	},
	detailsTwo: {
		fontSize: '16px',
    	marginTop: '5px',
    	marginBottom: '5px',
	},
}

export default connect(null, actions)(DentistListItem);