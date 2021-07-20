import React from 'react';
import {Typography} from '@material-ui/core';
import {FuseAnimate} from '@icatalyst/components/fuse';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      background: theme.palette.secondary.main,
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding : theme.spacing(4)
    },
    title : {
      marginBottom: theme.spacing(2)
    },
    subtitle : {
      marginBottom: theme.spacing(2),
      color: theme.palette.primary.light
    },
    link : {
      marginTop: theme.spacing(2),
      color: theme.palette.info.light
    }
  };
});

const ErrorPage = (props) => {

  const classes = useStyles(props);

  const { state = {
    title : 'An Error has Occurred',
    message : 'An error has occurred and unfortunately we are unsure what it was'
  }} = props.location;

  const { title, message, component } = state;

  return (
    <div className={clsx(classes.root)}>

      <FuseAnimate animation="transition.expandIn" delay={100}>
        <Typography variant="h1" color="primary" className={clsx(classes.title)}>
          {title}
        </Typography>
      </FuseAnimate>

      <FuseAnimate delay={500}>
        <Typography variant="h6" component="h2" color="primary" className={clsx(classes.subtitle)}>
          {message}
        </Typography>
      </FuseAnimate>

      { component && component }

      <Link className={clsx(classes.link)} to="/">Go back to home</Link>
    </div>
  );
};

ErrorPage.propTypes = {
  location : PropTypes.object,
  title : PropTypes.string,
  message : PropTypes.string,
  component : PropTypes.node
};

export default React.memo(ErrorPage);
