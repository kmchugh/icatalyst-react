import React from 'react';
import PropTypes from 'prop-types';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles(()=>{
  return {
    root : {
      wordBreak: 'break-word'
    }
  };
});

const DateTimeCell = ({
  value,
  className
})=>{
  const classes = useStyles();

  return (
    <div className={cxMui(classes.root, className)}>
      {value === 9223372036854776000 ? 'Never' : (
        value === null ? '' : new Date(value).toLocaleString()
      )}
    </div>
  );
};

DateTimeCell.propTypes = {
  value : PropTypes.any,
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

export default DateTimeCell;
