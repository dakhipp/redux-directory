import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Shared/Search_Bar_Header';
import SearchBar from '../../Shared/Search_Bar';
import ListContainer from '../../Shared/List_Container';
import SearchListItem from '../../Shared/Dentist_list_Item';

const SearchList = ListContainer(SearchListItem);

// TODO search and update listing

class SearchTab extends Component {
	render() {
    	return (
    		<div>
    			<Header />
    			<SearchBar page="search" />
	    		<SearchList dentists={this.props.dentists} />
    		</div>
    	);
  	}
}

function mapStateToProps(state) {
	return { dentists: state.app.dentists };
}

export default connect(mapStateToProps)(SearchTab);