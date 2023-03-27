import React, {useState, useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Icon from '../Icon';
import clsx from 'clsx';
import useHookWithRefCallback from '../../hooks/useHookWithRefCallback';

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

  const {
    backgroundColor = theme.palette.background.default,
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

  const [bgColor, setBGColor] = useState(tinycolor(backgroundColor));
  const [source, setSource] = useState(props.src);

  const [imageRef] = useHookWithRefCallback((ref)=>{
    if (ref) {
      const color = tinycolor(getComputedStyle(ref).backgroundColor);
      if (color.getAlpha() > 0) {
        setBGColor(getComputedStyle(ref).backgroundColor);
      }
    }
  }, []);

  useEffect(()=>{
    setSource(props.src ? props.src : defaultImage);
  }, [props.src]);



  const [loaded, setLoaded] = useState(false);
  const [defaultImage, setDefaultImage] = useState(defaultSrc);


  useEffect(()=>{
    if (bgColor) {
      setDefaultImage(
        mostReadable(
          bgColor, ['#fff', '#000'], {}
        ).toHexString() === '#000000' ?
          'assets/images/placeholders/image_dark.svg' :
          'assets/images/placeholders/image_light.svg'
      );
    }
  }, [bgColor]);

  const image = useMemo(()=>{
    return (
      <img
        ref={imageRef}
        {...rest}
        src={source}
        onLoad={(e)=>{
          setLoaded(true);
          if (!e.target.src.endsWith(defaultImage)) {
            props.onLoad && props.onLoad(e);
          }
        }}
        onError={(e)=>{
          if (!e.target.src.endsWith(defaultImage)) {
            setLoaded(false);
            e.target.src=defaultImage;
            setSource(defaultImage);
          }
          props.onError && props.onError(e);
        }}
      />
    );
  }, [props, source, bgColor]);

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
