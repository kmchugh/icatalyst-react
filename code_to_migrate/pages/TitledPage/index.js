import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';


import clsx from 'clsx';

import PageHeader from '../../components/PageHeader/index';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'column',
      flexGrow: 1,
      padding: theme.spacing(2),
      paddingTop : theme.spacing(3),
      paddingBottom : theme.spacing(1),

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
        paddingTop : theme.spacing(6),
        paddingBottom : theme.spacing(2),
      },
    },
    pageContent : {
      display : 'flex',
      flexDirection : 'column',
      flexGrow: 1,
    }
  };
});
const TitledPage = ({
  className,
  children,
  headerSize = 'medium',
  title,
  headerClassName,
  contentClassName,
  actions
})=>{
  const styles = useStyles();

  return (
    <div className={clsx(styles.root, className)}>
      <PageHeader
        title={title}
        size={headerSize}
        className={clsx(styles.header, headerClassName)}
        actions={actions}
      />
      <div className={clsx(styles.pageContent, contentClassName)}>
        {children}
      </div>
    </div>
  );
};

TitledPage.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  headerClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  contentClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  headerSize : PropTypes.oneOf([
    'small',
    'medium',
    'large'
  ]),
  title : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  actions : PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        className : PropTypes.string,
        title : PropTypes.string.isRequired,
        onClick : PropTypes.func.isRequired,
        icon : PropTypes.string.isRequired,
        disabled : PropTypes.bool,
        color : PropTypes.string
      })
    ])
  ),
};

export default TitledPage;
