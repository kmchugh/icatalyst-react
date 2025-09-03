import React, {useContext} from 'react';
import {FuseAnimate} from '../fuse';
import Icon from '../Icon';
import ClearableInput from '../ClearableInput';
import {Typography} from '@mui/material';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {SearchFilterContext} from '../Tables';
import {useSelector} from 'react-redux';
// import Hidden from '@mui/material/Hidden';
import NavbarMobileToggleButton from '../../layouts/components/NavbarLayouts/NavbarMobileToggleButton';
import {useMediaQuery, useTheme} from '@mui/material';
import { createMuiStyles, cxMui } from '../../utilities';


const useStyles = createMuiStyles((theme) => ({
  root: {
    paddingTop: theme.spacingNum(3),
    paddingBottom: theme.spacingNum(3),

    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacingNum(2),
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
    [theme.breakpoints.down('md')] : {
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
    [theme.breakpoints.down('md')] : {
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
    width: `${theme.spacingNum(4)}!important`,
    height: `${theme.spacingNum(4)}!important`,
    marginRight: theme.spacingNum(2),
    fontSize: `${theme.spacingNum(4)}!important`,

    [theme.breakpoints.up('lg')]: {
      margin: theme.spacingNum(2),
      marginRight: theme.spacingNum(1),
    }
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
    height: theme.spacingNum(6)
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

  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const config = useSelector(({icatalyst}) => icatalyst.settings.current.layout);
  const {toolbar} = config;

  const {
    searchFilter,
    setSearchFilter
  } = searchContext;

  return (
    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
      <div className={cxMui(classes.root)}>

        {
          // If the toolbar is not displayed then we need
          // to allow access to the navigation
          !toolbar.display && isLgDown && (
            <>
              <NavbarMobileToggleButton className={cxMui(classes.mobileNavButton)}/>
              <div className={classes.separator}/>
            </>
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

        <div className={cxMui(classes.titleWrapper)}>
          <Icon className={cxMui(classes.icon, 'text-32')}>{icon}</Icon>
          <div className="hidden overflow-hidden sm:flex mx-0 sm:mr-16 md:mx-16 flex flex-row sm:flex-col">
            <Typography noWrap={true} variant="h5">
              {title}
            </Typography>
            <Typography noWrap={true} variant="subtitle1">
              {subtitle}
            </Typography>
          </div>
        </div>

        <div className={cxMui(classes.searchWrapper)}>
          <ClearableInput
            label="search"
            icon="search"
            value={searchFilter}
            onChange={setSearchFilter}
          />
        </div>

        <div className={cxMui(classes.componentWrapper)}>
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
