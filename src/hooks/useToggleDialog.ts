import { useCallback, useState } from 'react';

const useToggleDialog = () => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const toggle = useCallback(() => {
    setOpen(!open);
    setTimeout(() => {
      /**
       * Fix freeze bug - user cannot scroll
       */
      // Check if modal exist, remove class modal-open
      setClose(!close);
    }, 500);
  }, [open, close]);

  const shouldRender = open || close;

  return [open, toggle, shouldRender];
};

export default useToggleDialog;
