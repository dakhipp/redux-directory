import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import areIntlLocalesSupported from 'intl-locales-supported';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['zh', 'zh-Hans-CN'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/zh');
  require('intl/locale-data/jsonp/zh-Hans-CN');
}

export default class Appt extends Component {
	render() {
		return (
			<div>
				<div style={styles.formContainer}>
					<p>Enter your requested date and time and we will get back to you shortly to let you know if that time is available.</p>
					<DatePicker
				      hintText="Date"
				      DateTimeFormat={DateTimeFormat}
				      okLabel="确定"
				      cancelLabel="取消"
				      locale="zh-Hans-CN"
				      textFieldStyle={styles.feildStyles}
				    />
				    <TimePicker
				      hintText="Time"
				      okLabel="确定"
				      cancelLabel="取消"
				      textFieldStyle={styles.feildStyles}
				    />
				    <RaisedButton 
		    		  label="Send Request" 
		    		  backgroundColor="#8756CC" 
		    		  labelColor="#fff"
		    		  type="submit"
		    		  style={styles.button}
		    		/>
				</div>
			</div>
	    );
	}
}

const styles = {
	formContainer: {
		width: '75%',
		margin: 'auto',
		marginTop: '1em',
	},
	feildStyles: {
		width: '100%',
	},
	button: {
		textAlign: 'center',
		color: '#fff',
		width: '100%',
		marginTop: '1em',
	},
}