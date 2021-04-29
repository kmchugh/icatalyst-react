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

const DefaultCell = ({
  value,
  className
})=>{
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {value === 9223372036854776000 ? 'Never' : (
        new Date(value).toLocaleString()
      )}
    </div>
  );
};

DefaultCell.propTypes = {
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

export default DefaultCell;
