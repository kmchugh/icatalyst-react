import React, {useEffect, useRef, useImperativeHandle, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-balloon';
// import _ from '@icatalyst/@lodash';
import _ from '../../@lodash/@lodash';

// Uncomment this to quickly see a list of plugins
// console.log(Editor.builtinPlugins.map( plugin => plugin.pluginName ));

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      // width: 'auto',
      ['& .ck'] : {
        minHeight: 'inherit'
      },
      ['& .ck.ck-editor__editable_inline>:last-child'] : {
        marginTop: 0,
        marginBottom: 0
      },
      ['& .ck.ck-editor__editable_inline>:first-child'] : {
        marginBottom: 0,
        marginTop: 0,
      },
      ['& .ck.ck-editor__editable:not(.ck-editor__nested_editable).ck-focused'] : {
        border: 'none!important',
        boxShadow: 'none!important'
      }
    },
    rows : ({
      rows
    })=>{
      return {
        minHeight: theme.spacing(rows*2.1)
      };
    },
    multiline : ({
      multiline
    })=>{
      return !multiline ? {
        ['& .ck.ck-editor__editable_inline'] : {
          overflow: 'hidden'
        }
      } : {};
    }
  };
});

const RichTextEditor = (
  {
    className,
    onChange,
    value,
    multiline = true,
    // readonly = false,
    // variant = 'contained',
    config = {},
    rows = 5,
    debounce = 750,
    ...rest
  }
)=>{
  const styles = useStyles({
    rows,
    multiline
  });
  const editorRef = useRef(null);
  const valueRef = useRef(value);
  const [pendingUpdate, setPendingUpdate] = useState(null);

  useImperativeHandle(rest.inputRef, ()=>{
    return {
      focus : ()=>{
      },
      value : valueRef.current
    };
  });

  useEffect(()=>{
    if (editorRef.current) {
      if (value !== editorRef.current.getData() && value !== pendingUpdate) {
        editorRef.current.setData(value || '');
      }
    }
  }, [value]);

  const derivedConfig = useMemo(()=>{
    return _.merge({
      // By default remove the following plugins
      removePlugins : [
        'CKFinder',
        'CKFinderUploadAdapter',
        'CloudServices',
        'EasyImage',
        'ImageUpload',
        'TableToolbar',
        'Table'
      ],
      toolbar : {
        removeItems : [
          'uploadImage',
          'insertTable'
        ]
      }
    }, !multiline ? {
      toolbar: ['bold', 'italic'],
      restrictedEditing: {
        allowedCommands: ['bold', 'italic'],
        allowedAttributes: []
      }
    } : {}, config);
  }, [config]);

  const updateContent = useMemo(()=>{
    return _.debounce((e, value)=>{
      setPendingUpdate(value);
      onChange && onChange(e, value);
    }, debounce);
  }, [onChange, debounce]);

  return (
    <div className={clsx(
      styles.root,
      styles.rows,
      styles.multiline,
      className
    )}>
      <CKEditor
        {...rest}
        editor={Editor}
        data={value}
        isReadOnly={true}
        onReady={(editor)=>{
          editorRef.current = editor;
          editor.setData(value || '');
        }}
        onChange={
          (e, editor)=>{
            const v = editor.getData();
            valueRef.current = v;
            if (v !== value) {
              const isEmpty = !v || v.trim() === '';
              if (v !== pendingUpdate) {
                updateContent(e, isEmpty ? null : v);
              }
            }
          }
        }
        config={derivedConfig}
      />
    </div>
  );
};

RichTextEditor.displayName = 'RichTextEditor';
RichTextEditor.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onChange : PropTypes.func.isRequired,
  onBlur : PropTypes.func,
  onFocus : PropTypes.func,
  value : PropTypes.string,
  multiline : PropTypes.bool,
  readonly : PropTypes.bool,
  variant : PropTypes.oneOf([
    'inline',
    'contained'
  ]),
  rows : PropTypes.number,
  config : PropTypes.object,
  debounce : PropTypes.number
};

export default RichTextEditor;
