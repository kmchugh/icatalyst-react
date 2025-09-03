import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Tooltip} from '@mui/material';
import Icon from '../Icon';
import IconButton from '../IconButton';
import PageBase from '../../pages/PageBase';
import { useHistory } from 'react-router-dom';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { createMuiStyles, cxMui, useMuiTheme } from '../../utilities';

const useStyles = createMuiStyles((theme) => {
  return {
    root : {
      height: theme.spacingNum(9),
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      backgroundColor   : theme.palette.background.default,
      color             : theme.palette.text.primary,
      borderBottom : `thin solid ${theme.palette.divider}`
    },
    backButton: {
      marginLeft : theme.spacingNum(1),
      marginRight : theme.spacingNum(1),
    },
    tabBar : {
      height: theme.spacingNum(9),
      width: '100%',
      ['& .Mui-selected'] : {
        color: mostReadable(
          tinycolor(theme.palette.background.paper),
          [
            theme.palette.primary.light,
            theme.palette.primary.dark,
            theme.palette.primary.main,
          ]
        ).toHex8String()
      }
    },
    tab : {
      height : theme.spacingNum(9),
      textTransform : 'none',
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
  const theme = useMuiTheme();
  const history = useHistory();

  return (
    <div className={cxMui(classes.root)}>
      {
        // If the mode is chromeless then we need a way to get back
        config.mode === 'chromeless' && (
          <IconButton
            className={cxMui(classes.backButton)}
            onClick={()=>{
              history.push(backUrl);
            }}
            icon={theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            title="back"
            size="large" />
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
            className={cxMui(classes.tabBar)}
          >
            {
              tabs.filter(t=>t.visible===true).map(({icon, label, path, description})=>{
                return (
                  <Tooltip
                    key={path || ''}
                    title={description || ''}
                  >
                    <Tab
                      key={path || ''}
                      className={cxMui(classes.tab)}
                      icon={<Icon fontSize="small">{icon}</Icon>}
                      label={label}
                    />
                  </Tooltip>
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
