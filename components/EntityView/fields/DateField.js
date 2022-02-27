import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {FormControl, InputLabel, FormHelperText} from '@material-ui/core';
import {DatePicker, MuiPickersContext} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/styles';
import patchPicker from '@icatalyst/utilities/monkeyPatch_MUIPICKERS';
import moment from '@icatalyst/@moment';

const useStyles = makeStyles((theme) => {
  return {
    root : {
    },
    inputLabel : {
      backgroundColor : theme.palette.background.paper,
      paddingLeft: '.5em',
      paddingRight: '.5em'
    },
  };
});

const NEVER = 9223372036854776000;

const DateField = (props) => {

  const utils = useContext(MuiPickersContext);
  // Monkey patching until the date-picker v5 comes out, expected in ~Nov-Dec 2021
  patchPicker(utils, moment);

  const classes = useStyles();


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
      {
        showLabel && <InputLabel shrink={!!value} id={`${id}-label`} className={clsx(classes.inputLabel)}>
          {label}
        </InputLabel>
      }

      <DatePicker
        disabled={readonly}
        autoOk={true}
        value={value >= NEVER ? null : value}
        variant="inline"
        readOnly={readonly}
        inputVariant="outlined"
        autoFocus={autoFocus}
        onChange={(date)=>{
          onChange && onChange(null, {
            [id] : date.valueOf()
          });
        }}
        labelFunc={(date, invalid = '') => {
          return date ? date.toString() : invalid;
        }}
      />

      <FormHelperText error={hasErrors}>
        {hasErrors ? errors[0] : description}
      </FormHelperText>
    </FormControl>
  );
};

DateField.propTypes = {
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

export default DateField;

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'date';
  },
  getComponent : ()=>{
    return DateField;
  }
};
