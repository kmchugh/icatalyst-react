import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Media from '../../Media';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      marginTop : theme.spacingNum(1),
      marginBottom : theme.spacingNum(2),
      display: 'flex',
      flexDirection: 'row',
      alignItems : 'center'
    },
    textField : {
      flexBasis: '70%',
      flexGrow: 1,
      marginRight: theme.spacingNum(2)
    },
    media : {
      flexBasis: '25%',
      flexGrow: 0,
      height: theme.spacingNum(10),
    }
  };
});

const MediaURIField = ({
  className,
  style = {},
  readonly = false,
  onChange,
  value,
  errors,
  field
})=>{
  const styles = useStyles();

  const {
    id,
    required,
    label,
    maxLength,
    autoFocus = false,
    description
  } = field;

  const [image, setImage] = useState(value || '');

  useEffect(()=>{
    if (value !== image) {
      setImage(value || '');
    }
  }, [value]);

  const hasErrors = errors && errors.length > 0;

  return (
    <div
      className={cxMui(styles.root, className)}
      style={style}
    >
      <TextField
        className={cxMui(styles.textField)}
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
          readOnly: readonly
        }}
        autoComplete="off"
        fullWidth
        variant="outlined"
        inputProps={{
          maxLength : maxLength
        }}
        onChange={(e)=>{
          setImage(e.target.value);
        }}
        multiline={false}
        rows={1}
        value={image}
      />
      <Media
        className={cxMui(styles.media)}
        src={image}
        onLoad={(e, source)=>{
          const updatedImage = source;
          if (value !== updatedImage) {
            onChange && onChange(null, {
              [field.id] : updatedImage
            });
          }
        }}
        onError={()=>{
          onChange && onChange(null, {
            [field.id] : null
          });
        }}
      />
    </div>
  );
};

MediaURIField.propTypes={
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

export default React.memo(MediaURIField);


export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'mediauri';
  },
  getComponent : ()=>{
    return MediaURIField;
  }
};
