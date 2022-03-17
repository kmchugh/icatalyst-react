import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import NavbarMobileToggleButton from '../../layouts/components/NavbarLayouts/NavbarMobileToggleButton';
import IconButton from '../IconButton';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      marginBottom : theme.spacing(3),
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center'
    },
    title : {
      fontWeight: 'bold',

      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h5.fontSize
      }

    },
    separator: {
      width          : 1,
      height: theme.spacing(6),
      backgroundColor: theme.palette.divider,
      marginLeft : theme.spacing(1),
      marginRight : theme.spacing(2),
    },
    mobileNavButton : {
      width: theme.spacing(6),
      height: theme.spacing(6)
    },
    spacer : {
      flexGrow: 1,
      minWidth: theme.spacing(1),
      height: '100%'
    },
    actions : {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
      }
    }
  };
});

const PageHeader = ({
  className,
  size = 'medium',
  title = 'Header',
  showMenuNav = true,
  actions
})=>{
  const styles = useStyles();

  const variants = {
    'small' : {
      typography : 'h6'
    },
    'medium' : {
      typography : 'h4'
    },
    'large' : {
      typography : 'h2'
    },
  };

  const variant = variants[size.toLowerCase()];

  return (
    <div className={clsx(styles.root, className)}>
      {showMenuNav && (
        <Hidden lgUp>
          <NavbarMobileToggleButton className={clsx(styles.mobileNavButton)}/>
          <div className={styles.separator}/>
        </Hidden>
      )}
      <Typography
        className={styles.title}
        variant={variant.typography}
        component="h1"
      >
        {title}
      </Typography>
      <div className={styles.spacer}/>
      {actions && (
        <div className={styles.actions}>
          {
            actions.map((action)=>{
              const isElement = React.isValidElement(action);
              if (!isElement) {
                const {
                  className,
                  title,
                  onClick,
                  icon,
                  color = 'primary',
                  size = 'small',
                  disabled = false
                } = action;
                return (<IconButton
                  className={clsx(className)}
                  title={clsx(title)}
                  key={action.title}
                  onClick={onClick}
                  icon={icon}
                  color={color}
                  size={size}
                  disabled={disabled}
                />);
              } else {
                return action;
              }
            }).filter(i=>i)
          }
        </div>
      )}
    </div>
  );
};

PageHeader.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size : PropTypes.oneOf(['small', 'medium', 'large']),
  title : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  showMenuNav : PropTypes.bool,
  actions : PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        className : PropTypes.string,
        title : PropTypes.string.isRequired,
        onClick : PropTypes.func.isRequired,
        icon : PropTypes.string.isRequired,
        disabled : PropTypes.bool,
        color : PropTypes.string
      })
    ])
  ),
};

export default PageHeader;
