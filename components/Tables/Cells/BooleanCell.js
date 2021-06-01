import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Checkbox} from '@material-ui/core';

const useStyles = makeStyles(()=>{
  return {
    root : {
    },
    checkboxRoot : {
      '&:hover': {
        backgroundColor: 'transparent !important'
      }
    }
  };
});

const BooleanCell = ({
  value,
  className
})=>{
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Checkbox
        classes={{
          root : classes.checkboxRoot
        }}
        color="primary"
        disableRipple={true}
        checked={value}
        indeterminate={value === null || value === undefined}
      />
      {value}
    </div>
  );
};

BooleanCell.propTypes = {
  value : PropTypes.any.isRequired,
  row : PropTypes.shape({
    index : PropTypes.number.isRequired,
  }),
  column : PropTypes.shape({
    id : PropTypes.string.isRequired,
  }),
  updateData: PropTypes.func.isRequired,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default BooleanCell;
