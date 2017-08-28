import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Shared/Search_Bar_Header';
import SearchBar from '../../Shared/Search_Bar';
import ListContainer from '../../Shared/List_Container';
import FavoritesListItem from '../../Shared/Dentist_list_Item';

const FavoritesList = ListContainer(FavoritesListItem);

class FavoritesTab extends Component {
	render() {
    	return (
    		<div>
    			<Header />
    			<SearchBar page="favorites" />
	    		<FavoritesList dentists={this.props.favorites} />
    		</div>
    	);
  	}
}

function mapStateToProps(state) {
	return { favorites: state.app.favorites };
}

export default connect(mapStateToProps)(FavoritesTab);