import React from 'react';
import { Snackbar } from '@mui/material';

const SnackBar = ({ anchorOrigin, open, onClose, message, time }) => {
  return (
    <Snackbar open={open} autoHideDuration={time} anchorOrigin={anchorOrigin} onClose={onClose} message={message} />
  );
};

export default SnackBar;
