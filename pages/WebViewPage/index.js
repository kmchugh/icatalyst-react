import React from 'react';
import PropTypes from 'prop-types';
import TitledPage from '../TitledPage';
import WebView from '../../components/WebView';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    },
    pageHeader : {
      paddingLeft: theme.spacingNum(2),
      paddingRight: theme.spacingNum(2),

      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacingNum(4),
        paddingRight: theme.spacingNum(4),
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
      className={cxMui(styles.root, className)}
      headerClassName={cxMui(styles.pageHeader)}
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
