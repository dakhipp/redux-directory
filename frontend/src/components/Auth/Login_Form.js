import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { reduxForm } from 'redux-form';
import { loginUser, clearError } from '../../actions';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toggle } from 'redux-form-material-ui'

import ErrorDialog from '../Shared/Error_Dialog';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

@connect(null, dispatch => ({
  loginUser: bindActionCreators(loginUser, dispatch),
  clearError: bindActionCreators(clearError, dispatch)
}))
export default class LoginComponent extends Component {
  	render() {
		const myInitialValues = {
	      initialValues: {
	        username: localStorage.getItem('username') || '',
	        toggled: localStorage.getItem('toggled') || false
	      }
	    }

		return (
			<LoginForm {...myInitialValues}  onSubmit={(feilds) => { this.props.loginUser(feilds) }} clearError={this.props.clearError} />
		)
	}
}

@reduxForm({
	form: 'loginForm',
  	fields: ['username', 'password', 'toggled'],
  	validate
}, mapStateToProps)
class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.renderAlert = this.renderAlert.bind(this);
		this.goToReg = this.goToReg.bind(this);
	}

	renderAlert() {
		if(this.props.errorMessage) {
			return (
				<ErrorDialog errorMsg={this.props.errorMessage} clearError={this.props.clearError} />
			);
		}
	}

	clearError() {
		this.props.clearError();
	}

	goToReg() {
		this.props.clearError();
		browserHistory.push('/register');
	}

	render() {
		const { handleSubmit, clearError, fields: { username, password, toggled }} = this.props;

		return (
			<Transition
			  enter={{
			    opacity: spring(1, {stiffness: 132, damping: 30})
			  }}
			  leave={{
			  	opacity: 0
			  }}
			>
				<form onSubmit={handleSubmit} style={styles.loginCont} key="login-form">
					<img src="images/form-top.png" style={styles.formHeader} />
					{this.renderAlert()}
		    		<TextField
		    		  currentValue={{val: username.value}}
		    		  floatingLabelText="Username"
		    		  errorText={username.touched ? username.error : ''}
		    		  className={(username.touched && username.error) ? 'shake' : ''}
				      inputStyle={styles.textInput}
				      floatingLabelStyle={styles.textPlaceholder}
				      floatingLabelFocusStyle={styles.textLabel}
				      underlineStyle={styles.underline}
				      underlineFocusStyle={styles.underlineFocus}
				      { ...username }
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
				      { ...password }
				    />
		    		<br />
		    		<br />
		    		<Toggle
		    		  currentValue={{val: true}}
		    		  type='checkbox'
		    		  value={this.props.toggled || localStorage.getItem('remember')}
		    		  toggled={this.props.toggled || localStorage.getItem('remember')}
				      label="Remember your username?"
				      labelPosition="right"
				      labelStyle={styles.toggleLabel}
				      thumbStyle={styles.toggleThumb}
				      trackStyle={styles.toggleTrack}
				      style={styles.toggle}
				      onToggle={() => this.props.toggled = !this.props.toggled }
				      { ...toggled }
				    />
		    		<RaisedButton 
		    		  label="Sign In" 
		    		  backgroundColor="#8756CC" 
		    		  labelColor="#fff"
		    		  type="submit"
		    		  style={styles.button}
		    		/>
		    		<br />
		    		<br />
		    		<RaisedButton 
		    		  label="Register" 
		    		  backgroundColor="transparent" 
		    		  style={styles.button}
		    		  onClick={this.goToReg}
		    		/>
	    		</form>
    		</Transition>
		);
	}
}

function validate(formProps) {
	const errors = {};
	// username
	if(!formProps.username) {
		errors.username = 'Enter a username';
	} 
	// pass
	if(!formProps.password) {
		errors.password = 'Enter a password';
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
	    opacity: '0'
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
	toggleThumb: {
		backgroundColor: 'white',
	},
	toggleTrack: {
		backgroundColor: 'rgba(255,255,255,0.75)',
	},
	toggle: {
    	marginBottom: '16',
  	},
}