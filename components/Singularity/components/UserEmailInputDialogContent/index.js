import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import DialogContentEntityView from '../../../Dialogs/Content/DialogContentEntityView';
import { createModel } from '../../../../utilities/createModel';

const EMAIL_PATTERN = /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
const isValidEmail = (value) => {
  return !!EMAIL_PATTERN.test(value);
};

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const UserEmailInputDialogContent = ({
  className,
  style = {},
  onSaved
})=>{
  const styles = useStyles();

  const emailDefinition = useMemo(()=>{
    return createModel({
      name: 'user_email',
      fields : [
        {
          id : 'email',
          type: 'email',
          required: true,
          validations : [
            (model, field, value) => {
              const {name, label=name} = field;
              if (value && !isValidEmail(value)) {
                return label + ' must be a valid email';
              }
            }
          ]
        }
      ]
    });
  }, []);

  return (
    <DialogContentEntityView
      className={clsx(styles.root, className)}
      style={{...style}}
      definition={emailDefinition}
      onSaved={(value, callback)=>{
        if (onSaved) {
          onSaved(value, callback);
        } else {
          callback();
        }
      }}
    />
  );
};

UserEmailInputDialogContent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  onSaved: PropTypes.func,
};

export default UserEmailInputDialogContent;
