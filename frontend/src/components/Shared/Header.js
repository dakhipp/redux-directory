import React, { Component } from 'react';

class SearchBarHeader extends Component {
	render() {
    	return (
    		<div style={styles.headerContainer} className="gradient">
    			<img src="images/header.png" style={styles.header} />
			</div>
		)
	}
}	

const styles = {
	header: {
		display: 'block',
		width: '53%',
		margin: 'auto',
		paddingTop: '4%',
		paddingBottom: '4%',
	}
}

export default SearchBarHeader;