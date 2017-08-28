import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory } from 'react-router';

import IconHome from '../SVG_Icons/Icon_Home';
import IconSearch from '../SVG_Icons/Icon_Search';
import IconFavorite from '../SVG_Icons/Icon_Favorite';
import IconServices from '../SVG_Icons/Icon_Services';
import IconMore from '../SVG_Icons/Icon_More';

const BottomNav = React.createClass({
	getInitialState() {
		return {
			selectedIndex: 0
		}
	},

	onActiveChange(tab) {
		this.setState({selectedIndex: tab.props.index});
		browserHistory.push(tab.props.route);
	},
	
	render() {		
		return (
			<Tabs className="bottom-nav" styles="tabBackground" inkBarStyle={styles.selectedUnderline}>
			    <Tab
			      style={styles.tab}
			      icon={<IconHome myStyle={this.state.selectedIndex === 0 ? styles.selectedIcon : styles.defaultIcon} />}
			      route={'/app'}
			      onActive={this.onActiveChange}
			    />
			    <Tab
			      style={styles.tab}
			      icon={<IconSearch myStyle={this.state.selectedIndex === 1 ? styles.selectedIcon : styles.defaultIcon} />}
			      route={'/search'}
			      onActive={this.onActiveChange}
			    />
			    <Tab
			      style={styles.tab}
			      icon={<IconFavorite myStyle={this.state.selectedIndex === 2 ? styles.selectedIcon : styles.defaultIcon} />}
			      route={'/favorites'}
			      onActive={this.onActiveChange}
			    />
			    <Tab
			      style={styles.tab}
			      icon={<IconServices myStyle={this.state.selectedIndex === 3 ? styles.selectedIcon : styles.defaultIcon} />}
			      route={'/services'}
			      onActive={this.onActiveChange}
			    />
			    <Tab
			      style={styles.tab}
			      icon={<IconMore myStyle={this.state.selectedIndex === 4 ? styles.selectedIcon : styles.defaultIcon} />}
			      route={'/more'}
			      onActive={this.onActiveChange}
			    />
			</Tabs>
		)
	}
});

const styles = {
	tabBackground: {
		backgroundColor: '#11bfd2',
	},
	tab: {
		padding: 0,
	},
	selectedUnderline: {
		background: '#8756CC',
	},
	defaultIcon: {
      fill: '#fff',
    },
    selectedIcon: {
      fill: '#8756CC',
    },
}

export default BottomNav;
