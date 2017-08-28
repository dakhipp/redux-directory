import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

// Transition animation libraries
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

export default class DialogExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.props.clearError();
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Try Again"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <Transition
        enter={{
          opacity: spring(1, {stiffness: 132, damping: 30})
        }}
        leave={{
          opacity: 0
        }}
      >
        <div key="error-box">
          <Dialog
            title={'Error:'}
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {this.props.errorMsg}
          </Dialog>
        </div>
      </Transition>
    );
  }
}
