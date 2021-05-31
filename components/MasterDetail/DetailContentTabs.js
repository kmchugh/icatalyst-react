import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from '@material-ui/core';
import Icon from '../Icon';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/styles';
import IconButton from '../IconButton';
import PageBase from '../../pages/PageBase';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    root : {
      height: theme.spacing(9),
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      backgroundColor   : theme.palette.background.default,
      color             : theme.palette.text.primary,
      borderBottom : `thin solid ${theme.palette.divider}`
    },
    backButton: {
      marginLeft : theme.spacing(1),
      marginRight : theme.spacing(1),
    },
    tabBar : {
      height: theme.spacing(9),
      width: '100%',
    },
    tab : {
      height : theme.spacing(9),
      textTransform : 'none'
    },
  };
});

const DetailContentTabs = ({
  tabs,
  selectedTab,
  onTabChanged,
  config,
  backUrl,
})=>{
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <div className={clsx(classes.root)}>
      {
        // If the mode is chromeless then we need a way to get back
        config.mode === 'chromeless' && (
          <IconButton className={clsx(classes.backButton)}
            onClick={()=>{
              history.push(backUrl);
            }}
            icon={theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            title="back"
          />
        )
      }
      {
        tabs && (
          <Tabs
            value={selectedTab.current}
            selectionFollowsFocus={true}
            onChange={(e, index)=>{
              if (index !== selectedTab.index) {
                onTabChanged(index);
              }
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={clsx(classes.tabBar)}
          >
            {
              tabs.filter(t=>t.visible===true).map(({icon, label, path})=>{
                return (
                  <Tab
                    key={path || ''}
                    className={clsx(classes.tab)}
                    icon={<Icon fontSize="small">{icon}</Icon>}
                    label={label}
                  />
                );
              })
            }
          </Tabs>
        )
      }
    </div>
  );
};

DetailContentTabs.propTypes = {
  backUrl :PropTypes.string,
  selectedTab : PropTypes.shape({
    prev : PropTypes.number,
    current : PropTypes.number,
    index : PropTypes.number
  }).isRequired,
  tabs : PropTypes.arrayOf(
    PropTypes.shape({
      icon : PropTypes.string,
      path : PropTypes.string,
      label : PropTypes.string,
    })
  ).isRequired,
  config : PageBase.propTypes.config,
  onTabChanged : PropTypes.func.isRequired
};


export default DetailContentTabs;
