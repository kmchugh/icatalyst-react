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
    autoFocus = false
  } = field;

  const displayValue = value || '';

  return (<NativeTextField
    className={clsx('mt-8 mb-16', props.className)}
    id={id}
    name={id}
    label={label}
    error={errors && errors.length > 0}
    helperText={errors && errors.join('/n')}
    required={required}
    autoFocus={autoFocus}
    InputProps={{
      readOnly: readonly
    }}
    autoComplete="off"
    fullWidth
    variant="outlined"
    onChange={onChange}
    multiline={maxLength>256}
    rows={Math.min(maxLength/256, 20) || 1}
    value={field.format ? field.format(displayValue) : displayValue}
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
