import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {
  SettingsView
} from '../../../../components/Settings';

import {Card, CardContent} from '@material-ui/core';
import TitledPage from '../../../../pages/TitledPage';


const useStyles = makeStyles((theme)=>{
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
      className={clsx(styles.root, className)}
    >
      <Card
        className={clsx(styles.settingsWrapper)}
      >
        <CardContent
          className={clsx(styles.cardContent)}
        >
          <SettingsView
            className={clsx(styles.settings)}
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
