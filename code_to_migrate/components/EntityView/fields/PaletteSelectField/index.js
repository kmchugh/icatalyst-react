import React, {useMemo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/styles';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import colorbrewer from './colorBrewer';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(2)
    },
    select : {
    },
    colorSwatches : {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1
    },
    colorSwatch : {
      height: theme.spacing(1),
      width: theme.spacing(1),
      borderWidth: 'thin',
      borderColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1
    },
    menuItem : {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBottom: theme.spacing(1)
    },
  };
});

const PaletteSelectField = ({
  className,
  style = {},
  readonly = false,
  onChange,
  value,
  errors,
  field
})=>{
  const styles = useStyles();
  const theme = useTheme();

  const {
    id,
    required,
    label,
    autoFocus = false,
    description,
  } = field;

  const colors = useMemo(()=>{
    const palettes = {
      theme : {
        default : {
          3 : [
            theme.palette.primary.dark,
            theme.palette.primary.main,
            theme.palette.primary.light,
          ],
          6 : [
            theme.palette.primary.dark,
            theme.palette.primary.main,
            theme.palette.primary.light,
            theme.palette.secondary.dark,
            theme.palette.secondary.main,
            theme.palette.secondary.light,
          ]
        }
      },
      colorbrewer : colorbrewer,
    };
    return Object.keys(palettes).flatMap((paletteName)=>{
      return Object.keys(palettes[paletteName]).flatMap((paletteVariant)=>{
        return Object.keys(palettes[paletteName][paletteVariant]).flatMap((colorCount)=>{
          const colorValues = [...palettes[paletteName][paletteVariant][colorCount]];
          if (paletteName !== 'theme'){
            colorValues.reverse();
          }
          return {
            id : colorValues.join('|'),
            value : colorValues,
            label : `${paletteVariant}(${colorCount})`,
            paletteName : paletteName
          };
        });
      });
    });
  }, [theme]);

  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    if (value) {
      const selectedColor = colors.find((c)=>(c.id === value));
      if (selectedColor?.id !== selected?.id) {
        setSelected(selectedColor);
      }
    } else {
      setSelected(null);
    }
  }, [value]);

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={clsx(styles.root, className)}
      style={style}
      variant="outlined"
      fullWidth
      error={errors && errors.length > 0}
      required={required}
    >
      <Autocomplete
        id={id}
        name={id}
        value={selected}
        disabled={readonly}
        autoHighlight={true}
        autoSelect={true}
        freeSolo={false}
        className={clsx(styles.select)}
        fullWidth={true}
        options={colors}
        groupBy={(option)=>option.paletteName}
        getOptionLabel={(option)=>{
          return option.label;
        }}
        onChange={(e, item)=>{
          setSelected(item);
          onChange && onChange(null, {[field.id] : item.id});
        }}
        renderOption={(option) => {
          return (
            <div className={clsx(styles.menuItem)}>
              <Typography>{option.label}</Typography>
              <div className={clsx(styles.colorSwatches)}>
                {
                  option.value.map((color)=>{
                    return (
                      <div
                        className={clsx(styles.colorSwatch)}
                        key={`${option.id}_${color}`}
                        style={{
                          backgroundColor : color
                        }}
                      />
                    );
                  })
                }
              </div>
            </div>
          );
        }}
        renderInput={(params)=>{
          return (
            <TextField {...params}
              inputProps={{
                ...params.inputProps,
                value: params.inputProps.value
              }}
              error={hasErrors}
              label={label || 'test'}
              name={id}
              helperText={hasErrors ? errors[0] : description}
              required={required}
              autoFocus={autoFocus}
              variant="outlined" />
          );
        }}
      />
    </FormControl>
  );
};

PaletteSelectField.propTypes={
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
};

export default React.memo(PaletteSelectField);


export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'paletteselect';
  },
  getComponent : ()=>{
    return PaletteSelectField;
  }
};
