import React, {useState} from 'react';
import Icon from '../../components/Icon';
import {Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
// import Hidden from '@mui/material/Hidden';
import NavbarMobileToggleButton from '../../layouts/components/NavbarLayouts/NavbarMobileToggleButton';
import useHookWithRefCallback from '../../hooks/useHookWithRefCallback';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import {useMediaQuery, useTheme} from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      margin:theme.spacingNum(2),
      alignSelf: 'center',

      ['& > *'] : {
        marginBottom : theme.spacingNum(2)
      }
    },
    link : {
      color: theme.palette.primary.color
    },
    icon : {

      width: theme.spacingNum(12),
      height: theme.spacingNum(12),
      fontSize: theme.spacingNum(12),

      [theme.breakpoints.up('md')]: {
        width: theme.spacingNum(16),
        height: theme.spacingNum(16),
        fontSize: theme.spacingNum(16),
      },
      marginBottom: theme.spacingNum(4)
    },
    title : {
      marginBottom: theme.spacingNum(1),
    },
    info : {
      marginBottom: theme.spacingNum(1),
    },
    action : {

    },
    separator: {
      width          : 1,
      height: theme.spacingNum(6),
      backgroundColor: theme.palette.divider,
      marginLeft : theme.spacingNum(1),
      marginRight : theme.spacingNum(2),
    },
    mobileNavButton : {
      width: theme.spacingNum(6),
      height: theme.spacingNum(6),
      position: 'absolute',
      top: 0,
      left: 0
    }
  };
});

const InfoPage = ({
  icon = 'fa info',
  title = 'Title',
  info = 'info text',
  action = null,
  className,
  style,
  renderNavigation = true,
})=>{
  const classes = useStyles();
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const iconText = typeof icon === 'string';
  const infoText = typeof info === 'string';
  const actionText = typeof action === 'string';
  const [bgColor, setBGColor] = useState(null);

  const [pageRef] = useHookWithRefCallback((ref)=>{
    if (ref) {
      const color = tinycolor(getComputedStyle(ref).backgroundColor);
      if (color.getAlpha() > 0) {
        setBGColor(getComputedStyle(ref).backgroundColor);
      }
    }
  }, []);

  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const {toolbar} = config;

  const textColor = bgColor && mostReadable(bgColor, [
    theme.palette.primary.contrastText,
    theme.palette.secondary.contrastText
  ]).toHex8String();

  return (
    <div
      ref={pageRef}
      style={style}
      className={clsx(classes.root, 'max-w-md text-center', className)}
    >
      {
        // If the toolbar is not displayed then we need
        // to allow access to the navigation
        (!toolbar.display && renderNavigation) && isLgDown && (
          <>
            <NavbarMobileToggleButton className={clsx(classes.mobileNavButton)}/>
          </>
        )
      }

      {
        iconText ? (
          <Icon color="primary" className={clsx(classes.icon)}>{icon}</Icon>
        ) : icon
      }



      <Typography
        variant="h4"
        component="h1"
        className={clsx(classes.title)}
        style={textColor ? {
          color : textColor
        } : undefined}
      >
        {title}
      </Typography>
      {
        infoText ? (
          <Typography
            variant="subtitle1"
            component="div"
            className={clsx(classes.info)}
            style={textColor ? {
              color : textColor
            } : undefined}
          >
            {info}
          </Typography>
        ) : info
      }

      {
        actionText ? (
          <Typography
            variant="caption"
            component="div"
            className={clsx(classes.action)}
            style={textColor ? {
              color : textColor
            } : undefined}
          >
            {action}
          </Typography>
        ) : action
      }
    </div>
  );
};

InfoPage.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style : PropTypes.object,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  title: PropTypes.string,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  renderNavigation: PropTypes.bool
};

export default InfoPage;
