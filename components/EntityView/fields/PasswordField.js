import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const PassWordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {readonly = false,
    onChange,
    value,
    errors, field} = props;

  const {
    id,
    required,
    label,
    autoFocus = false
  } = field;
  const displayValue = value || '';

  const hasErrors = errors && errors.length > 0;

  return (
    <TextField
      className={clsx('mt-8 mb-16', props.className)}
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      fullWidth
      value={field.format ? field.format(displayValue) : displayValue}
      error={hasErrors}
      name={id}
      onChange={onChange}
      required={required}
      autoFocus={autoFocus}
      autoComplete="off"
      InputProps={{
        readOnly: readonly,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      disabled={readonly}
    />
  );
};

PassWordField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onChange : PropTypes.func,
  readonly : PropTypes.bool,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired
};

export default React.memo(PassWordField);



export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'password';
  },
  getComponent : ()=>{
    return PassWordField;
  }
};



