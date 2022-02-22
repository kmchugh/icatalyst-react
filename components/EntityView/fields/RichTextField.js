import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const RichTextField = ({
  className
})=>{
  const styles = useStyles();

  return (
    <div className={clsx(styles.root, className)}>
      BOILERPLATE
    </div>
  );
};

RichTextField.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default RichTextField;

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'entity';
  },
  getComponent : ()=>{
    return RichTextField;
  }
};
