import React, { useCallback } from 'react';

const useHandleSnackbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  return { open, handleClick, handleClose };
};

export default useHandleSnackbar;
