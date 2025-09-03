import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import moment from '../../../../../@moment';
import {LocalizationContext} from '../../../../../localization/LocalizationProvider';
import { createMuiStyles, cxMui } from '../../../../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      flexDirection: 'row',
      minHeight: theme.spacingNum(12),
      width: '100%',
      marginBottom: theme.spacingNum(2),
    },
    panel: {
      marginLeft: theme.spacingNum(1),
      flexShrink: 0,
      flexGrow: 0,
      padding: theme.spacingNum(2),

      '&:first-child': {
        marginLeft: theme.spacingNum(0),
      }
    },
    statPanel: {
      display: 'flex',
      flexDirection : 'row',
      alignItems: 'center',
      padding: 0,
    },
    licencePanel: {
      flexGrow: 1,
    },
    statLabel: {
      margin: theme.spacingNum(2),
      paddingLeft: theme.spacingNum(2),
      paddingRight: theme.spacingNum(2),
    },
    stat: {
      height: '100%',
      padding:  theme.spacingNum(2),
      paddingLeft:  theme.spacingNum(4),
      paddingRight:  theme.spacingNum(4),
      background: theme.palette.divider,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    stat_string:{

    },
    stat_number:{

    }
  };
});

const StatsComponent = ({
  className,
  style = {},
  stats = [],
  // organisation,
  licence,
  licenceKey
})=>{
  const styles = useStyles();
  const {t} = useContext(LocalizationContext);

  return (
    <div
      className={cxMui(styles.root, className)}
      style={{...style}}
    >
      <Paper
        className={
          cxMui(
            styles.panel,
            styles.licencePanel
          )
        }
      >
        <Typography
          noWrap={true}
          variant="h6"
          component="h4"
          gutterBottom={true}
        >
          {licence?.name}
        </Typography>

        <Typography
          noWrap={true}
          variant="body1"
          gutterBottom={true}
        >
          {t('Applied')}: {licenceKey ? moment(licenceKey.applied).format('LL') : 'No valid license key found.'}
        </Typography>
        <Typography
          noWrap={true}
          variant="body1"
        >
          {t('Expires')}: {licenceKey ? moment(licenceKey.expires).format('LL'): 'No valid license key found.'}
        </Typography>
      </Paper>
      {
        stats.map(({
          name,
          stat,
          displayStat
        })=>{
          return (
            <Paper
              key={name}
              className={
                cxMui(
                  styles.panel,
                  styles.statPanel
                )
              }
            >
              <Typography
                noWrap={true}
                variant="h6"
                component="h4"
                className={
                  cxMui(
                    styles.statLabel
                  )
                }
              >
                {t(name)}
              </Typography>
              <div className={
                cxMui(styles.stat,
                  (stat === undefined || stat === null) && styles.stat_string,
                  (stat !== undefined && stat !== null) && styles.stat_number,
                )
              }>
                <Typography
                  noWrap={true}
                  variant="h2"
                >
                  {displayStat || stat}
                </Typography>

              </div>
            </Paper>
          );
        })
      }
    </div>
  );
};

StatsComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  stats: PropTypes.array,
  licence: PropTypes.object,
  licenceKey: PropTypes.object,
  organisation: PropTypes.object,
};

export default StatsComponent;
