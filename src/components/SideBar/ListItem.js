import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { MainContext } from 'context';
import { useGetFeatureList } from 'hooks/feature/useFeatureHooks';

//!Style
const useStyle = makeStyles((theme) => ({
  hide: {
    textDecoration: 'none',
  },
  categoriesText: {
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
}));

const ListItem = ({ item, index, handleClick, arr }) => {
  //!State
  const classes = useStyle();

  // !hook
  const { data, isError, isLoading } = useGetFeatureList();
  console.log('data', data);

  // !Context
  const { setItems, items } = useContext(MainContext);

  // !Function
  const handleFilter = async () => {
    !isLoading && setItems([data[index]]);
  };

  if (isLoading) return 'loading';

  //!Render
  return (
    <>
      <div onClick={handleFilter}>
        <p className={classes.categoriesText}>
          <span>{item.icon}</span>
          <span
            style={{ marginLeft: '0.5rem', color: arr.includes(item.id) ? 'blue' : '' }}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(item.id)}
          >
            {item.content}
          </span>
        </p>
      </div>
    </>
  );
};

export default ListItem;
