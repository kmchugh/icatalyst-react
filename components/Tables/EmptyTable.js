import React, {useContext} from 'react';
import Icon from '@icatalyst/components/Icon';
import IconButton from '@icatalyst/components/IconButton';
import {Typography} from '@mui/material';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';

import PropTypes from 'prop-types';
import { createMuiStyles, cxMui } from '../../utilities';


const useStyles = createMuiStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection : 'column',
      background: theme.palette.background.default,
      height: '100%',
      margin:theme.spacingNum(2)
    },
    contentWrapper : {
      display: 'flex',
      flexDirection : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1
    },
    navigationWrapper : {
      display: 'flex',
      flexDirection : 'row',
    },
    icon : {
      width: theme.spacingNum(12),
      height: theme.spacingNum(12),
      fontSize: `${theme.spacingNum(12)}!important`,

      [theme.breakpoints.up('md')]: {
        width: theme.spacingNum(16),
        height: theme.spacingNum(16),
        fontSize: `${theme.spacingNum(16)}!important`,
      },
      color: theme.palette.primary.main,
      marginBottom: theme.spacingNum(4)
    },
    title : {
      marginBottom: theme.spacingNum(1),
      textAlign: 'center'
    },
    info : {
      marginBottom: theme.spacingNum(1),
      textAlign: 'center',
      paddingLeft: theme.spacingNum(2),
      paddingRight: theme.spacingNum(2)
    },
    help : {

    },
    refreshButton : {
      marginTop: theme.spacingNum(2)
    }
  };
});

const EmptyTable = ({
  icon = 'fa search',
  title = 'No results found',
  action,
  help,
  onRefresh,
  className,
  showIcon = true,
  NavigationComponent
})=>{
  const classes = useStyles();
  const {t} = useContext(LocalizationContext);


  return (
    <div className={cxMui(classes.root, className)}>
      {NavigationComponent && (
        <div className={cxMui(classes.navigationWrapper)}>
          {NavigationComponent}
        </div>
      )}
      <div className={cxMui(classes.contentWrapper)}>
        {showIcon && <Icon className={cxMui(classes.icon)}>{icon}</Icon>}
        <Typography variant="h4" className={cxMui(classes.title)}>{title}</Typography>
        {
          action && <Typography variant="subtitle1" className={cxMui(classes.info)}>{action}</Typography>
        }
        {
          help && <Typography variant="caption" className={cxMui(classes.help)}>{help}</Typography>
        }
        {
          onRefresh && <IconButton
            className={cxMui(classes.refreshButton)}
            title={t('refresh')}
            icon="refresh"
            onClick={onRefresh}
            size="large" />
        }
      </div>
    </div>
  );
};

EmptyTable.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  icon: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  help: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  onRefresh: PropTypes.func,
  showIcon : PropTypes.bool,
  NavigationComponent : PropTypes.node
};

export default React.memo(EmptyTable);
