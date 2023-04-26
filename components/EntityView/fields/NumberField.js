import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {TextField as NativeTextField} from '@material-ui/core';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const NumberField = (props) => {

  const {readonly = false,
    onChange,
    value,
    errors, field,
    className, style = {},
  } = props;

  const styles = useStyles();

  const {
    id,
    required,
    label,
    minValue = Number.MIN_VALUE,
    maxValue = Number.MAX_VALUE,
    step = 1,
    autoFocus = false,
    description
  } = field;

  const displayValue = value || '';

  const hasErrors = errors && errors.length > 0;

  return (<NativeTextField
    className={clsx('mt-8 mb-16', styles.root, className)}
    style={{...style}}
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
      readOnly: readonly,
    }}
    autoComplete="off"
    fullWidth
    variant="outlined"
    onChange={onChange}
    inputProps={{
      step: step,
      min: minValue,
      max: maxValue
    }}
    multiline={false}
    value={field.format ? field.format(displayValue) : displayValue}
    type="number"
    disabled={readonly}
  />);
};

NumberField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired
};

export default React.memo(NumberField);



export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'number';
  },
  getComponent : ()=>{
    return NumberField;
  }
};
