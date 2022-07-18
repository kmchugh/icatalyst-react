import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import TitledPage from '../TitledPage';
import WebView from '../../components/WebView';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    },
    pageHeader : {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    }
  };
});

const WebViewPage = ({
  className,
  title,
  uri
})=>{
  const styles = useStyles();

  return (
    <TitledPage
      className={clsx(styles.root, className)}
      headerClassName={clsx(styles.pageHeader)}
      title={title}
    >
      <WebView
        uri={uri}
      />
    </TitledPage>
  );
};

WebViewPage.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  title : PropTypes.string.isRequired,
  uri : PropTypes.string.isRequired,
};

export default WebViewPage;
