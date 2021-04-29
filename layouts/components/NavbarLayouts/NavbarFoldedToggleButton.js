import React from 'react';
import {IconButton} from '@material-ui/core';
import Icon from '@icatalyst/components/Icon';
import _ from '@lodash';
import * as Actions from 'app/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme)=>{
  return {
    root: {
    },
    icon : {
      color: theme.palette.primary.light
    }
  };
});


function NavbarFoldedToggleButton(props) {
  const {children, className} = props;
  const dispatch = useDispatch();
  const layout = useSelector(({app}) => app.settings.current.layout);
  const {position} = layout.navbar;

  const classes = useStyles(props);

  return (
    <IconButton
      className={clsx(classes.root, className)}
      onClick={() => {
        dispatch(Actions.setDefaultSettings(_.set({}, 'layout.navbar.folded', !layout.navbar.folded)));
      }}
      color="inherit"
    >
      {
        children || (
          <Icon className={clsx(classes.icon, className)}>
            {layout.navbar.folded ? 'fa thumbtack' : (position === 'right' ? 'fa angle-double-right' : 'fa angle-double-left')}
          </Icon>)
      }
    </IconButton>
  );
}

NavbarFoldedToggleButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default NavbarFoldedToggleButton;
