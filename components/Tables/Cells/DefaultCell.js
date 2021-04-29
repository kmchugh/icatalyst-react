import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(()=>{
  return {
    root : {
      wordBreak: 'break-word'
    }
  };
});

const DefaultCell = (props)=>{
  const {
    column,
    row,
    value,
    className
  } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {column.getValue ? column.getValue(column, row.original, value) : value}
    </div>
  );
};

DefaultCell.propTypes = {
  value : PropTypes.any,
  row : PropTypes.shape({
    index : PropTypes.number.isRequired,
    original : PropTypes.object
  }),
  column : PropTypes.shape({
    id : PropTypes.string.isRequired,
    getValue : PropTypes.func
  }),
  updateData: PropTypes.func.isRequired,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default DefaultCell;
