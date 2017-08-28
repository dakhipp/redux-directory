// style config for material ui
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme({
	palette: {
    	accent1Color: deepOrange500,
  	},
});

export default theme;