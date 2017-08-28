import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import SearchIcon from 'material-ui/svg-icons/action/search';
import MapIcon from 'material-ui/svg-icons/maps/place';
import MyLocIcon from 'material-ui/svg-icons/maps/my-location';

// TODO
// render location suggestions

// TODO 
// handle clicks on suggested locations

// TODO
// update lists based on lat, lng, and address search

class SearchBar extends Component {
	constructor(props) {
	    super(props);
	    
	    this.state = {
	    	locationOpen: false,
	    	suggestionsOpen: false,
	    	currentLocIsSet: true,
	    	locationLabel: 'Current Location',
	    	locationInputVal: '',
	    	searchVal: ''
	    }

	    this.lat = null;
	    this.lng = null;
	    this.searchValue = '';

	    this.handleSearchClickInto = this.handleSearchClickInto.bind(this);
	    this.handleLocationClickInto = this.handleLocationClickInto.bind(this);
	    this.requestSearch = this.requestSearch.bind(this);
	    this.requestLocations = this.requestLocations.bind(this);
	    this.closeSearchOptions = this.closeSearchOptions.bind(this);
	    this.setCurrentLocation = this.setCurrentLocation.bind(this);
	    this.resetCurrentLocation = this.resetCurrentLocation.bind(this);
	    this.makeSearchCall = _.debounce(this.makeSearchCall, 800);
	    this.makeLocationCall = _.debounce(this.makeLocationCall, 800);
	}

	componentDidMount() {
		this.setCurrentLocation();
	}

	handleSearchClickInto() {
		this.setState({
			locationOpen: true,
			suggestionsOpen: false,
			locationInputVal: ''
		});
	}

	handleLocationClickInto() {
		this.setState({
			currentLocIsSet: false,
			suggestionsOpen: true,
		});
	}

	requestLocations(value) {	
		this.props.fetchLocations(value);
	}

	closeSearchOptions() {
		this.setState({
			locationOpen: false,
			suggestionsOpen: false,
		});
	}

	setCurrentLocation() {
		var _this = this;
		navigator.geolocation.getCurrentPosition(function(position) {
			_this.lat = position.coords.latitude;
			_this.lng = position.coords.longitude;
		});
		this.setState({
			suggestionsOpen: false,
			locationInputVal: '',
			locationLabel: 'Current Location'
		});
	}

	requestSearch() {
		if(this.lat && this.lng && this.searchValue) {
			if(this.props.page === "featured") {
				var query = `&lat=${this.lat}&lng=${this.lng}&office_name=${this.searchValue}`;
				this.props.fetchFeatured(query);
			} else if(this.props.page === "search") {
				var query = `?lat=${this.lat}&lng=${this.lng}&office_name=${this.searchValue}`;
				this.props.fetchDentists(query);
			} else if(this.props.page === "favorites") {
				var query = `?lat=${this.lat}&lng=${this.lng}&office_name=${this.searchValue}`;
				this.props.fetchFavorites(query);
			}
		}
		this.setState({
			locationOpen: false
		});
	}

	resetCurrentLocation() {
		this.setCurrentLocation();
		this.requestSearch();
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(e);
		this.searchSubmit(e.target.value);
	}

	searchSubmit(value) {
		this.makeSearchCall(value);
	}

	setGeo(key) {
		this.setState({
			currentLocIsSet: false,
			suggestionsOpen: false,
			locationInputVal: '',
			locationLabel: this.props.locations[key].name
		});
		this.lat = this.props.locations[key].location.lat;
		this.lng = this.props.locations[key].location.lng;
		this.requestSearch();
	}

	renderSearchSuggestions() {
		var _this = this;
		if(_.size(_this.props.locations) > 0) {
			return _.map(_this.props.locations, function(location, key) {
				return (
					<div style={_this.state.suggestionsOpen ? null : styles.hidden} key={key} onClick={() => _this.setGeo(key)}>
		    			<p style={styles.currentP}>
		    				{ location.name }
		    			</p>
		    			<Divider />
		    		</div>
				);
			});
		}
	}

	handleSearchChange(event) {
		this.makeSearchCall(event.target.value);
	}

	makeSearchCall(value) {
		this.searchValue = value;
		this.requestSearch();
	}

	handleLocationChange(event) {
		this.makeLocationCall(event.target.value);
	}

	makeLocationCall(value) {
		this.requestLocations(value);
	}

	render() {
		return (
			<div>
				<Paper zDepth={1} style={styles.feildContainer} >
					<div>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<SearchIcon style={styles.iconStyle} />
							<TextField 
								value={ this.state.searchVal }
							  hintText="Dr Wong Office" 
							  hintStyle={styles.input} 
							  inputStyle={styles.input}
							  underlineShow={false} 
							  onFocus={this.handleSearchClickInto} 
							  onChange={event => this.setState({searchVal: event.target.value})}
							  onKeyUp={this.handleSearchChange.bind(this)}
							/>
						</form>
		    			<Divider />
		    		</div>
		    		<div style={this.state.locationOpen ? null : styles.hidden} >
		    			<MapIcon style={styles.iconStyle} />
		    			<TextField 
		    			  value={ this.state.locationInputVal }
		    			  hintText={this.state.suggestionsOpen ? "Address" : this.state.locationLabel} 
		    			  hintStyle={this.state.suggestionsOpen ? styles.hintRegular : styles.hintPurple} 
						  	inputStyle={styles.input}
		    			  underlineShow={false} 
		    			  onFocus={this.handleLocationClickInto} 
		    			  onChange={ event => this.setState({locationInputVal: event.target.value}) }
		    			  onKeyUp={this.handleLocationChange.bind(this)}
		    			/>
		    			<Divider />
		    		</div>
		    		{ this.renderSearchSuggestions() }
		    		<div 
		    		  style={this.state.suggestionsOpen ? null : styles.hidden} 
		    		  onClick={this.resetCurrentLocation}>
		    			<MyLocIcon style={styles.iconStyle} />
		    			<p style={styles.currentP} >
		    				Current Location
		    			</p>
		    		</div>
	    		</Paper>
	    		<div 
	    		  style={this.state.locationOpen ? styles.clearOverlay : null} 
	    		  onClick={this.closeSearchOptions}
	    		>
	    		</div>
			</div>
		);
	}
}

const styles = {
	clearOverlay: {
		position: 'absolute',
		background: 'transparent',
		zIndex: '4',
		top: 0,
		left: 0, 
		bottom: 0,
		right: 0,
	},
	feildContainer: {
		position: 'absolute',
		zIndex: '5',
		left: '3%',
		width: '94%',
		margin: 'auto',
		marginTop: '-1.75em',
	},
	input: {
		marginLeft: '.5em',
	},
	hintRegular: {
		marginLeft: '.5em',
		color: 'rgba(0, 0, 0, 0.298039)',
	},
	hintPurple: {
		marginLeft: '.5em',
		color: '#8756cc',
    	textDecoration: 'underline',
	},
	currentP: {
		display: 'inline-block',
		padding: '1em',
    	marginBottom: '0',
    	paddingLeft: '.5em',
    	color: '#8756cc',
    	textDecoration: 'underline',
    	fontSize: '1.1em',
	},
	iconStyle: {
		verticalAlign: 'middle',
    	marginLeft: '.5em',
    	fill: '#8756cc',
	},
	hidden: {
		display: 'none',
	}
}

function mapStateToProps(state) {
	return { locations: state.app.locations };
}

export default connect(mapStateToProps, actions)(SearchBar);