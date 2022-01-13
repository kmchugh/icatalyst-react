import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {
  SettingsView
} from '../../../../components/Settings';

import TitledPage from '../../../../pages/TitledPage';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
    },
    settings : {
      width: '100%',

      [theme.breakpoints.up('sm')]: {
        width: theme.breakpoints.values.sm,
      },
    },
    settingsWrapper : {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  };
});

const SettingsComponent = ({
  className
})=>{
  const styles = useStyles();

  return (
    <TitledPage
      title="Settings"
      className={clsx(styles.root, className)}
    >
      <div
        className={clsx(styles.settingsWrapper)}
      >
        <SettingsView
          className={clsx(styles.settings)}
          settingsBlacklist={['User']}
          displayHeaders={false}
          showApplyButton={false}
          expanded={true}
        />
      </div>
    </TitledPage>
  );
};

SettingsComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default SettingsComponent;
