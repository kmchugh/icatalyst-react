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

const CustomCell = ({column, row, value, className})=>{
  const {field} = column;
  const {render} = field;
  const {original} = row;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {render(column, field, original, value)}
    </div>
  );
};

CustomCell.propTypes = {
  column : PropTypes.shape({
    field : PropTypes.shape({
      render : PropTypes.func.isRequired
    }).isRequired
  }),
  row : PropTypes.shape({
    index : PropTypes.number.isRequired,
    original : PropTypes.object
  }),
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  value : PropTypes.any
};

export default CustomCell;
