import React, { Component } from 'react';

import _ from 'lodash';

import CircularProgress from 'material-ui/CircularProgress';

export default function(ComposedComponent) {
	class ListContainer extends React.Component {
		renderLoading() {
			return (
				<CircularProgress size={1.5} />
			);
		}

		renderListItems() {
			if(_.size(this.props.dentists) > 0) {
				return _.map(this.props.dentists, function(dentist, key) {
					return <ComposedComponent dentist={dentist} key={dentist._id} />
				});
			} else {
				return <div></div>
			}
		}

		render() {
			return (
				<div style={styles.dentistListContainer}>
					{ 	
						typeof this.props.dentists !== "undefined" ? this.renderListItems() : this.renderLoading() 
					}
				</div>
			);
		}
	};

	return ListContainer;
}


var styles = {
	dentistListContainer: {
		minHeight: '100%',
		marginTop: '2em',
		textAlign: 'center',
		paddingBottom: '3em'
	},
}