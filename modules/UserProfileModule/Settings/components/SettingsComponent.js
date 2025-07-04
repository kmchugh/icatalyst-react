import React from 'react';
import PropTypes from 'prop-types';
import {
  SettingsView
} from '../../../../components/Settings';

import TitledPage from '../../../../pages/TitledPage';
import { createMuiStyles, cxMui } from '../../../../utilities';

const useStyles = createMuiStyles((theme)=>{
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
      className={cxMui(styles.root, className)}
    >
      <div
        className={cxMui(styles.settingsWrapper)}
      >
        <SettingsView
          className={cxMui(styles.settings)}
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
