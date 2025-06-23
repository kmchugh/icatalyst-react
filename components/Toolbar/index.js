import React from 'react';
import {Toolbar as NativeToolbar } from '@mui/material';
import PropTypes from 'prop-types';
import { createMuiStyles, cxMui, useMergedMuiStyles } from '../../utilities';

const useStyles = createMuiStyles((theme) => ({
  root: {
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    }
  },
  grow: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
      display: 'block'
    }
  }
}));

const Toolbar = (props)=>{
  const classes = useMergedMuiStyles(useStyles, props);

  const {primaryTools, secondaryTools} = props;

  return (
    <NativeToolbar className={cxMui(classes.root, props.className)}>
      {
        primaryTools && primaryTools
      }
      <div className={cxMui(classes.grow)}/>
      {
        secondaryTools && secondaryTools
      }
    </NativeToolbar>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  primaryTools : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  secondaryTools : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Toolbar;
