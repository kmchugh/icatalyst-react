import React from 'react';
import {TextField as NativeTextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    root : {
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(2)
    },
  };
});

const DateTimeField = (props) => {

  const classes = useStyles();

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

  const pad=(str, len)=>{
    str = str.toString();
    return str.length >= len ? str : new Array(len-str.length+1).join('0')+str;
  };

  const transform = (value)=>{
    if (!value) {
      return '';
    }

    let dateValue = value && value < 8640000000000000 ? value : null;
    if (dateValue) {
      const date = new Date(value);
      return isNaN(date.getFullYear()) ? '' :
        `${date.getFullYear()}-${pad(date.getMonth()+1, 2)}-${pad(date.getDate(), 2)}T${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}.${pad(date.getMilliseconds(), 3)}`;
    }
    return '';
  };

  return (<NativeTextField
    className={clsx(classes.root, props.className)}
    id={id}
    name={id}
    label={label}
    error={errors && errors.length > 0}
    helperText={errors && errors.join('/n')}
    required={required}
    autoFocus={autoFocus}
    InputProps={{
      readOnly: readonly,
    }}
    InputLabelProps={{
      shrink: true
    }}
    autoComplete="off"
    fullWidth
    type='datetime-local'
    variant="outlined"
    onChange={(e)=>{
      onChange({
        persist : e.persist,
        target : {
          name : name,
          type : 'datetime',
          value : e.target.value && e.target.value.length > 0 ?
            new Date(e.target.value).getTime() :
            null
        }
      });
    }}
    value={transform(value)}
  />);
};

DateTimeField.propTypes = {
  className : PropTypes.string,
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired
};

export default React.memo(DateTimeField);

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'datetime';
  },
  getComponent : ()=>{
    return DateTimeField;
  }
};
