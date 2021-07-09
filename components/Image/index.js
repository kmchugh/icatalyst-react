import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Icon from '../Icon';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  loadingWrapper  : {
    position : 'relative',
  },
  spinner : {
    position : 'absolute',
    width : theme.spacing(2),
    height : theme.spacing(2),
    top : `calc(50% - ${theme.spacing(1)}px)`,
    left : `calc(50% - ${theme.spacing(1)}px)`,
    animation: '$rotating 2s linear infinite'
  },
  '@keyframes rotating': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  },
}));

function Image(props) {
  const theme = useTheme();
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);

  const {
    backgroundColor = theme.palette.secondary.main,
    defaultSrc = mostReadable(
      tinycolor(backgroundColor), ['#fff', '#000'], {}
    ).toHexString() === '#000000' ?
      'assets/images/placeholders/image_dark.svg' :
      'assets/images/placeholders/image_light.svg',
    spinnerColor = mostReadable(
      tinycolor(backgroundColor), ['#fff', '#000'], {}
    ).toHexString(),
    ...rest
  } = props;

  const image = useMemo(()=>{
    return (
      <img
        {...rest}
        src={rest.src || defaultSrc}
        onLoad={(e)=>{
          setLoaded(true);
          props.onLoad && props.onLoad(e);
        }}
        onError={(e)=>{
          if (!e.target.src.endsWith(defaultSrc)) {
            setLoaded(false);
            e.target.src=defaultSrc;
          }
          props.onError && props.onError(e);
        }}
      />
    );
  }, [props]);

  return !loaded ? (
    <div className={clsx(classes.loadingWrapper)}
      style={{
        color : spinnerColor
      }}
    >
      {image}
      <Icon className={clsx(classes.spinner)}>fa spinner</Icon>
    </div>
  ) : image;
}


Image.propTypes = {
  defaultSrc: PropTypes.string,
  backgroundColor : PropTypes.string,
  onError : PropTypes.func,
  onLoad : PropTypes.func,
  src : PropTypes.string,
  spinnerColor: PropTypes.string,
};

export default Image;
