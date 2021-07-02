import React from 'react';
import PropTypes from 'prop-types';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import {useTheme} from '@material-ui/styles';

function Image(props) {
  const theme = useTheme();

  const {
    backgroundColor = theme.palette.secondary.main,
    defaultSrc = mostReadable(
      tinycolor(backgroundColor), ['#fff', '#000'], {}
    ).toHexString() === '#000000' ?
      'assets/images/placeholders/image_dark.svg' :
      'assets/images/placeholders/image_light.svg',
    ...rest
  } = props;

  return (
    <img
      {...rest}
      src={rest.src || defaultSrc}
      onError={(e)=>{
        if (!e.target.src.endsWith(defaultSrc)) {
          e.target.src=defaultSrc;
        }
      }}
    />);
}


Image.propTypes = {
  defaultSrc: PropTypes.string,
  backgroundColor : PropTypes.string,
};

export default Image;
