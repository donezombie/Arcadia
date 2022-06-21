import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import get from 'lodash/get';

const AutocompleteField = ({ field, form, ...props }) => {
  //! State
  const { onBlur, value, name } = field;
  const { errors, touched } = form || {};

  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);

  //! Function
  const onChange = (_, selection) => {
    form.setFieldValue(name, selection);
  };

  //! Render
  return (
    <Autocomplete
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={isTouched && !!errorMsg}
      helperText={isTouched && errorMsg}
      renderInput={(params) => (
        <TextField
          label={props.label}
          value={value}
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          error={isTouched && !!errorMsg}
          helperText={isTouched && errorMsg}
        />
      )}
      {...props}
    />
  );
};

export default AutocompleteField;
