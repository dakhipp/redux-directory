import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Shared/Search_Bar_Header';
import SearchBar from '../../Shared/Search_Bar';
import ListContainer from '../../Shared/List_Container';
import HomeListItem from './Home_List_Item';

const HomeList = ListContainer(HomeListItem);

// TODO search and update listing

class HomeTab extends Component {
	render() {
    	return (
    		<div>
    			<Header />
    			<SearchBar page="featured" />
    			<HomeList dentists={this.props.featured} />
    		</div>
    	);
  	}
}

function mapStateToProps(state) {
	return { featured: state.app.featured };
}

export default connect(mapStateToProps)(HomeTab);