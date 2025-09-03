import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Icon from '@icatalyst/components/Icon';
import Button from '@mui/material/Button';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { createMuiStyles, cxMui } from '../../../../utilities';
const useStyles = createMuiStyles((theme)=>{
  return {
    root : {},
    content : {
      display: 'flex',
      justifyContent : 'center'
    },
    icon : {
      fontSize : theme.spacingNum(10),
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
      className={cxMui(styles.root, className)}
      style={{...style}}
      onClick={()=>{
        history.push(reportURL);
      }}
    >
      <CardHeader
        title={report.title}
      />

      <CardContent className={cxMui(styles.content)}>
        <Icon
          className={cxMui(styles.icon)}
          size="large"
          color="primary"
        >
          {report.icon}
        </Icon>
      </CardContent>

      <CardActions disableSpacing>
        <div className={cxMui(styles.spacer)}/>
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
