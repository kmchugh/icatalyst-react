import React, {useContext} from 'react';
import {FuseAnimate} from '../fuse';
import Icon from '../Icon';
import ClearableInput from '../ClearableInput';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import {SearchFilterContext} from '../Tables';
import {useSelector} from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import NavbarMobileToggleButton from '../../layouts/components/NavbarLayouts/NavbarMobileToggleButton';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: 0,
    },
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'space-between',
    flexDirection : 'row',
  },
  titleWrapper : {
    overflow: 'hidden',
    display: 'none',
    alignItems : 'center',
    [theme.breakpoints.up('lg')]: {
      flex: '1 0 33%',
    },
    [theme.breakpoints.down('sm')] : {
      display: 'flex',
    }
  },
  searchWrapper : {
    display: 'none',
    flexGrow: 1,
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      flex: '1 0 33%',
    },
    [theme.breakpoints.down('sm')] : {
      display: 'initial'
    }
  },
  componentWrapper : {
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      flex: '1 0 33%',
    }

  },
  icon : {
    width: `${theme.spacing(4)}px!important`,
    height: `${theme.spacing(4)}px!important`,
    marginRight: theme.spacing(2),
    fontSize: `${theme.spacing(4)}px!important`,

    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(2),
      marginRight: theme.spacing(1),
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
}));


const Header = ({
  title,
  subtitle,
  backText,
  icon,
  history,
})=>{
  const classes = useStyles();
  const actionComponent = false;
  const theme = useTheme();
  const searchContext = useContext(SearchFilterContext);

  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const {toolbar} = config;

  const {
    searchFilter,
    setSearchFilter
  } = searchContext;

  return (
    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
      <div className={clsx(classes.root)}>

        {
          // If the toolbar is not displayed then we need
          // to allow access to the navigation
          !toolbar.display && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className={clsx(classes.mobileNavButton)}/>
              <div className={classes.separator}/>
            </Hidden>
          )
        }

        {
          backText && <Typography
            className="normal-case flex items-center sm:mb-12"
            onClick={history.goBack}
            role="button"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className="mx-4">{backText}</span>
          </Typography>
        }

        <div className={clsx(classes.titleWrapper)}>
          <Icon className={clsx(classes.icon, 'text-32')}>{icon}</Icon>
          <div className="hidden overflow-hidden sm:flex mx-0 sm:mr-16 md:mx-16 flex flex-row sm:flex-col">
            <Typography noWrap={true} variant="h5">
              {title}
            </Typography>
            <Typography noWrap={true} variant="subtitle1">
              {subtitle}
            </Typography>
          </div>
        </div>

        <div className={clsx(classes.searchWrapper)}>
          <ClearableInput
            label="search"
            icon="search"
            value={searchFilter}
            onChange={setSearchFilter}
          />
        </div>

        <div className={clsx(classes.componentWrapper)}>
          {
            actionComponent && actionComponent
          }
        </div>

      </div>
    </FuseAnimate>
  );
};

Header.propTypes = {
  title : PropTypes.string.isRequired,
  subtitle : PropTypes.string,
  icon : PropTypes.string,
  history : PropTypes.object,
  backText : PropTypes.string,
};

export default React.memo(withRouter(Header));
