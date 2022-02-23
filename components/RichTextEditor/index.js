import React, {useEffect, useRef, useImperativeHandle, useMemo} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-balloon';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      // width: 'auto',
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
    ...rest
  }
)=>{
  const styles = useStyles({
    rows,
    multiline
  });
  const editorRef = useRef(null);
  const valueRef = useRef(value);

  useImperativeHandle(rest.inputRef, ()=>{
    return {
      focus : ()=>{
      },
      value : valueRef.current
    };
  });

  useEffect(()=>{
    if (editorRef.current) {
      if (value !== editorRef.current.getData()) {
        editorRef.current.setData(value);
      }
    }
  }, [value]);

  const updateContent = (e, updatedContent)=>{
    onChange && onChange(e, updatedContent);
  };

  const derivedConfig = useMemo(()=>{
    return !multiline ? {
      toolbar: ['bold', 'italic'],
      restrictedEditing: {
        allowedCommands: ['bold', 'italic'],
        allowedAttributes: []
      }
    } : {};
  }, [config]);

  // const derivedConfig = useMemo(()=>{
  //   return {
  //     editorCssClass : clsx(styles.rte),
  //     buttons : config.buttons || undefined,
  //     enter : blockWrapper,
  //     readonly,
  //     inline : inline,
  //     toolbarInlineForSelection : inline,
  //     toolbar : !inline,
  //     showCharsCounter : !inline,
  //     showWordsCounter : !inline,
  //     showXPathInStatusbar : !inline,
  //     popup : {
  //       selection : ['bold']
  //     },
  //     showPlaceholder: false,
  //     spellcheck : false,
  //     useSearch : false,
  //     cleanHTML : {
  //       denyTags : config.multiline === false ? {
  //         p: true,
  //         br: true,
  //         span: true,
  //         table: true,
  //         img: true,
  //         a: true,
  //         tr: true,
  //         td: true,
  //         ol : true,
  //         ul : true,
  //         iframe: true
  //       } : undefined
  //     },
  //     events : {
  //       keydown : (e)=>{
  //         // Specific check for false, as it could be null or undefined
  //         console.log(e.key, config.multiline === false, e.key === 'Enter');
  //         if (config.multiline === false && e.key === 'Enter') {
  //           e.stopPropagation();
  //           return false;
  //         }
  //       },
  //       focus : (e)=>{
  //         onFocus && onFocus(e);
  //       },
  //       // There is a bug in the jodit-react onBlur so use this instead
  //       blur : (e)=>{
  //         const v = textRef.current.value;
  //         const isEmpty = !v || v.trim() === '';
  //         // Makes sure we only run updates if the
  //         // value has actually changed.
  //         // JODIT will update null to '' so we also
  //         // need to handle that case
  //         if (v !== value) {
  //           updateContent(e, isEmpty ? null : v);
  //         }
  //         onBlur && onBlur(e);
  //       }
  //     }
  //   };
  // }, [value, config]);
  //

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
          editor.setData(value);
        }}
        onChange={
          (e, editor)=>{
            const v = editor.getData();
            valueRef.current = v;
            if (v !== value) {
              const isEmpty = !v || v.trim() === '';
              updateContent(e, isEmpty ? null : v);
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
  config : PropTypes.object
};

export default RichTextEditor;
