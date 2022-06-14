import React, { Fragment, useContext, useState } from 'react';
import { Typography } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { makeStyles } from '@mui/styles';
import ListItem from './ListItem';
import { MainContext } from 'context';
import { useGetFeatureList } from 'hooks/feature/useFeatureHooks';

//! Funcion
const useStyle = makeStyles((theme) => ({
  widthLayout: {
    display: 'block',
    [theme.breakpoints.not('lg')]: {
      display: 'none',
    },
  },
  hover: {
    '&:hover': {
      transition: '0.3s',
      color: 'red',
    },
  },
  active: {
    textDecoration: 'underline',
  },
}));

const SideBar = () => {
  //! State
  const classes = useStyle();
  const [arr, setArr] = useState([]);

  // !Context
  const { setItems } = useContext(MainContext);

  // !hooks
  const { data } = useGetFeatureList();

  //! Function
  const handleClick = (i) => {
    if (arr.includes(i)) {
      setArr([]);
    } else {
      setArr([i]);
    }
  };

  const handleGetAllCategories = () => {
    setItems(data);
    setArr([]);
  };

  //! Data
  const titleData = [
    {
      id: 3,
      title: 'Categories',
      content: [
        { id: 1, content: 'Blockchain Scanner ', icon: <CurrencyExchangeIcon fontSize="x-small" /> },
        { id: 2, content: 'Query NFT Token ', icon: <CurrencyExchangeIcon fontSize="x-small" /> },
        // { id: 3, content: 'Sales Navigator', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 4, content: 'Instagram', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 5, content: 'Twitter', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 6, content: 'Email', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 7, content: 'Facebook', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 8, content: 'Google', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 9, content: 'Quora', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 10, content: 'Medium', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 11, content: 'Pinterest', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 12, content: 'Reddit', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 13, content: 'Yellow Pages', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 14, content: 'YouTube', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 15, content: 'Slack', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 16, content: 'GitHub', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 17, content: 'Product Hunt', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 18, content: 'Craigslist', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 19, content: 'TikTok', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 20, content: 'Yell', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 21, content: 'Intercom', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 22, content: 'Integrations', icon: <InstagramIcon fontSize="x-small" /> },
        // { id: 23, content: 'Others', icon: <InstagramIcon fontSize="x-small" /> },
      ],
    },
  ];

  //! Render
  return (
    <>
      {/* <TextField
        className={classes.searchInput}
        sx={{ background: 'white' }}
        id="input-with-icon-textfield"
        fullWidth
        placeholder="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      /> */}
      <div className={classes.widthLayout}>
        {titleData.map((item) => {
          return (
            <Fragment key={item.id}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bolder',
                  color: 'black',
                  marginTop: '2rem',
                  marginBottom: '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={handleGetAllCategories}
              >
                {item.title}
              </Typography>
              {item.content.map((item, index) => {
                return <ListItem key={index} index={index} item={item} arr={arr} handleClick={handleClick} />;
              })}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;
