import React from 'react';
import IconButton from '../../../components/IconButton';
import _ from '../../../@lodash';
// import * as Actions from 'app/store/actions';
// import  Actions from '../../../../icatalyst/src/app/store';
import * as Actions from 'app/store/actions';


import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {useTheme} from '@material-ui/styles';


const useStyles = makeStyles((theme)=>{
  return {
    root: {
    },
    icon : {
      color: theme.palette.primary.contrastText
    }
  };
});


function NavbarFoldedToggleButton({
  className, onClick
}) {
  const dispatch = useDispatch();
  const layout = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const {position} = layout.navbar;

  const theme = useTheme();

  const classes = useStyles();

  return (
    <IconButton
      className={clsx(classes.root, className)}
      onClick={(e) => {
        onClick && onClick(e, !layout.navbar.folded);
        return dispatch(Actions.setDefaultSettings(_.set({}, 'layout.navbar.folded', !layout.navbar.folded)));
      }}
      style={{
        color : theme.palette.primary.contrastText
      }}
      icon={layout.navbar.folded ? 'fa thumbtack' : (position === 'right' ? 'fa angle-double-right' : 'fa angle-double-left')}
      title={layout.navbar.folded ? 'Pin' : 'Collapse'}
    />
  );
}

NavbarFoldedToggleButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClick : PropTypes.func
};

export default NavbarFoldedToggleButton;
