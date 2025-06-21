import React from 'react';
import Icon from '@icatalyst/components/Icon';
import PropTypes from 'prop-types';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles(theme => ({
  root: ({badge})=>{
    return {
      padding        : `0 ${theme.spacingNum(1)}`,
      fontSize       : theme.typography.caption.fontSize,
      fontWeight     : theme.typography.button.fontWeight,
      height         : theme.spacingNum(2.5),
      minWidth       : theme.spacingNum(2.5),
      borderRadius   : theme.spacingNum(2.5),
      display        : 'flex',
      alignItems     : 'center',
      backgroundColor: badge.background || theme.palette.secondary.main,
      color          : badge.color || theme.palette.secondary.contrastText
    };
  }
}));

function FuseNavBadge(props)
{
  const classes = useStyles(props);
  const {className, badge} = props;

  return (
    <div
      className={cxMui(classes.root, className, 'item-badge')}
    >
      {
        badge.icon &&
        <Icon className="list-item-icon text-16 flex-shrink-0">{badge.icon}</Icon>
      }
      {badge.title}
    </div>
  );
}

FuseNavBadge.propTypes = {
  badge: PropTypes.shape(
    {
      title: PropTypes.node,
      background  : PropTypes.string,
      color   : PropTypes.string,
      icon : PropTypes.string
    }),
  className: PropTypes.string
};
FuseNavBadge.defaultProps = {};

export default React.memo(FuseNavBadge);
