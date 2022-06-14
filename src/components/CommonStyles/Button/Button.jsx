import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: `${theme.spacing(3)} !important`,
  },
  div: {
    width: theme.spacing(3),
  },
}));

const StyledButton = (props) => {
  const { children, style, ...rest } = props;
  const classes = useStyles();
  return (
    <LoadingButton {...rest} sx={{ ...style }} className={classes.root}>
      {children}
    </LoadingButton>
  );
};

export default StyledButton;
