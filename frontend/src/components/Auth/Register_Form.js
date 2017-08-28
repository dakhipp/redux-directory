import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { reduxForm } from 'redux-form';
import { registerUser, clearError } from '../../actions';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ErrorDialog from '../Shared/Error_Dialog';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

@connect(null, dispatch => ({
  registerUser: bindActionCreators(registerUser, dispatch),
  clearError: bindActionCreators(clearError, dispatch)
}))
export default class RegisterComponent extends Component {
  	render() {
		return (
			<RegisterForm onSubmit={(feilds) => { this.props.registerUser(feilds)}} clearError={this.props.clearError} />
		)
	}
}

@reduxForm({
  	form: 'register',
	fields: ['first_name', 'last_name', 'email', 'username', 'password', 'password_conf'],
  	validate
}, mapStateToProps)
class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.renderAlert = this.renderAlert.bind(this);
		this.goToLog = this.goToLog.bind(this);
	}

	renderAlert() {
		if(this.props.errorMessage) {
			return (
				<ErrorDialog errorMsg={this.props.errorMessage} clearError={this.props.clearError} />
			);
		}
	}

	goToLog() {
		this.props.clearError();
		browserHistory.push('/');
	}

	render() {
		const { handleSubmit, fields: { first_name, last_name, email, username, password, password_conf }} = this.props;

		return (
			<Transition
			  enter={{
			    opacity: spring(1, {stiffness: 132, damping: 30})
			  }}
			  leave={{
			  	opacity: 0
			  }}
			>
				<form style={styles.loginCont}  onSubmit={handleSubmit} key="register-form">
					<img src="images/form-top.png" style={styles.formHeader} />
					{ this.renderAlert() }
					<TextField
				      floatingLabelText="First Name"
				      errorText={first_name.touched ? first_name.error : ''}
				      className={(first_name.touched && first_name.error) ? 'shake' : ''}
				      inputStyle={styles.textInput}
				      floatingLabelStyle={styles.textPlaceholder}
				      floatingLabelFocusStyle={styles.textLabel}
				      underlineStyle={styles.underline}
				      underlineFocusStyle={styles.underlineFocus}
				      {...first_name}
				    />
				    <br />
				    <TextField
				      floatingLabelText="Last Name"
				      errorText={last_name.touched ? last_name.error : ''}
				      className={(last_name.touched && last_name.error) ? 'shake' : ''}
				      inputStyle={styles.textInput}
				      floatingLabelStyle={styles.textPlaceholder}
				      floatingLabelFocusStyle={styles.textLabel}
				      underlineStyle={styles.underline}
				      underlineFocusStyle={styles.underlineFocus}
				      {...last_name}
				    />
				    <br />
				    <TextField
				      floatingLabelText="Email"
				      errorText={email.touched ? email.error : ''}
				      className={(email.touched && email.error) ? 'shake' : ''}
				      inputStyle={styles.textInput}
				      floatingLabelStyle={styles.textPlaceholder}
				      floatingLabelFocusStyle={styles.textLabel}
				      underlineStyle={styles.underline}
				      underlineFocusStyle={styles.underlineFocus}
				      {...email}
				    />
				    <br />
		    		<TextField
				      floatingLabelText="Username"
				      errorText={username.touched ? username.error : ''}
				      className={(username.touched && username.error) ? 'shake' : ''}
				      inputStyle={styles.textInput}
				      floatingLabelStyle={styles.textPlaceholder}
				      floatingLabelFocusStyle={styles.textLabel}
				      underlineStyle={styles.underline}
				      underlineFocusStyle={styles.underlineFocus}
				      {...username}
				    />
				    <br />
		    		<TextField
				      floatingLabelText="Password"
				      type="password"
				      errorText={password.touched ? password.error : ''}
				      className={(password.touched && password.error) ? 'shake' : ''}
				      inputStyle={styles.textInput}
				      floatingLabelStyle={styles.textPlaceholder}
				      floatingLabelFocusStyle={styles.textLabel}
				      underlineStyle={styles.underline}
				      underlineFocusStyle={styles.underlineFocus}
				      {...password}
				    />
				    <br />
		    		<TextField
				      floatingLabelText="Password Confirmation"
				      type="password"
				      errorText={password_conf.touched ? password_conf.error : ''}
				      className={(password_conf.touched && password_conf.error) ? 'shake' : ''}
				      inputStyle={styles.textInput}
				      floatingLabelStyle={styles.textPlaceholder}
				      floatingLabelFocusStyle={styles.textLabel}
				      underlineStyle={styles.underline}
				      underlineFocusStyle={styles.underlineFocus}
				      {...password_conf}
				    />
		    		<br />
		    		<br />
		    		<RaisedButton 
		    		  label="Register" 
		    		  backgroundColor="#8756CC" 
		    		  labelColor="#fff"
		    		  type="submit"
		    		  style={styles.button}
		    		/>
		    		<br />
		    		<br />
		    		<RaisedButton 
		    		  label="Back To Login" 
		    		  backgroundColor="transparent" 
		    		  style={styles.button}
		    		  onClick={this.goToLog}
		    		/>
	    		</form>
    		</Transition>
		);
	}
}

function validate(formProps) {
	const errors = {};
	// first name
	if(!formProps.first_name) {
		errors.first_name = 'Please enter a first name';
	}
	// last name
	if(!formProps.last_name) {
		errors.last_name = 'Please enter a last name';
	}
	// email
	if(!formProps.email) {
		errors.email = 'Please enter an email';
	} else if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formProps.email)) {
		errors.email = 'Please enter a valid email address';
	}
	if(!formProps.username) {
		errors.username = 'Please enter a username'
	}
	// password and password/password conf match
	if(!formProps.password) {
		errors.password = 'Please enter an password';
	} else if(!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,24}$/.test(formProps.password)) {
		errors.password = 'Your password must be between 6 and 24 characters, contain at least 1 number, 1 letter, and 1 special character'
	} 
	// password conf
	if(!formProps.password_conf) {
		errors.password_conf = 'Please enter an password confirmation';
	} else if(formProps.password != formProps.password_conf) {
		errors.password_conf = 'Your password and password confirmation do not match';	
	}
	return errors;
}

function mapStateToProps(state) {
	return { errorMessage: state.error.error }
}

const styles = {
	loginCont: {
		position: 'absolute',
	    left: '50%',
	    marginTop: '15%',
	    transform: 'translateX(-50%)',
	    padding: '1.5rem 3.5rem 3rem 3.5rem',
	    backgroundSize: 'cover',
	    backgroundPosition: '0 -5px',
	    overflow: 'visible',
	    border: '1px solid #fff',
	    borderTop: '0',
	    opacity: 0
	},
	formHeader: {
		width: '100%',
		position: 'absolute',
		left: '0',
		top: '-1.9em',
	},
	textInput: {
		color: '#fff',
	},
	textPlaceholder: {
		color: 'rgba(255, 255, 255, 0.598039)',
	},
	textLabel: {
		color: '#fff',
	},
	underline: {
		borderColor: 'rgba(255, 255, 255, 0.598039)',
	},
	underlineFocus: {
		borderColor: '#fff',
	},
	button: {
		textAlign: 'center',
		color: '#fff',
		width: '100%',
	},
	toggleLabel: {
		color: '#fff',
	},
	toggle: {
    	marginBottom: '16',
  	},
}