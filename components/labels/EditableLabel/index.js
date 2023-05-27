import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, TextField } from '@material-ui/core';
import { IconButton } from '@icatalyst/components';
import { cleanText } from 'utilities';
import {RichTextEditor} from '@icatalyst/components';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: theme.spacing(4),
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
    minHeight: theme.spacing(1),
    width: '100%',
    cursor: 'text'
  },
  editButton : {
    marginLeft : theme.spacing(1),
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
  useEditButton
}) =>{

  const classes = useStyles();
  const editorRef = useRef(null);
  const editorValue = useRef(value);

  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(()=>{
    if (cleanText(value) !== editorValue.current) {
      editorValue.current = cleanText(value);
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
    editorValue.current = cleanText(event.target.value);
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
      className={clsx(classes.label)}
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
        className={clsx(classes.ckeditor)}
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
        className={clsx(Component.props.className)}
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
      className={clsx(classes.root,className)}
      onClick={!useEditButton ? ()=>(setEditable(true)) : null}
    >
      {
        (!editable && useEditButton) && (
          <IconButton
            className={clsx(classes.editButton, 'edit')}
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
            className={clsx(classes.editButton)}
            title="finish"
            icon="check"
            size="small"
          />
        )
      }
      {
        !editable && !richtext && (
          <div className={clsx(classes.labelWrapper)}>
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
  useEditButton : PropTypes.bool
};


export default EditableLabel;
