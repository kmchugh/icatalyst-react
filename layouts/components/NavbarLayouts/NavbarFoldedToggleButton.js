import React from 'react';
import IconButton from '../../../components/IconButton';
import _ from '../../../@lodash';
import * as Actions from 'app/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { createMuiStyles, cxMui, useMuiTheme } from '../../../utilities';

const useStyles = createMuiStyles((theme)=>{
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

  const theme = useMuiTheme();

  const classes = useStyles();

  return (
    <IconButton
      className={cxMui(classes.root, className)}
      onClick={(e) => {
        onClick && onClick(e, !layout.navbar.folded);
        return dispatch(Actions.setDefaultSettings(_.set({}, 'layout.navbar.folded', !layout.navbar.folded)));
      }}
      style={{
        color : theme.palette.primary.contrastText
      }}
      icon={layout.navbar.folded ? 'fa thumbtack' : (position === 'right' ? 'fa angle-double-right' : 'fa angle-double-left')}
      title={layout.navbar.folded ? 'Pin' : 'Collapse'}
      size="large" />
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
