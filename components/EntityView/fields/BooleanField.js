import React from 'react';
import {FormControl, FormControlLabel,
  FormHelperText, Checkbox} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    checkbox : {
      ['&.MuiCheckbox-colorPrimary.Mui-checked'] : {
        color: mostReadable(
          tinycolor(theme.palette.background.paper),
          [
            theme.palette.primary.light,
            theme.palette.primary.dark,
            theme.palette.primary.main,
          ]
        ).toHex8String()
      }
    }
  };
});

const BooleanField = (props) => {

  const styles = useStyles();

  const {readonly = false,
    onChange,
    value,
    errors, field} = props;

  const {
    id,
    required,
    label,
    autoFocus = false,
    labelPlacement = 'end',
    description
  } = field;

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={clsx(clsx(styles.root), props.className)}
      fullWidth
      variant="outlined"
      error={hasErrors}
      required={required}>

      <FormControlLabel
        labelPlacement={labelPlacement}
        disabled={readonly}
        control={
          <Checkbox
            className={clsx(styles.checkbox)}
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

      <FormHelperText error={hasErrors}>
        {hasErrors ? errors[0] : description}
      </FormHelperText>
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
