import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import ColorPicker from '../../../ColorPicker';
import FormControl  from '@material-ui/core/FormControl';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import FormHelperText  from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme)=>{
  return {
    root : {},
    disabledSwatchColor : ({value})=>{
      return {
        background: `none ${value || theme.palette.background.default}`
      };
    },
    disabledSwatch : {
      width: theme.spacing(3),
      height: theme.spacing(3),
      minWidth: theme.spacing(3),
      border: `0px solid ${theme.palette.divider}`,
      content: ' ',
      padding: 0,
      borderRadius: theme.spacing(0.5),
      backgroundSize : `${theme.spacing(1)} ${theme.spacing(1)}`,
      boxShadow: '0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)',
      backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
      marginRight : theme.spacing(1),
      cursor: 'default'
    }
  };
});

const ColorSelectField = ({
  className,
  style = {},
  readonly = false,
  onChange,
  value,
  errors,
  field
})=>{
  const styles = useStyles({
    value
  });

  const {
    id,
    required,
    label,
    labelPlacement = 'end',
    description
  } = field;

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={clsx(styles.root, className)}
      style={{...style}}
      fullWidth
      variant="outlined"
      error={hasErrors}
      required={required}
    >

      <FormControlLabel
        labelPlacement={labelPlacement}
        disabled={readonly}
        control={
          readonly ? (
            <div className={clsx(styles.disabledSwatch, styles.disabledSwatchColor)}>
            </div>
          ) : (
            <ColorPicker
              id={id}
              name={id}
              hideTextfield={true}
              value={value}
              disabled={true}

              required={true}
              autoFocus={true}

              onChange={(v)=>{
                onChange && onChange(null, {[field.id] : v});
              }}
            />
          )}
        label={label}
      />

      <FormHelperText error={hasErrors}>
        {hasErrors ? errors[0] : description}
      </FormHelperText>

    </FormControl>
  );
};

ColorSelectField.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
  labelPlacement : PropTypes.oneOf(['start', 'end', 'top', 'bottom'])
};

export default React.memo(ColorSelectField);


export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'colorselect';
  },
  getComponent : ()=>{
    return ColorSelectField;
  }
};
