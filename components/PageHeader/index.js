import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import NavbarMobileToggleButton from '../../layouts/components/NavbarLayouts/NavbarMobileToggleButton';

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
    }
  };
});

const PageHeader = ({
  className,
  size = 'medium',
  title = 'Header',
  showMenuNav = true,
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
    </div>
  );
};

PageHeader.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size : PropTypes.oneOf(['small', 'medium', 'large']),
  title : PropTypes.string,
  showMenuNav : PropTypes.bool
};

export default PageHeader;
