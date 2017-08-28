import React, { Component } from 'react';

import Header from '../../Shared/Header';
import ServiceView from './Service_View';

import RaisedButton from 'material-ui/RaisedButton';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

export default class ServicesTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
		this.openService = this.openService.bind(this);
		this.closeService = this.closeService.bind(this);
	}

	openService() {
		console.log(this.state.open)
		this.setState({
			open: true
		});
	}

	closeService() {
		this.setState({
			open: false
		});
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
    		<div style={styles.listItem} key={this.props.service.id}>
				<div style={styles.imageContainer}>
					<img src={this.props.service.image} style={styles.image} />
				</div>
				<div style={styles.detailsContainer}>
					<h3 style={styles.headline}>{this.props.service.header}</h3>
					<p>{this.props.service.caption}</p>
					<RaisedButton
		    		  label={this.props.service.button_label} 
		    		  backgroundColor="#8756CC" 
		    		  labelColor="#fff"
		    		  onClick={this.openService}
		    		  style={styles.button}
		    		/>
				</div>
				{ this.state.open ? <ServiceView closeService={this.closeService} service={this.props.service} /> : null }
			</div>
			</Transition>
    	);
  	}
}

const styles = {
	listItem: {
		display: 'flex',
	},
	imageContainer: {
		width: '35%',
	    margin: '0 3%',
	    marginRight: '4%',
	    padding: '1em',
	    paddingBottom: '0',
    	paddingTop: '0',
	},
	image: {
		diplay: 'block',
		width: '100%',
	},
	detailsContainer: {
		width: '63%',
	    display: 'flex',
	    flexDirection: 'column',
	    justifyContent: 'center',
	},
	headline: {
		marginTop: '0',
	},
	button: {
		width: '75%',
	}
}