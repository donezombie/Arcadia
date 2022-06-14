import React from 'react';
import { CircularProgress as CircularProgressMUI } from '@mui/material';

const CircularProgress = (props) => {
  return <CircularProgressMUI size={24} {...props} />;
};

export default React.memo(CircularProgress);
