import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Image from '../../Image';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(2),
      display: 'flex',
      flexDirection: 'row',
      alignItems : 'center'
    },
    textField : {
      flexBasis: '70%',
      flexGrow: 1,
      marginRight: theme.spacing(2)
    },
    imageWrapper : {
      flexBasis: '25%',
      flexGrow: 0,
      height: theme.spacing(10),
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image : {
      borderRadius : theme.shape.borderRadius
    }
  };
});

const ImageURIField = ({
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
      className={clsx(styles.root, className)}
      style={style}
    >
      <TextField
        className={clsx(styles.textField)}
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
      <div
        className={clsx(styles.imageWrapper)}
      >
        <Image
          className={clsx(styles.image)}
          style={{
            height: '100%'
          }}
          src={image}
          onLoad={(e)=>{
            const updatedImage = e.target.src;
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
    </div>
  );
};

ImageURIField.propTypes={
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

export default React.memo(ImageURIField);


export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'imageuri';
  },
  getComponent : ()=>{
    return ImageURIField;
  }
};
