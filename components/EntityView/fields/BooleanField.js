import React from 'react';
import {FormControl, FormControlLabel,
  FormHelperText, Checkbox} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const BooleanField = (props) => {

  const {readonly = false,
    onChange,
    value,
    errors, field} = props;

  const {
    id,
    required,
    label,
    autoFocus = false,
    labelPlacement = 'end'
  } = field;

  return (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      fullWidth
      variant="outlined"
      error={errors && errors.length > 0}
      required={required}>

      <FormControlLabel
        labelPlacement={labelPlacement}
        disabled={readonly}
        control={
          <Checkbox
            required={required}
            name={id}
            id={id}
            autoFocus={autoFocus}
            type="checkbox"
            checked={value || false}
            value={value || ''}
            onChange={onChange}
            color="primary"
            inputProps={{
              readOnly: readonly
            }}
          />
        }
        label={label}
      />

      <FormHelperText>{errors && errors.join('/n')}</FormHelperText>
    </FormControl>
  );
};

BooleanField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
  labelPlacement : PropTypes.oneOf(['start', 'end', 'top', 'bottom'])
};

export default React.memo(BooleanField);


export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'boolean';
  },
  getComponent : ()=>{
    return BooleanField;
  }
};
