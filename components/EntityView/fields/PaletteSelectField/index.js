import React, {useMemo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTheme,styled} from '@mui/styles';
import clsx from 'clsx';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import colorbrewer from './colorBrewer';

const Root = styled(FormControl)(({ theme }) => ({
  marginTop : theme.spacingNum(1),
  marginBottom : theme.spacingNum(2)
}));

const AutocompleteStyle = styled(Autocomplete)(() => ({}));

const ColorSwatches = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1
}));

const ColorSwatch = styled('div')(({ theme }) => ({
  height: theme.spacingNum(1),
  width: theme.spacingNum(1),
  borderWidth: 'thin',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1
}));

const MenuItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingBottom: theme.spacingNum(1)
}));

const PaletteSelectField = ({
  className,
  style = {},
  readonly = false,
  onChange,
  value,
  errors,
  field
})=>{
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
    <Root
      className={clsx(className)}
      style={style}
      variant="outlined"
      fullWidth
      error={errors && errors.length > 0}
      required={required}
    >
      <AutocompleteStyle
        id={id}
        name={id}
        value={selected}
        disabled={readonly}
        autoHighlight={true}
        autoSelect={true}
        freeSolo={false}
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
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <MenuItem>
                <Typography>{option.label}</Typography>
                <ColorSwatches>
                  {
                    option.value.map((color)=>{
                      return (
                        <ColorSwatch
                          key={`${option.id}_${color}`}
                          style={{
                            backgroundColor : color
                          }}
                        />
                      );
                    })
                  }
                </ColorSwatches>
              </MenuItem>
            </li>
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
    </Root>
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
