import React, {useEffect, useRef, useImperativeHandle, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import _ from '@icatalyst/@lodash';

// Uncomment this to quickly see a list of plugins
// console.log(Editor.builtinPlugins.map( plugin => plugin.pluginName ));

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      ['& .ck'] : {
        minHeight: 'inherit',
        ['& ol,ul'] : {
          listStyle : 'revert',
          margin: 'revert',
          padding:'revert'
        }
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
        border: '1px solid transparent',
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
    readOnly = false,
    config = {},
    rows = 5,
    debounce = 750,
    updateOnBlur = false,
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

  // The custom build ckeditor seems to have removed the disabled option
  // This is a fix to ensure it is not passed through
  /* eslint-disable no-unused-vars */
  const {disabled, variant, ...editorProps} = rest;
  /* eslint-enable no-unused-vars */

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
      isReadOnly : true,
      // By default remove the following plugins
      removePlugins : [
        'CKFinder',
        'CKFinderUploadAdapter',
        'CloudServices',
        'EasyImage',
        'ImageUpload',
        'TableToolbar',
        'Table',
        'MediaEmbed'
      ],
      toolbar : {
        removeItems : [
          'uploadImage',
          'imageUpload',
          'insertTable',
          'mediaEmbed'
        ]
      },
      link: {
        addTargetToExternalLinks: true,
      },
      htmlSupport: {
        allow: [
          {
            name: 'iframe',
            attributes: true,
            classes: true,
            styles: true
          }
        ]
      },
    }, !multiline ? {
      toolbar: ['bold', 'italic'],
      restrictedEditing: {
        allowedCommands: ['bold', 'italic'],
        allowedAttributes: []
      }
    } : {}, config);
  }, [config]);

  const updateContentOnDebounce = useMemo(()=>{
    return _.debounce((e, value)=>{
      updateContent(e,value);
    }, debounce);
  }, [onChange, debounce]);

  const updateContent = (e,value) =>{
    setPendingUpdate(value);
    onChange && onChange(e, value);
  };

  return (
    <div className={clsx(
      styles.root,
      styles.rows,
      styles.multiline,
      className
    )}>
      <CKEditor
        {...editorProps}
        editor={Editor}
        data={value}
        onReady={(editor)=>{
          editorRef.current = editor;
          editor.setData(value || '');

          // This is a workaround for the custom build as the disabled property stopped working
          if (readOnly) {
            editor.enableReadOnlyMode(`rte-${editorProps.id || editorProps.name || 'readonly'}`);
          }
        }}
        onChange={
          (e, editor)=>{
            const v = editor.getData();
            valueRef.current = v;
            if (v !== value && !updateOnBlur) {
              const isEmpty = !v || v.trim() === '';
              if (v !== pendingUpdate) {
                updateContentOnDebounce(e, isEmpty ? null : v);
              }
            }
          }
        }
        onBlur={(e, editor) => {
          const v = editor.getData();
          if (v !== value) {
            const isEmpty = !v || v.trim() === '';
            if (v !== pendingUpdate) {
              updateContent(e, isEmpty ? null : v);
            }
          }
        }}
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
  readOnly : PropTypes.bool,
  rows : PropTypes.number,
  config : PropTypes.object,
  debounce : PropTypes.number,
  updateOnBlur : PropTypes.bool
};

export default RichTextEditor;
