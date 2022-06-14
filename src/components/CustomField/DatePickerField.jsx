import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerField = (props) => {
  //! State
  const { field, form, label } = props;
  const { name, value, onBlur } = field || {};

  //! Function
  const handleChange = (value) => {
    form.setFieldValue(name, value);
  };

  //! Render
  return (
    <DatePicker
      label={label}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default DatePickerField;
