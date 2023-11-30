import React,{useState} from 'react';
import {TextField as NativeTextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


const TextField = (props) => {
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
    maxLength,
    autoFocus = false,
    description,
    type
  } = field;

  const displayValue = value || '';

  const hasErrors = errors && errors.length > 0;

  return (<NativeTextField
    className={clsx('mt-8 mb-16', props.className)}
    id={id}
    name={id}
    label={label}
    error={hasErrors}
    // We are only showing the first error, so that less space is used
    // as the user fixes each error feedback is quick
    type= {type === 'string' || showPassword ? 'string' : 'password'}
    helperText={hasErrors ? errors[0] : description}
    required={required}
    autoFocus={autoFocus}
    InputProps={{
      readOnly: readonly,
      endAdornment: type === 'password' && (
        <InputAdornment position="end">
          <IconButton onClick={handleTogglePasswordVisibility} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )
    }}
    autoComplete="off"
    fullWidth
    variant="outlined"
    onChange={onChange}
    inputProps={{
      maxLength : maxLength
    }}
    multiline={maxLength>256}
    rows={Math.min(maxLength/256, 20) || 1}
    value={field.format ? field.format(displayValue) : displayValue}
    disabled={readonly}
  />);
};

TextField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
  type : PropTypes.string
};

export default React.memo(TextField);



export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'string';
  },
  getComponent : ()=>{
    return TextField;
  }
};
