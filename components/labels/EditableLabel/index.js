import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputLabel, TextField } from '@mui/material';
import { IconButton } from '@icatalyst/components';
import { getCleanText } from '@icatalyst/utilities/getCleanText';
import {RichTextEditor} from '@icatalyst/components';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles((theme) => ({
  root: {
    minHeight: theme.spacingNum(4),
    width: '100%',
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'center',

    ['& .edit'] : {
      visibility : 'hidden'
    },

    ['&:hover .edit'] : {
      visibility : 'unset'
    },
  },
  inherit: {
    font: 'inherit',
    color: 'inherit',
    lineHeight: 'inherit',
    cursor : 'text'
  },
  labelWrapper: {
    minHeight: theme.spacingNum(1),
    width: '100%',
    cursor: 'text'
  },
  editButton : {
    marginLeft : theme.spacingNum(1),
    ['& .material-icons'] : {
      fontSize: '1.8rem'
    }
  },
  ckeditor: {
    width: '100%'
  }
}));


const EditableLabel = ({
  value = '',
  multiline = false,
  onValueUpdated,
  richtext = false,
  dir = 'ltr',
  component,
  className,
  useEditButton,
  updateOnBlur,
  ...rest
}) =>{

  const classes = useStyles();
  const editorRef = useRef(null);
  const editorValue = useRef(value);

  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(()=>{
    if (getCleanText(value) !== editorValue.current) {
      editorValue.current = getCleanText(value);
      setUpdated(!updated);
    }
  }, [value]);


  useEffect(()=>{
    if (editable && editorRef.current) {
      editorRef.current.focus();
    }
  }, [editable]);

  const handleChange = (event) =>
  {
    event.stopPropagation();
    editorValue.current = event.target.value;
    setUpdated(!updated);
  };

  const handleFocusOut = (event) =>{
    editorValue.current = getCleanText(event.target.value);
    setEditable(false);
    onValueUpdated && onValueUpdated(editorValue.current);
  };

  const handleKeyDown = (event) =>
  {
    if (!multiline && event.key === 'Enter') {
      handleFocusOut();
    }
  };

  const Component = component || (
    <InputLabel
      classes={{
        root: classes.inherit
      }}
      className={cxMui(classes.label)}
    >
      {editorValue.current}
    </InputLabel>
  );


  const editableContent =
    richtext ? (
      <RichTextEditor
        value={value || ''}
        multiline={true}
        onChange={(e, text) => onValueUpdated(text)}
        className={cxMui(classes.ckeditor)}
        updateOnBlur = {updateOnBlur}
        {...rest}
      />
    ) : (
      <TextField
        InputProps={{
          classes: {
            root: classes.inherit
          },
          dir : dir
        }}
        ref={editorRef}
        className={cxMui(Component.props.className)}
        onBlur={handleFocusOut}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={editorValue.current}
        placeholder="Enter text..."
        multiline={multiline}
        rows={5}
        autoFocus={true}
        fullWidth={true}
      />
    );

  return (
    <div
      className={cxMui(classes.root,className)}
      onClick={!useEditButton ? ()=>(setEditable(true)) : null}
    >
      {
        (!editable && useEditButton) && (
          <IconButton
            className={cxMui(classes.editButton, 'edit')}
            title="edit"
            icon="edit"
            size="small"
            onClick={()=>(setEditable(true))}
          />
        )
      }

      {
        (editable && useEditButton) && (
          <IconButton
            className={cxMui(classes.editButton)}
            title="finish"
            icon="check"
            size="small"
          />
        )
      }
      {
        !editable && !richtext && (
          <div className={cxMui(classes.labelWrapper)}>
            {Component}
          </div>
        )
      }

      {
        richtext ? editableContent : editable && editableContent
      }


    </div>
  );
};

EditableLabel.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  component: PropTypes.node,
  multiline: PropTypes.bool,
  richtext: PropTypes.bool,
  onValueUpdated : PropTypes.func,
  dir : PropTypes.oneOf(['ltr', 'rtl']),
  useEditButton : PropTypes.bool,
  updateOnBlur : PropTypes.bool
};


export default EditableLabel;
