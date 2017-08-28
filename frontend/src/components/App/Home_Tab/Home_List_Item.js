import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import { browserHistory } from 'react-router';

import Checkbox from 'material-ui/Checkbox';
import CallIcon from 'material-ui/svg-icons/communication/call';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteIconBorder from 'material-ui/svg-icons/action/favorite-border';

import DentistView from '../../Shared/Dentist_View';

// stop propegation of events
import NativeListener from 'react-native-listener';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

class HomeListItem extends Component {
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
				<div className="dentistLIDetailsCont" style={styles.dentistLIDetailsCont}>
					<h3 style={styles.detailsOne}>{this.props.dentist.office_name}</h3>
					<NativeListener onClick={this.onCall}>
						<div>
							<CallIcon style={styles.phone} />
							<h4 style={styles.detailsTwo}>{this.props.dentist.phone}</h4>
						</div>
					</NativeListener>
					<NativeListener onClick={this.onFavorite.bind(this)}>
						<Checkbox
					      checkedIcon={<FavoriteIcon />}
					      uncheckedIcon={<FavoriteIconBorder />}
					      style={styles.radioButton}
					      iconStyle={{fill:'#8756CC'}}
					      checked={this.state.favorited}
					    />
					</NativeListener>
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
		position: 'relative',
		textAlign: 'left',
	},
	radioButton: {
		position: 'absolute',
		right: '5%',
	    textAlign: 'left',
	    width: '10%',
	    top: '35%',
	},
	phone: {
		display: 'inline-block',
		verticalAlign: 'bottom',
    	width: '2em',
    	marginRight: '.5em',
	},
	detailsOne: {
		fontSize: '22px',
	    marginTop: '5px',
	    marginBottom: '5px',
	},
	detailsTwo: {
		display: 'inline-block',
		fontSize: '16px',
    	marginTop: '5px',
    	marginBottom: '5px',
	},
}

export default connect(null, actions)(HomeListItem);