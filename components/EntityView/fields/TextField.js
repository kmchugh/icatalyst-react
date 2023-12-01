import React from 'react';
import {TextField as NativeTextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const TextField = (props) => {

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
    description
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
    helperText={hasErrors ? errors[0] : description}
    required={required}
    autoFocus={autoFocus}
    InputProps={{
      readOnly: readonly
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
  field : PropTypes.object.isRequired
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