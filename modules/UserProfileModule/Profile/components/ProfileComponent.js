import React from 'react';
import PropTypes from 'prop-types';
import {
  SettingsView
} from '../../../../components/Settings';

import {Card, CardContent} from '@mui/material';
import TitledPage from '../../../../pages/TitledPage';
import { createMuiStyles, cxMui } from '../../../../utilities';


const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
    },
    settings : {
      width: '100%'
    },
    cardContent : {
      width: '100%'
    },
    settingsWrapper : {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',

      [theme.breakpoints.up('sm')]: {
        width: theme.breakpoints.values.sm,
      },
    }
  };
});

const ProfileComponent = ({
  className
})=>{
  const styles = useStyles();

  return (
    <TitledPage
      title="Profile"
      className={cxMui(styles.root, className)}
    >
      <Card
        className={cxMui(styles.settingsWrapper)}
      >
        <CardContent
          className={cxMui(styles.cardContent)}
        >
          <SettingsView
            className={cxMui(styles.settings)}
            settingsWhitelist={['User']}
            displayHeaders={false}
          />
        </CardContent>
      </Card>
    </TitledPage>
  );
};

ProfileComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default ProfileComponent;
