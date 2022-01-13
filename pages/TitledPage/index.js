import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import PageHeader from '../../components/PageHeader';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'column',
      flexGrow: 1,
      padding: theme.spacing(2),
      paddingTop : theme.spacing(3),
      paddingBottom : theme.spacing(1),

      [theme.breakpoints.up('sm')]: {
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
  title
})=>{
  const styles = useStyles();

  return (
    <div className={clsx(styles.root, className)}>
      <PageHeader
        title={title}
        size={headerSize}
      />
      <div className={clsx(styles.pageContent)}>
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
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  headerSize : PropTypes.oneOf([
    'small',
    'medium',
    'large'
  ]),
  title : PropTypes.string.isRequired
};

export default TitledPage;
