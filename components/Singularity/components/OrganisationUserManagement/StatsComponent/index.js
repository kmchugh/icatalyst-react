import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from '../../../../../@moment';
import {LocalizationContext} from '../../../../../localization/LocalizationProvider';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      flexDirection: 'row',
      minHeight: theme.spacing(12),
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    panel: {
      marginLeft: theme.spacing(1),
      flexShrink: 0,
      flexGrow: 0,
      padding: theme.spacing(2),

      '&:first-child': {
        marginLeft: theme.spacing(0),
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
      margin: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    stat: {
      height: '100%',
      padding:  theme.spacing(2),
      paddingLeft:  theme.spacing(4),
      paddingRight:  theme.spacing(4),
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
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <Paper
        className={
          clsx(
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
                clsx(
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
                  clsx(
                    styles.statLabel
                  )
                }
              >
                {t(name)}
              </Typography>
              <div className={
                clsx(styles.stat,
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
