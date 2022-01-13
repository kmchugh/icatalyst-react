import React, {useState} from 'react';
import {Typography, LinearProgress} from '@material-ui/core';
import useTimeout from '@icatalyst/hooks/fuse/useTimeout';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/styles';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles(()=>{
  return {
    root : {
      alignSelf: 'center',
      height: '100%',
      display : 'flex',
      flexGrow : 1,
      flexShrink : 1,
      flexDirection : 'column',
      alignItems : 'center',
      justifyContent : 'center',
      overflow : 'hidden'
    },
  };
});

function FuseLoading(props)
{
  const classes = useStyles();
  const theme = useTheme();

  const color = props.color || mostReadable(
    tinycolor(theme.palette.background.paper),
    [
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ]
  ).toHex8String() === theme.palette.primary.main ? 'primary' : 'secondary';

  const [showLoading, setShowLoading] = useState(!props.delay);
  let title = props.title != null ? (props.title || 'Loading...') : null;
  useTimeout(() => {
    setShowLoading(true);
  }, props.delay);

  if ( !showLoading )
  {
    return null;
  }

  return (
    <div className={clsx(classes.root, props.className)}>
      {title && <Typography className="text-20 mb-16" color="textSecondary">{title}</Typography>}
      <LinearProgress
        aria-label={title || 'Loading...'}
        className="mb-32 w-xs"
        color={color}
        id={props.id}
      />
    </div>
  );
}

FuseLoading.propTypes = {
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  className : PropTypes.string,
  title : PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  id: PropTypes.string
};

FuseLoading.defaultProps = {
  delay: false
};

export default FuseLoading;
