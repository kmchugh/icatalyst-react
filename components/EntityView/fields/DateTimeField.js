import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {FormControl} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const NEVER = 9223372036854776000;

const DateTimeField = (props) => {

  const {readonly = false,
    onChange,
    value,
    errors,
    field,
    fullWidth = true
  } = props;

  const {
    id,
    required,
    label,
    autoFocus = false,
    showLabel = true,
    description
  } = field;

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      id={id}
      name={id}
      label={label}
      variant="outlined"
      fullWidth={fullWidth}
      error={hasErrors}
      required={required}
    >
      <DateTimePicker
        label={showLabel ? label : ''}
        value={(value >= NEVER || !value) ? null : dayjs(value)}
        variant="inline"
        readOnly={readonly}
        inputVariant="outlined"
        autoFocus={autoFocus}
        onChange={(date)=>{
          onChange && onChange(null, {
            [id] : date.valueOf()
          });
        }}
        labelFunc={(date, invalid = '') =>
          date ? date.toString() : invalid
        }
        slotProps={{
          textField: {
            helperText: hasErrors ? errors[0] : description,
            error: hasErrors,
          },
        }}
      />
    </FormControl>
  );
};

DateTimeField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
  fullWidth : PropTypes.bool
};

export default DateTimeField;

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'datetime';
  },
  getComponent : ()=>{
    return DateTimeField;
  }
};
