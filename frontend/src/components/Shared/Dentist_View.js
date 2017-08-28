import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import store from '../../store';
import { Provider } from 'react-redux';

import BaiduMap from './Baidu_Map';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// material ui icons
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import CallIcon from 'material-ui/svg-icons/communication/call';
import ApptIcon from 'material-ui/svg-icons/notification/event-note';

// native listener, used to prevent event bubbling
import NativeListener from 'react-native-listener';

// material ui provider and theme config
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../config/muiTheme';

// Transition animation libraries
import {spring} from 'react-motion';
import Transition from 'react-motion-ui-pack'

class DentistView extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	favorited: this.isFavorited()
	    }
	    this.onCall = this.onCall.bind(this);
	    this.onFavorite = this.onFavorite.bind(this);

	    this.dentistViewTarget = document.createElement('div');
		this.dentistViewTarget.className = 'dentist-view-dent';
		this.unmoutDOMElement = this.unmoutDOMElement.bind(this);
	}

	componentWillMount() {
		document.getElementsByTagName('body')[0].className = 'no-scroll';
		document.body.appendChild(this.dentistViewTarget);
		this._render();
	}

	componentDidUpdate() {
		this._render();
	}

	isFavorited() {
		return JSON.parse(localStorage.getItem("user")).favorite_ids.indexOf(this.props.params.dentistId) > -1;
	}

	onCall() {
		window.location.href = 'tel:'+this.props.selected.phone;
	}

	onAppt(email) {
		document.getElementsByTagName('body')[0].className = '';
		ReactDOM.unmountComponentAtNode(this.dentistViewTarget);
		document.body.removeChild(this.dentistViewTarget);
		browserHistory.push(`/appt-view/${email}`);
	}

	onFavorite() {
		this.props.toggleFavorite(this.props.selected._id);
		this.setState({
			favorited: !this.state.favorited
		});
	}

	unmoutDOMElement() {
		document.getElementsByTagName('body')[0].className = '';
		ReactDOM.unmountComponentAtNode(this.dentistViewTarget);
		document.body.removeChild(this.dentistViewTarget);
		browserHistory.goBack();
	}

	_render() {
		ReactDOM.render(
			<MuiThemeProvider muiTheme={muiTheme}>
				<Provider store={store}>
					<Transition
					  enter={{
					    opacity: spring(1, {stiffness: 327, damping: 30})
					  }}
					  leave={{
					  	opacity: 0
					  }}
					>
						<div key="dentist-view-dent" style={styles.modalContainer}>
							<div style={styles.imgCircleCont}>
								<div style={styles.imgCont}>
									<img style={styles.img} src={`../../../images/${this.props.selected.main_image}`} />
								</div>
								<div style={styles.circleBtnCont}>
									<FloatingActionButton 
									  onClick={this.onFavorite}
									  backgroundColor='#8756CC' 
									  style={styles.circleBtn}
									  iconStyle={ this.state.favorited ? styles.iconRed : styles.iconWhite }>
								    	<FavoriteIcon />
								    </FloatingActionButton>
								    <FloatingActionButton 
								      onClick={this.onCall}
								      backgroundColor='#8756CC' 
								      style={styles.circleBtn}>
								    	<CallIcon />
								    </FloatingActionButton>
								    <FloatingActionButton 
								      onClick={() => this.onAppt(this.props.selected.email)}
								      backgroundColor='#8756CC' 
								      style={styles.circleBtn}>
								    	<ApptIcon />
								    </FloatingActionButton>
								</div>
							</div>
							<div style={styles.mainCont}>
								<div style={styles.titleCont}>
									<h3 style={styles.inlineH3}>{this.props.selected.office_name}</h3>
									<NativeListener onClick={this.unmoutDOMElement}>
										<CloseIcon style={styles.closeIcon} />
									</NativeListener>
								</div>
								<div style={styles.mainInfoCont}>
									<p>{this.props.selected.phone}</p>
									<p>{this.props.selected.address}</p>
									<p><span>Mon</span> <span>8.00</span></p>
									<h4>About</h4>
									<p>{this.props.selected.about}</p>
								</div>
								<div style={styles.mapCont}>
									<BaiduMap id="location" style={{height: 250}} lat={this.props.selected.lat} lng={this.props.selected.lng} />
								</div>
							</div>
						</div>
					</Transition>
				</Provider>
			</MuiThemeProvider>,
			this.dentistViewTarget
		);
	}

	render() {
		return (
			<noscript />
		);
	}
}

const styles = {
	modalContainer: {
		position: 'fixed',
	    zIndex: '100',
	    top: '0',
	    right: '0',
	    bottom: '0',
	    background: 'rgba(0, 0, 0, 0.85)',
	    overflow: 'hidden',
	    width: '100%'
	},
	imgCircleCont: {
		position: 'absolute',
		top: '3%',
		width: '25%',
		left: '3%',
	},
	imgCont: {
		marginBottom: '1em',
	},
	iconWhite: {
		color: 'white',
		fill: 'white',
	},
	iconRed: {
		color: '#ff242d',
		fill: '#ff242d',
	},
	img: {
		display: 'block',
		width: '100%',
	},
	circleBtnCont: {
		width: '100%',
		textAlign: 'left',
	},
	circleBtn: {
		marginTop: '.75em',
		marginBottom: '.75em',
		background: 'none',
	},
	mainCont: {
		width: '77%',
		height: '100%',
		left: '20%',
		position: 'absolute',
		zIndex: '-1',
		top: '3%',
	},
	titleCont: {
		textAlign: 'left',
		paddingLeft: '15%',
	},
	inlineH3: {
		display: 'inline-block',
		color: 'white',
		width: '90%',
	},
	closeIcon: {
		verticalAlign: 'sub',
		fill: '#8756CC',
	},
	mainInfoCont: {
		background: 'white',
		borderTop: '6px solid #44DFBA',
	    paddingLeft: '15%',
	    paddingTop: '1em',
	    paddingBottom: '1em',
	    paddingRight: '1em',
	    textAlign: 'left',
	    minHeight: '40%',
	    maxHeight: '60%',
	    overflow: 'auto',
	}
}

function mapStateToProps(state) {
	return { selected: state.app.selected };
}

export default connect(mapStateToProps, actions)(DentistView);