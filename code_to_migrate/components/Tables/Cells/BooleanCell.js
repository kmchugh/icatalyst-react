import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Checkbox} from '@material-ui/core';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
    },
    checkboxRoot : {
      '&:hover': {
        backgroundColor: 'transparent !important',
        color: theme.palette.text.primary
      },
    },
    checkbox : {
      ['&.MuiCheckbox-colorPrimary.Mui-checked'] : {
        color: mostReadable(
          tinycolor(theme.palette.background.paper),
          [
            theme.palette.primary.light,
            theme.palette.primary.dark,
            theme.palette.primary.main,
          ]
        ).toHex8String()
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
        className={clsx(classes.checkbox)}
        color="default"
        disableRipple={true}
        checked={value}
        indeterminate={value === null || value === undefined}
      />
      {value}
    </div>
  );
};

BooleanCell.propTypes = {
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

export default BooleanCell;
