import React, { Component } from 'react';
import _ from 'lodash';

import Header from '../../Shared/Header';
import ServiceListItem from './Service_List_Item';

import RaisedButton from 'material-ui/RaisedButton';

export default class ServicesTab extends Component {
	renderServicesList() {
    	return _.map(services, function(service, key) {
			return <ServiceListItem service={service} key={service.id} />
		});	
	}

	render() {
    	return (
    		<div>
    			<Header />
    			<div style={styles.listContainer}>
    				{ this.renderServicesList() }
    			</div>
    		</div>
    	);
  	}
}

const styles = {
	listContainer: {
		paddingBottom: '4em',
	},
}

const services = [
	{
		'id': '1',
		'image': 'images/services_1braces.png',
		'header': 'Sample Header',
		'caption': 'Sample Caption',
		'button_label': 'Button Label',
		'button_link': 'tempLink'
	},
	{
		'id': '2',
		'image': 'images/services_2implants.png',
		'header': 'Sample Header',
		'caption': 'Sample Caption',
		'button_label': 'Button Label',
		'button_link': 'tempLink'
	},
	{
		'id': '3',
		'image': 'images/services_3restoration.png',
		'header': 'Sample Header',
		'caption': 'Sample Caption',
		'button_label': 'Button Label',
		'button_link': 'tempLink'
	},
	{
		'id': '4',
		'image': 'images/services_4periodontal.png',
		'header': 'Sample Header',
		'caption': 'Sample Caption',
		'button_label': 'Button Label',
		'button_link': 'tempLink'
	},
	{
		'id': '5',
		'image': 'images/services_5hardtissue.png',
		'header': 'Sample Header',
		'caption': 'Sample Caption',
		'button_label': 'Button Label',
		'button_link': 'tempLink'
	},
	{
		'id': '6',
		'image': 'images/services_6surgery.png',
		'header': 'Sample Header',
		'caption': 'Sample Caption',
		'button_label': 'Button Label',
		'button_link': 'tempLink'
	},
	{
		'id': '7',
		'image': 'images/services_7childrencare.png',
		'header': 'Sample Header',
		'caption': 'Sample Caption',
		'button_label': 'Button Label',
		'button_link': 'tempLink'
	}
];