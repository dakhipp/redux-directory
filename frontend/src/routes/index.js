import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from '../store';
import { AUTH_USER  } from '../actions/types';

// import route callback handlers
import { onFeaturedEnter, onDentistsEnter, onFavoritesEnter, onDentistViewEnter } from './route-callbacks';

// Auth routes, requires auth or regiser when first opening the app if not already authed
import LogRegContainer from '../components/Auth/Index';
import LoginForm from '../components/Auth/Login_Form';
import RegForm from '../components/Auth/Register_Form';
import RequireAuth from '../components/Auth/Require_Auth';

// App tab routes
import AppContainer from '../components/App/Index';
import HomeTab from '../components/App/Home_Tab/Index';
import SearchTab from '../components/App/Search_Tab/Index';
import FavoritesTab from '../components/App/Favorites_Tab/Index';
import ServicesTab from '../components/App/Services_Tab/Index';
import MoreTab from '../components/App/More_Tab/Index';
import DentistView from '../components/Shared/Dentist_View';
import ApptViewContent from '../components/Shared/Appt_View';

import SecondaryPage from '../components/Shared/Secondary_Page';

import MyAccountContent from '../components/App/More_Tab/My_Account';
import AboutContent from '../components/App/More_Tab/About';
import NotificationsContent from '../components/App/More_Tab/Notifications';
import InformationContent from '../components/App/More_Tab/Information';
import SubmitContent from '../components/App/More_Tab/Submit';

const MyAccount = SecondaryPage(MyAccountContent);
const About = SecondaryPage(AboutContent);
const Notifications = SecondaryPage(NotificationsContent);
const Information = SecondaryPage(InformationContent);
const Submit = SecondaryPage(SubmitContent);
const Appt = SecondaryPage(ApptViewContent);

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../config/muiTheme';
// tap plugin for material ui
injectTapEventPlugin();

// get auth token from local storage and redirect accordingly 
const token = localStorage.getItem('token');
// if token is stored consider user signed in, it is checked on all api requests
if(token) {
	// update auth application state
	store.dispatch({ type: AUTH_USER });
	browserHistory.push('/app');
} else {
	browserHistory.push('/');
}

// Routes
export default (
	<MuiThemeProvider muiTheme={muiTheme}>
	  	<Provider store={store}>
			<Router history={browserHistory}>
			    <Route path={'/'} component={LogRegContainer}>
			    	<IndexRoute component={LoginForm} />
			    	<Route path={'/register'} component={RegForm} />
			    </Route>
			    <Route path={'/app'} component={RequireAuth(AppContainer)}>
			    	<IndexRoute component={HomeTab} onEnter={onFeaturedEnter} />
			    	<Route path={'/search'} component={SearchTab} onEnter={onDentistsEnter} />
			    	<Route path={'/favorites'} component={FavoritesTab} onEnter={onFavoritesEnter} />
			    	<Route path={'/services'} component={ServicesTab} />
			    	<Route path={'/more'} component={MoreTab}>
				    	<Route path={'/my-account'} component={MyAccount} />
				    	<Route path={'/about'} component={About} />
				    	<Route path={'/notifications'} component={Notifications} />
				    	<Route path={'/information'} component={Information} />
				    	<Route path={'/submit'} component={Submit} />
					</Route>
					<Route path={'/dentist-view/:dentistId'} component={DentistView} onEnter={onDentistViewEnter} />
					<Route path={'/appt-view/:email'} component={Appt} />
			    </Route>
			</Router>
	   	</Provider>
    </MuiThemeProvider>
);