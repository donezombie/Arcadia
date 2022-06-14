import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: 'none',
  },
}));

const NavLinkCustom = (props) => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <NavLink className={classes.root} {...rest}>
      {children}
    </NavLink>
  );
};

export default NavLinkCustom;
