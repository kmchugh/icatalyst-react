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
    value,
    className,
    column
  } = props;

  const {field} = column;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {field.format ? field.format(value) : value}
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
    getValue : PropTypes.func,
    field : PropTypes.object
  }),
  updateData: PropTypes.func.isRequired,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default DefaultCell;
