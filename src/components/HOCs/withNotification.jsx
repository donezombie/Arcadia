import { Alert, Snackbar } from '@mui/material';
import React, { Fragment } from 'react';

/**
 *
 * @param type
 * @returns success / error / warning / info / success
 */

const withNotification = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        type: 'success',
        message: '',
        vertical: 'top',
        horizontal: 'right',
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClick({ type = 'success', message = '' }) {
      this.setState({ open: true, message, type });
    }

    handleClose(event, reason) {
      if (reason === 'clickaway') {
        return;
      }

      this.setState({ open: false });
    }

    render() {
      const { vertical, horizontal, message, type, open } = this.state;

      return (
        <Fragment>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            anchorOrigin={{ vertical, horizontal }}
          >
            <Alert onClose={this.handleClose} severity={type} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
          <Component openNotification={this.handleClick} closeNotification={this.handleClose} {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withNotification;
