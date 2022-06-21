import React, { Fragment } from 'react';
import { TextField } from '@mui/material';
import get from 'lodash/get';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.number,
  fullWidth: PropTypes.bool,
  maxLength: PropTypes.number,
  label: PropTypes.string,
  onKeyDown: PropTypes.func,
};

const InputField = (props) => {
  const { maxLength, type, label, disabled, onKeyDown, className, size, fullWidth = false, field, form } = props;
  const { onChange, onBlur, value, name } = field;
  const { errors, touched } = form || {};

  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);

  //! Render
  return (
    <Fragment>
      <TextField
        fullWidth={fullWidth}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        id={name}
        name={name}
        label={label}
        maxLength={maxLength}
        value={value}
        disabled={disabled}
        onKeyDown={onKeyDown}
        size={size}
        error={isTouched && !!errorMsg}
        helperText={isTouched && errorMsg}
      />
    </Fragment>
  );
};

InputField.propTypes = propTypes;

InputField.defaultProps = {
  type: 'text',
  tabIndex: '0',
  // value: '',
  width: null,
};

export default InputField;
