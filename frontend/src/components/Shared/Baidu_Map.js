import React, { Component } from 'react';
import MapIcon from 'material-ui/svg-icons/maps/place';

class BaiduMap extends React.Component {
  
	constructor(props) {
	    super(props);
	    this.id = props.id || 'allmap';
	    this.lng = parseFloat(this.props.lng) || 116.404;
	    this.lat = parseFloat(this.props.lat) || 39.915;
	    this.point = new BMap.Point(this.lng, this.lat);
	    this.icon = new BMap.Icon(require('../../../images/pin.svg'), new BMap.Size(24, 24), {});
	 	this.marker = new BMap.Marker(this.point, {icon: this.icon});
	 	// console.log(this.lat)
	 	// console.log(this.lng)
	}

  	componentDidMount() {
	    this._map = new BMap.Map(this.id);
	    this._map.centerAndZoom(new BMap.Point(this.lat, this.lng), 5);
	    this._local = new BMap.LocalSearch(this._map, {
	    	renderOptions: { map: this._map }
	    });

	    // by address
	    // this._local.search('天安门广场');

	    // by lat lng
		this._map.addOverlay(this.marker); 
		this._map.panTo(this.point);
	}

  	render() {
    	return <div id={this.id} {...this.props}></div>;
  	}
}

export default BaiduMap;