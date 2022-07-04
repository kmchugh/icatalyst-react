import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@icatalyst/components/Icon';
import Button from '@material-ui/core/Button';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
const useStyles = makeStyles((theme)=>{
  return {
    root : {},
    content : {
      display: 'flex',
      justifyContent : 'center'
    },
    icon : {
      fontSize : theme.spacing(10),
    },
    spacer : {
      marginLeft : 'auto'
    },
  };
});

const ReportItem = ({
  className,
  style = {},
  report
})=>{
  const styles = useStyles();
  const {t} = useContext(LocalizationContext);
  const history = useHistory();
  const routeMatch = useRouteMatch();

  const reportURL = `${routeMatch.path}/${report.path}`;

  return (
    <Card
      className={clsx(styles.root, className)}
      style={{...style}}
      onClick={()=>{
        history.push(reportURL);
      }}
    >
      <CardHeader
        title={report.title}
      />

      <CardContent className={clsx(styles.content)}>
        <Icon
          className={clsx(styles.icon)}
          size="large"
          color="primary"
        >
          {report.icon}
        </Icon>
      </CardContent>

      <CardActions disableSpacing>
        <div className={clsx(styles.spacer)}/>
        <Button
          key="new"
          color="primary"
          size="small"
        >
          {t('View')}
        </Button>
      </CardActions>
    </Card>
  );
};

ReportItem.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  report : PropTypes.shape({
    title : PropTypes.string,
    icon : PropTypes.string,
    path : PropTypes.string,
  })
};

export default ReportItem;
