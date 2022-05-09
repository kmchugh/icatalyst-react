import React, {useState, useImperativeHandle, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {Dialog, DialogContent} from '../Dialogs';
import EntityView    from '../EntityView';
import {useForm} from '../../hooks/fuse';
import {Typography} from '@material-ui/core';
import Icon from '../Icon';
import ErrorWrapper from '../Errors/ErrorWrapper';
import FuseLoading from '../fuse/FuseLoading';

const useStyles = makeStyles((theme)=>{
  return {
    root : {},
    contentRoot : {
      width: '100%'
    },
    stepsWrapper : {
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between',
      '-webkit-justify-content': 'space-between',
      marginBottom : theme.spacing(2)
    },
    stepWrapper : {
      display: 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      flexShrink : 1,
      backgroundColor : theme.palette.action.hover,
      borderRadius : theme.shape.borderRadius,
      borderWidth : 'thin',
      borderColor : theme.palette.action.disabled,
      paddingLeft : theme.spacing(1),
      paddingRight : theme.spacing(1),
      paddingTop : theme.spacing(.5),
      paddingBottom : theme.spacing(.5),
    },
    wrapperCompleted : {
    },
    wrapperCurrent : {
      backgroundColor : theme.palette.secondary.light,

      ['& $stepDescription'] : {
        color : theme.palette.secondary.contrastText
      }
    },
    wrapperFuture : {
    },
    stepLabel : {
      width: theme.spacing(3),
      minWidth: theme.spacing(3),
      height: theme.spacing(3),
      borderRadius: '50%',
      textAlign : 'center',
      lineHeight: `${theme.spacing(3)}px`,
      marginRight: theme.spacing(1),
    },
    stepDescription : {
      textAlign: 'center',
      width: '100%',
    },
    stepCompleted : {
      background : theme.palette.success.main,
      color : theme.palette.success.contrastText,
    },
    stepCurrent : {
      background : theme.palette.primary.main,
      color : theme.palette.primary.contrastText,
    },
    stepFuture : {
      background : theme.palette.action.disabled,
      color : theme.palette.text.disabled,
    },
    stepDivider : {
      flex : '1 1 0%',
      flexGrow: 1,
      background : theme.palette.action.disabled,
      height : '1px',
      minWidth : theme.spacing(2),
      alignSelf : 'center',
      marginRight: 0,
      marginLeft: 0
    },
    textBold : {
      fontWeight : 'bold'
    },
    entityView :  {
      flex : '1 1 0%',
    },
    errorWrapper: {
      padding: 0,
    }
  };
});

const Wizard = React.forwardRef(({
  className,
  open,
  title = 'Wizard',
  definition,
  pageLayouts,
  entity,
  entityViewClassName,
  onSave,
  updatingTitle = 'Saving',
  onClosed = null,
  finishButtonIcon = 'check',
  finishButtonText = 'Finish'
}, ref)=>{

  const styles = useStyles();
  const [pageIndex, setPageIndex] = useState(0);
  const contentRef = useRef(null);
  const { form, handleChange, resetForm } = useForm(entity || definition.generateModel());
  const [wizardOpen, setWizardOpen] = useState(open);
  const [errors, setErrors] = useState({});
  const [dialogErrors, setDialogErrors] = useState(null);
  const [updating, setUpdating] = useState(false);

  const moveNext = ()=>{
    setPageIndex(Math.min(pageIndex+1, pageLayouts.length - 1));
  };
  const movePrevious = ()=>{
    setPageIndex(Math.max(pageIndex-1, 0));
  };

  const save = ()=>{
    setUpdating(true);
    setDialogErrors(null);

    onSave && onSave(form, (err)=>{
      setUpdating(false);
      if (err) {
        const layout = definition.layout.flat().map((field)=>{
          return typeof field === 'string' ? field : field.id;
        });
        // Parse out definition errors from generic errors
        const resultErrors = err.reduce((acc, error)=>{
          const field = error.key;
          if (field && layout.includes(field)) {
            acc.definition[field] = [
              ...(acc.definition[field] || []),
              error.message
            ];
          } else if (field) {
            acc.generic.push(`${error.message} (${field})`);
          } else {
            acc.generic.push(error);
          }
          return acc;
        }, {
          definition : {},
          generic : []
        });

        if (Object.keys(resultErrors.definition).length > 0) {
          setErrors((errors)=>({
            ...errors,
            ...resultErrors.definition
          }));
        }

        if (resultErrors.generic.length > 0) {
          setDialogErrors(resultErrors.generic);
        }
      } else {
        resetForm();
        setPageIndex(0);
        setWizardOpen(false);
        contentRef.current.closeDialog();
      }
    });
  };

  useImperativeHandle(ref, () => ({
    isCurrentPageValid : ()=>{
      return true;
    },
    nextPage : moveNext,
    previousPage : movePrevious,
    contentRef: contentRef,
    cancelWizard : ()=>{
      resetForm();
      setPageIndex(0);
      setWizardOpen(false);
      contentRef.current.closeDialog();
    },
    save : save,
    handleChange : handleChange
  }));

  const currentPageLayout = pageLayouts[pageIndex];
  let {
    title : pageTitle,
    showTitle : showPageTitle = true,
    actions,
    hideCloseButton = false,
    layout,
    showProgress = true,
    minHeight = 0,
    description
  } = currentPageLayout;

  const progressSteps = pageLayouts.filter((p)=>p.participateInProgress !== false);

  useEffect(()=>{
    if (form) {
      setErrors(definition.validate(form));
    }
  }, [form, pageIndex]);

  const isValid = Object.keys(errors).flatMap((key)=>{
    return errors[key];
  }).length === 0;

  const isCurrentPageValid = Object.keys(errors).filter((key)=>{
    return layout.flatMap(l=>l).includes(key);
  }).flatMap((key)=>{
    return errors[key];
  }).length === 0;

  useEffect(()=>{
    if (open !== wizardOpen) {
      setWizardOpen(open);
    }
  }, [open]);

  actions = (actions === undefined) ? [
    pageIndex > 0 && {
      key : 'prev',
      color : 'secondary',
      disabled : false,
      onClick : ()=>{
        movePrevious();
      },
      icon : 'arrow_back',
      title : 'Back'
    },
    pageIndex === pageLayouts.length -1 ? {
      key : 'finish',
      color : 'primary',
      disabled : !isValid || updating,
      onClick : ()=>{
        save();
      },
      icon : finishButtonIcon,
      title : finishButtonText
    } : {
      key : 'next',
      color : 'primary',
      disabled : !isCurrentPageValid,
      onClick : ()=>{
        moveNext();
      },
      icon : 'arrow_forward',
      title : 'Next'
    }].filter(i=>i) : actions;

  return open && (
    <Dialog
      className={clsx(styles.root, className)}
      open={wizardOpen}
      title={pageTitle || title}
      showTitle={showPageTitle}
      titleVariant="flat"
      fullWidth
      onClose={()=>{
        resetForm();
        setPageIndex(0);
        setWizardOpen(false);
        onClosed && onClosed();
      }}
    >
      <DialogContent
        ref={contentRef}
        actions={actions}
        hideCloseButton={hideCloseButton}
        className={clsx(styles.contentRoot)}
        style={{
          minHeight : minHeight
        }}
        onClose={()=>{
          resetForm();
          setPageIndex(0);
          setWizardOpen(false);
          onClosed && onClosed();
        }}
      >
        {updating && <FuseLoading title={updatingTitle}/>}
        {!updating && showProgress && (
          <div
            className={clsx(styles.stepsWrapper)}
          >
            {
              progressSteps.flatMap((page, i)=>{
                const {
                  subtitle,
                } = page;

                const realIndex = pageLayouts.indexOf(page);
                const position = realIndex === pageIndex ? 0 : (
                  realIndex < pageIndex ? -1 : 1
                );

                return [

                  <div
                    key={i}
                    className={clsx(
                      styles.stepWrapper,
                      position === -1 ? styles.wrapperCompleted : null,
                      position === 0 ? styles.wrapperCurrent : null,
                      position === 1 ? styles.wrapperFuture : null,
                    )}
                    style={{
                      flexBasis : `${100/progressSteps.length}%`
                    }}
                  >
                    <div
                      className={clsx(
                        styles.stepLabel,
                        position === -1 ? styles.stepCompleted : null,
                        position === 0 ? styles.stepCurrent : null,
                        position === 1 ? styles.stepFuture : null,
                      )}
                    >
                      {position === -1 ? (
                        <Icon>check</Icon>
                      ) : (
                        i+1
                      )}

                    </div>

                    {subtitle && (
                      <Typography
                        variant="caption"
                        className={clsx(
                          styles.stepDescription,
                          position === 0 ?
                            styles.textBold :
                            null
                        )}

                      >
                        {subtitle}
                      </Typography>
                    )}
                  </div>,

                  <div key={`${i}_divider`} className={clsx(styles.stepDivider)}/>
                ];
              }).filter((c, i, s)=>i!==s.length-1)
            }
          </div>
        )}

        <div className="mb-8">
          {
            (dialogErrors && dialogErrors.length > 0) && (
              <ErrorWrapper className={clsx(styles.errorWrapper)} errors={dialogErrors}/>
            )
          }
        </div>

        {
          (!updating && description) && (
            <Typography variant="subtitle1">
              {description}
            </Typography>
          )
        }
        { !updating && (
          <EntityView
            className={clsx(styles.entityView, entityViewClassName)}
            definition={{
              ...definition,
              layout : layout
            }}
            model={form}
            readonly={currentPageLayout.readonly}
            errors={errors}
            onChange={(e, v)=>{
              handleChange(e, v);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
});

Wizard.displayName = 'Wizard';
Wizard.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  entityViewClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  open : PropTypes.bool.isRequired,
  title : PropTypes.string,
  definition : PropTypes.object.isRequired,
  actions : PropTypes.arrayOf(
    PropTypes.shape({
      key : PropTypes.string,
      color : PropTypes.oneOf([
        'default',
        'secondary',
        'primary',
        'inherit'
      ]),
      disabled : PropTypes.bool,
      onClick : PropTypes.func,
      autoFocus : PropTypes.bool,
      icon : PropTypes.string,
      title : PropTypes.string,
      className : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ])
    })
  ),
  pageLayouts : PropTypes.array.isRequired,
  entity : PropTypes.object,
  onSave : PropTypes.func,
  updatingTitle : PropTypes.string,
  onClosed : PropTypes.func,
  finishButtonText : PropTypes.string,
  finishButtonIcon : PropTypes.string
};

export default Wizard;
