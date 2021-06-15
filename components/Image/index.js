import React from 'react';
import _ from '../../@lodash';
import PropTypes from 'prop-types';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import {useTheme} from '@material-ui/styles';

function Image(props) {
  const theme = useTheme();

  let importedProps = _.pick(props, [
    'style',
    'className',
    'src',
    'title',
    'alt',
    'onClick'
  ]);

  const {
    backgroundColor = theme.palette.secondary.main
  } = props;

  let {defaultSrc = mostReadable(
    tinycolor(backgroundColor), ['#fff', '#000'], {}
  ).toHexString() === '#000000' ?
    'assets/images/placeholders/image_dark.svg' :
    'assets/images/placeholders/image_light.svg'
  } = props;

  importedProps = {
    ...importedProps,
    src: importedProps.src || defaultSrc
  };

  return (
    <img
      {...importedProps}
      alt={importedProps.alt}
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
