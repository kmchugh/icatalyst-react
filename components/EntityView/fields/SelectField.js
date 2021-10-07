import React from 'react';
import {FormControl,
  InputLabel, FormHelperText} from '@material-ui/core';
import {Select as NativeSelectField} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import _ from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    inputLabel : {
      backgroundColor : theme.palette.background.paper,
      paddingLeft: '.5em',
      paddingRight: '.5em'
    },
    select : {
      textAlign : 'left'
    }
  };
});

const SelectField = (props) => {

  const classes = useStyles();

  const {readonly = false,
    onChange,
    value,
    errors, field} = props;

  const {
    id,
    required,
    label,
    options,
    description
  } = field;

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      variant="outlined"
      fullWidth
      error={hasErrors}
      required={required}
    >
      <InputLabel id={`${id}-label`} className={clsx(classes.inputLabel)}>
        {label}
      </InputLabel>

      <NativeSelectField
        className={clsx(classes.select)}
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={value || ''}
        onChange={(e)=>{
          if (e.target.value !== value) {
            onChange && onChange(e, value);
          }
        }}
        required={required}
        inputProps={{
          readOnly: readonly
        }}
      >
        {
          options.map((item) => {
            const {id, value = id, label = _.startCase(id)} = item;
            return (
              <MenuItem key={id} value={value}>
                {label}
              </MenuItem>
            );
          })
        }
      </NativeSelectField>

      <FormHelperText error={hasErrors}>
        {hasErrors ? errors[0] : description}
      </FormHelperText>

    </FormControl>
  );
};

SelectField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
};

export default React.memo(SelectField);

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'select';
  },
  getComponent : ()=>{
    return SelectField;
  }
};
